// Repositorio com escopo de tenant: TODO acesso injeta tenant_id automaticamente.
// Regra: nenhuma query de dominio roda sem tenant_id. Isso previne IDOR entre tenants.
import { eq, and } from "drizzle-orm";

export function tenantRepo(db: any, table: any, tenantId: string) {
  if (!tenantId) throw new Error("tenantId obrigatorio");
  return {
    findById: (id: string) =>
      db.select().from(table).where(and(eq(table.id, id), eq(table.tenantId, tenantId))),
    list: () => db.select().from(table).where(eq(table.tenantId, tenantId)),
    insert: (values: Record<string, unknown>) =>
      db.insert(table).values({ ...values, tenantId }),
  };
}
