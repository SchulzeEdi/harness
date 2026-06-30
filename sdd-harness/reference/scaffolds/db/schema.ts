import { pgTable, uuid, text, timestamp, index } from "drizzle-orm/pg-core";

// Multi-tenancy row-level: TODA tabela de dominio carrega tenant_id.
export const tenants = pgTable("tenants", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
    email: text("email").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => ({ byTenant: index("users_tenant_idx").on(t.tenantId) }),
);
