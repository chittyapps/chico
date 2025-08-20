import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPropertySchema, insertLeadSchema, insertTenantSchema, insertUserSchema } from "@shared/schema";
import { categorizeLeadMessage, generateFollowUpMessage } from "./services/openai";
import { sendSMS, sendLeadAutoResponse, parseIncomingSMS, sendVisitorApprovalRequest, sendVisitorApprovalResponse } from "./services/twilio";

export async function registerRoutes(app: Express): Promise<Server> {
  // Properties endpoints
  app.get("/api/properties", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      if (!userId) {
        return res.status(400).json({ message: "User ID required" });
      }
      
      const properties = await storage.getUserProperties(userId);
      res.json(properties);
    } catch (error) {
      console.error("Error fetching properties:", error);
      res.status(500).json({ message: "Failed to fetch properties" });
    }
  });

  app.post("/api/properties", async (req, res) => {
    try {
      const validatedData = insertPropertySchema.parse(req.body);
      const property = await storage.createProperty(validatedData);
      res.status(201).json(property);
    } catch (error: any) {
      console.error("Error creating property:", error);
      res.status(400).json({ message: error.message || "Invalid property data" });
    }
  });

  // Leads endpoints
  app.get("/api/leads", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      const propertyId = req.query.propertyId as string;
      
      if (!userId && !propertyId) {
        return res.status(400).json({ message: "User ID or Property ID required" });
      }
      
      const leads = userId 
        ? await storage.getUserLeads(userId)
        : await storage.getPropertyLeads(propertyId);
      
      res.json(leads);
    } catch (error) {
      console.error("Error fetching leads:", error);
      res.status(500).json({ message: "Failed to fetch leads" });
    }
  });

  app.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      
      // Categorize the lead using OpenAI
      const categorization = await categorizeLeadMessage(
        validatedData.message, 
        validatedData.phone
      );
      
      const lead = await storage.createLead({
        ...validatedData,
        category: categorization.category,
        urgency: categorization.urgency,
        metadata: {
          aiCategorization: categorization,
          extractedInfo: categorization.extractedInfo
        }
      });

      // Send auto-response
      const responseTime = Date.now();
      await sendLeadAutoResponse(validatedData.phone, categorization.suggestedResponse);
      
      // Update lead with response time
      const responseTimeMinutes = Math.round((Date.now() - responseTime) / (1000 * 60));
      await storage.updateLead(lead.id, { 
        responseTime: responseTimeMinutes,
        status: "contacted" 
      });

      res.status(201).json(lead);
    } catch (error: any) {
      console.error("Error creating lead:", error);
      res.status(400).json({ message: error.message || "Invalid lead data" });
    }
  });

  app.patch("/api/leads/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const updatedLead = await storage.updateLead(id, updates);
      if (!updatedLead) {
        return res.status(404).json({ message: "Lead not found" });
      }
      
      res.json(updatedLead);
    } catch (error) {
      console.error("Error updating lead:", error);
      res.status(500).json({ message: "Failed to update lead" });
    }
  });

  // Tenants endpoints
  app.get("/api/tenants", async (req, res) => {
    try {
      const propertyId = req.query.propertyId as string;
      if (!propertyId) {
        return res.status(400).json({ message: "Property ID required" });
      }
      
      const tenants = await storage.getPropertyTenants(propertyId);
      res.json(tenants);
    } catch (error) {
      console.error("Error fetching tenants:", error);
      res.status(500).json({ message: "Failed to fetch tenants" });
    }
  });

  app.post("/api/tenants", async (req, res) => {
    try {
      const validatedData = insertTenantSchema.parse(req.body);
      const tenant = await storage.createTenant(validatedData);
      res.status(201).json(tenant);
    } catch (error: any) {
      console.error("Error creating tenant:", error);
      res.status(400).json({ message: error.message || "Invalid tenant data" });
    }
  });

  // Users endpoints
  app.post("/api/users", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(validatedData);
      res.status(201).json(user);
    } catch (error: any) {
      console.error("Error creating user:", error);
      res.status(400).json({ message: error.message || "Invalid user data" });
    }
  });

  // SMS webhook from Twilio
  app.post("/api/sms/webhook", async (req, res) => {
    try {
      const { from, to, message } = parseIncomingSMS(req.body);
      
      // Check if this is from a tenant (visitor approval response)
      const tenant = await storage.getTenantByPhone(from);
      if (tenant) {
        // Handle tenant responses for visitor approval
        const response = message.toUpperCase().trim();
        
        if (["YES", "NO", "SAVE"].includes(response)) {
          // Find pending visitor approvals for this tenant
          const approvals = await storage.getTenantVisitorApprovals(tenant.id);
          const pendingApproval = approvals.find(a => a.status === "pending");
          
          if (pendingApproval) {
            const approved = response === "YES" || response === "SAVE";
            
            await storage.updateVisitorApproval(pendingApproval.id, {
              status: approved ? "approved" : "denied",
              approvalMessage: message
            });
            
            // Notify visitor
            if (pendingApproval.visitorPhone) {
              const property = await storage.getProperty(tenant.propertyId);
              await sendVisitorApprovalResponse(
                pendingApproval.visitorPhone,
                approved,
                property?.name || "Property"
              );
            }
          }
        }
        
        res.status(200).send("OK");
        return;
      }
      
      // This is a new lead - try to find which property it's for
      // For now, we'll need additional logic to match phone numbers to properties
      // This could be enhanced with a property lookup system
      
      res.status(200).send("OK");
    } catch (error) {
      console.error("Error processing SMS webhook:", error);
      res.status(500).send("Error");
    }
  });

  // Visitor entry request
  app.post("/api/visitor/request", async (req, res) => {
    try {
      const { tenantId, visitorPhone, visitorName, message } = req.body;
      
      const tenant = await storage.getTenant(tenantId);
      if (!tenant) {
        return res.status(404).json({ message: "Tenant not found" });
      }
      
      const property = await storage.getProperty(tenant.propertyId);
      
      const approval = await storage.createVisitorApproval({
        tenantId,
        visitorPhone,
        visitorName,
        requestMessage: message,
        expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000) // 2 hours
      });
      
      // Send SMS to tenant
      await sendVisitorApprovalRequest(
        tenant.phone,
        visitorPhone,
        property?.name || "Your property"
      );
      
      res.status(201).json(approval);
    } catch (error) {
      console.error("Error creating visitor request:", error);
      res.status(500).json({ message: "Failed to create visitor request" });
    }
  });

  // Dashboard stats
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      if (!userId) {
        return res.status(400).json({ message: "User ID required" });
      }
      
      const leads = await storage.getUserLeads(userId);
      const properties = await storage.getUserProperties(userId);
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const todayLeads = leads.filter(lead => 
        lead.createdAt && lead.createdAt >= today
      );
      
      const responseTimes = leads
        .filter(lead => lead.responseTime !== null)
        .map(lead => lead.responseTime as number);
      
      const avgResponseTime = responseTimes.length > 0
        ? responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length
        : 0;
      
      const convertedLeads = leads.filter(lead => lead.status === "converted");
      const conversionRate = leads.length > 0
        ? (convertedLeads.length / leads.length) * 100
        : 0;
      
      res.json({
        newLeadsToday: todayLeads.length,
        averageResponseTime: Math.round(avgResponseTime * 10) / 10,
        conversionRate: Math.round(conversionRate),
        totalProperties: properties.length,
        totalLeads: leads.length,
        recentLeads: leads.slice(0, 10)
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
