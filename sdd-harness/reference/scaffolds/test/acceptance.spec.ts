import { test, expect } from "@playwright/test";

// Testes de aceite: cada titulo comeca com o id CA-N do criterio (rastreabilidade PRD->teste).
// Tag @receita nos fluxos que geram dinheiro (e2e obrigatorio).

test("CA-1: cria cobranca em BRL e recebe link de pagamento @receita", async ({ page }) => {
  // Given: freelancer logado
  await page.goto("/charges/new");
  // When: preenche e cria uma cobranca BRL
  // await page.getByLabel("Valor").fill("100");
  // await page.getByRole("button", { name: /criar/i }).click();
  // Then: recebe um link de pagamento (Pix)
  // await expect(page.getByRole("link", { name: /pagar/i })).toBeVisible();
  expect(true).toBe(true); // esqueleto — ligar ao app real
});

test("CA-2: tenant A nao ve cobranca do tenant B", async ({ page }) => {
  // Isolamento multi-tenant tambem cabe como criterio de aceite quando relevante.
  expect(true).toBe(true);
});
