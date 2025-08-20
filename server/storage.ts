import {
  users, properties, tenants, leads, communications, visitorApprovals,
  type User, type InsertUser,
  type Property, type InsertProperty,
  type Tenant, type InsertTenant,
  type Lead, type InsertLead,
  type Communication, type InsertCommunication,
  type VisitorApproval, type InsertVisitorApproval,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Properties
  getProperty(id: string): Promise<Property | undefined>;
  getUserProperties(userId: string): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: string, updates: Partial<InsertProperty>): Promise<Property | undefined>;

  // Tenants
  getTenant(id: string): Promise<Tenant | undefined>;
  getPropertyTenants(propertyId: string): Promise<Tenant[]>;
  getTenantByPhone(phone: string): Promise<Tenant | undefined>;
  createTenant(tenant: InsertTenant): Promise<Tenant>;

  // Leads
  getLead(id: string): Promise<Lead | undefined>;
  getPropertyLeads(propertyId: string): Promise<Lead[]>;
  getUserLeads(userId: string): Promise<Lead[]>;
  createLead(lead: InsertLead): Promise<Lead>;
  updateLead(id: string, updates: Partial<InsertLead>): Promise<Lead | undefined>;

  // Communications
  getCommunication(id: string): Promise<Communication | undefined>;
  getLeadCommunications(leadId: string): Promise<Communication[]>;
  createCommunication(communication: InsertCommunication): Promise<Communication>;

  // Visitor Approvals
  getVisitorApproval(id: string): Promise<VisitorApproval | undefined>;
  getTenantVisitorApprovals(tenantId: string): Promise<VisitorApproval[]>;
  createVisitorApproval(approval: InsertVisitorApproval): Promise<VisitorApproval>;
  updateVisitorApproval(id: string, updates: Partial<InsertVisitorApproval>): Promise<VisitorApproval | undefined>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Properties
  async getProperty(id: string): Promise<Property | undefined> {
    const [property] = await db.select().from(properties).where(eq(properties.id, id));
    return property || undefined;
  }

  async getUserProperties(userId: string): Promise<Property[]> {
    return db.select().from(properties).where(eq(properties.userId, userId));
  }

  async createProperty(property: InsertProperty): Promise<Property> {
    const [newProperty] = await db.insert(properties).values(property).returning();
    return newProperty;
  }

  async updateProperty(id: string, updates: Partial<InsertProperty>): Promise<Property | undefined> {
    const [updated] = await db
      .update(properties)
      .set(updates)
      .where(eq(properties.id, id))
      .returning();
    return updated || undefined;
  }

  // Tenants
  async getTenant(id: string): Promise<Tenant | undefined> {
    const [tenant] = await db.select().from(tenants).where(eq(tenants.id, id));
    return tenant || undefined;
  }

  async getPropertyTenants(propertyId: string): Promise<Tenant[]> {
    return db.select().from(tenants).where(eq(tenants.propertyId, propertyId));
  }

  async getTenantByPhone(phone: string): Promise<Tenant | undefined> {
    const [tenant] = await db.select().from(tenants).where(eq(tenants.phone, phone));
    return tenant || undefined;
  }

  async createTenant(tenant: InsertTenant): Promise<Tenant> {
    const [newTenant] = await db.insert(tenants).values(tenant).returning();
    return newTenant;
  }

  // Leads
  async getLead(id: string): Promise<Lead | undefined> {
    const [lead] = await db.select().from(leads).where(eq(leads.id, id));
    return lead || undefined;
  }

  async getPropertyLeads(propertyId: string): Promise<Lead[]> {
    return db.select().from(leads)
      .where(eq(leads.propertyId, propertyId))
      .orderBy(desc(leads.createdAt));
  }

  async getUserLeads(userId: string): Promise<Lead[]> {
    return db.select({
      id: leads.id,
      propertyId: leads.propertyId,
      name: leads.name,
      phone: leads.phone,
      email: leads.email,
      message: leads.message,
      category: leads.category,
      urgency: leads.urgency,
      status: leads.status,
      source: leads.source,
      responseTime: leads.responseTime,
      metadata: leads.metadata,
      createdAt: leads.createdAt,
      updatedAt: leads.updatedAt,
    })
    .from(leads)
    .innerJoin(properties, eq(leads.propertyId, properties.id))
    .where(eq(properties.userId, userId))
    .orderBy(desc(leads.createdAt));
  }

  async createLead(lead: InsertLead): Promise<Lead> {
    const [newLead] = await db.insert(leads).values({
      ...lead,
      updatedAt: new Date(),
    }).returning();
    return newLead;
  }

  async updateLead(id: string, updates: Partial<InsertLead>): Promise<Lead | undefined> {
    const [updated] = await db
      .update(leads)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(leads.id, id))
      .returning();
    return updated || undefined;
  }

  // Communications
  async getCommunication(id: string): Promise<Communication | undefined> {
    const [communication] = await db.select().from(communications).where(eq(communications.id, id));
    return communication || undefined;
  }

  async getLeadCommunications(leadId: string): Promise<Communication[]> {
    return db.select().from(communications)
      .where(eq(communications.leadId, leadId))
      .orderBy(desc(communications.createdAt));
  }

  async createCommunication(communication: InsertCommunication): Promise<Communication> {
    const [newCommunication] = await db.insert(communications).values(communication).returning();
    return newCommunication;
  }

  // Visitor Approvals
  async getVisitorApproval(id: string): Promise<VisitorApproval | undefined> {
    const [approval] = await db.select().from(visitorApprovals).where(eq(visitorApprovals.id, id));
    return approval || undefined;
  }

  async getTenantVisitorApprovals(tenantId: string): Promise<VisitorApproval[]> {
    return db.select().from(visitorApprovals)
      .where(eq(visitorApprovals.tenantId, tenantId))
      .orderBy(desc(visitorApprovals.createdAt));
  }

  async createVisitorApproval(approval: InsertVisitorApproval): Promise<VisitorApproval> {
    const [newApproval] = await db.insert(visitorApprovals).values(approval).returning();
    return newApproval;
  }

  async updateVisitorApproval(id: string, updates: Partial<InsertVisitorApproval>): Promise<VisitorApproval | undefined> {
    const [updated] = await db
      .update(visitorApprovals)
      .set(updates)
      .where(eq(visitorApprovals.id, id))
      .returning();
    return updated || undefined;
  }
}

export const storage = new DatabaseStorage();
