# Reference — Rastreabilidade BDD (criterio de aceite -> teste)

Liga **PRD -> task -> teste** por um id estavel. Para a tese, isso transforma "achei que estava pronto" em "todo criterio de aceite tem um teste que passa". Usado por `sdd-tasks` (define os ids) e `sdd-review` (exige cobertura).

## Convencao
- Cada criterio de aceite de uma task recebe um id `CA-N` (CA-1, CA-2, ...).
- Cada `CA-N` vira **um teste** cujo titulo comeca com o id: `test("CA-1: ...", ...)`.
- Fluxos de receita marcam a tag `@receita` (rodam no e2e obrigatorio).
- Dominio puro -> Vitest. Jornada/UI -> Playwright (`reference/scaffolds/test/acceptance.spec.ts`).

## Formato (Given/When/Then)
Escreva o criterio em linguagem de comportamento e espelhe no teste:
```
CA-1: Dado um freelancer logado, quando cria uma cobranca BRL, entao recebe um link Pix.
```
```ts
test("CA-1: cria cobranca BRL e recebe link Pix @receita", async ({ page }) => { /* ... */ });
```

## DoD (entra no Definition of Done)
Uma task so esta `done` se **todo `CA-N` tem teste correspondente que passa**. O `sdd-review` confere a correspondencia; o relatorio de teste (titulos `CA-N`) e a evidencia.

## Rastreabilidade ate o PRD
O PRD registra decisoes `D-N`; a task lista `CA-N` ligados a essas decisoes; o teste cita `CA-N`. Assim, do requisito ao teste ha um caminho auditavel — util na defesa do TCC.
