import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, decimal, boolean, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const properties = pgTable("properties", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  address: text("address").notNull(),
  units: integer("units").default(1).notNull(),
  rent: decimal("rent", { precision: 10, scale: 2 }),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const tenants = pgTable("tenants", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  propertyId: varchar("property_id").notNull().references(() => properties.id),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  unitNumber: text("unit_number"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  propertyId: varchar("property_id").notNull().references(() => properties.id),
  name: text("name"),
  phone: text("phone").notNull(),
  email: text("email"),
  message: text("message").notNull(),
  category: text("category").notNull(), // rental_inquiry, maintenance, viewing_request, general
  urgency: integer("urgency").default(3).notNull(), // 1-5 scale
  status: text("status").default("new").notNull(), // new, contacted, in_progress, converted, closed
  source: text("source").default("sms").notNull(), // sms, email, phone, web
  responseTime: integer("response_time_minutes"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const communications = pgTable("communications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  leadId: varchar("lead_id").references(() => leads.id),
  tenantId: varchar("tenant_id").references(() => tenants.id),
  propertyId: varchar("property_id").notNull().references(() => properties.id),
  type: text("type").notNull(), // sms, email, call
  direction: text("direction").notNull(), // inbound, outbound
  message: text("message").notNull(),
  phoneNumber: text("phone_number"),
  status: text("status").default("sent").notNull(), // sent, delivered, failed
  twilioSid: text("twilio_sid"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const visitorApprovals = pgTable("visitor_approvals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tenantId: varchar("tenant_id").notNull().references(() => tenants.id),
  visitorName: text("visitor_name"),
  visitorPhone: text("visitor_phone").notNull(),
  status: text("status").default("pending").notNull(), // pending, approved, denied
  requestMessage: text("request_message"),
  approvalMessage: text("approval_message"),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  properties: many(properties),
}));

export const propertiesRelations = relations(properties, ({ one, many }) => ({
  user: one(users, {
    fields: [properties.userId],
    references: [users.id],
  }),
  tenants: many(tenants),
  leads: many(leads),
  communications: many(communications),
}));

export const tenantsRelations = relations(tenants, ({ one, many }) => ({
  property: one(properties, {
    fields: [tenants.propertyId],
    references: [properties.id],
  }),
  communications: many(communications),
  visitorApprovals: many(visitorApprovals),
}));

export const leadsRelations = relations(leads, ({ one, many }) => ({
  property: one(properties, {
    fields: [leads.propertyId],
    references: [properties.id],
  }),
  communications: many(communications),
}));

export const communicationsRelations = relations(communications, ({ one }) => ({
  lead: one(leads, {
    fields: [communications.leadId],
    references: [leads.id],
  }),
  tenant: one(tenants, {
    fields: [communications.tenantId],
    references: [tenants.id],
  }),
  property: one(properties, {
    fields: [communications.propertyId],
    references: [properties.id],
  }),
}));

export const visitorApprovalsRelations = relations(visitorApprovals, ({ one }) => ({
  tenant: one(tenants, {
    fields: [visitorApprovals.tenantId],
    references: [tenants.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
  createdAt: true,
});

export const insertTenantSchema = createInsertSchema(tenants).omit({
  id: true,
  createdAt: true,
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCommunicationSchema = createInsertSchema(communications).omit({
  id: true,
  createdAt: true,
});

export const insertVisitorApprovalSchema = createInsertSchema(visitorApprovals).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Property = typeof properties.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Tenant = typeof tenants.$inferSelect;
export type InsertTenant = z.infer<typeof insertTenantSchema>;
export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Communication = typeof communications.$inferSelect;
export type InsertCommunication = z.infer<typeof insertCommunicationSchema>;
export type VisitorApproval = typeof visitorApprovals.$inferSelect;
export type InsertVisitorApproval = z.infer<typeof insertVisitorApprovalSchema>;
