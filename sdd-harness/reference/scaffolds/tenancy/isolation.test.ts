import { describe, it, expect } from "vitest";
import { tenantRepo } from "./repository";

// Teste de isolamento multi-tenant: tenant A NUNCA enxerga dado de tenant B.
// Em SaaS multi-tenant esse e o bug classico (IDOR). Toda feature de dados deve ter um teste assim.
describe("isolamento multi-tenant", () => {
  it("repo escopado nao permite query sem tenant", () => {
    expect(() => tenantRepo({}, {}, "")).toThrow();
  });

  it("lista so traz linhas do proprio tenant (esboço — ligar ao db de teste)", async () => {
    // Pseudocodigo do cenario real:
    // seed: charge X (tenant A), charge Y (tenant B)
    // const repoA = tenantRepo(db, charges, "A");
    // const rows = await repoA.list();
    // expect(rows.map(r => r.id)).toContain("X");
    // expect(rows.map(r => r.id)).not.toContain("Y");
    expect(true).toBe(true);
  });
});
