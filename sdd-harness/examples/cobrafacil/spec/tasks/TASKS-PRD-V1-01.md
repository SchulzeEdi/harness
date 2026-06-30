# TASKS — PRD-V1-01

## M0 — walking skeleton (entregue na SPRINT-001)
### [T-01] Esqueleto roda local e em staging
- estado: done
- camada: DB|Back|Front
- estimativa: M
- depende_de: []
- branch: feature/walking-skeleton
- criterios_de_aceite (id CA-N, rastreavel ate teste):
  - [x] CA-1: /api/health responde 200 em staging
  - [x] CA-2: migra DB (tenants, users) e seed
- teste: CA-1 e2e health; CA-2 migration test
- DoD: build verde + CA-1/CA-2 cobertos + local verde + doc gate + merge na main

## M1 — MVP pagavel
### [T-02] Criar cobranca (DB->Back->Front)
- estado: todo
- camada: DB
- estimativa: G
- depende_de: [T-01]
- branch: feature/criar-cobranca
- criterios_de_aceite:
  - [ ] CA-1: cria charge com tenant_id, moeda, valor
  - [ ] CA-2: isolamento — tenant A nao ve charge de B
- teste: CA-1 unidade (dominio); CA-2 teste de isolamento multi-tenant
- DoD: idem + usa design system

### [T-03] Checkout (PRIMEIRA TASK DE RECEITA) USD+BRL
- estado: todo
- camada: Back
- estimativa: G
- depende_de: [T-02]
- branch: feature/checkout
- criterios_de_aceite:
  - [ ] CA-1: PaymentProvider BRL (Pix) e USD (Lemon Squeezy)
  - [ ] CA-2: webhook marca pago (idempotente)
- teste: CA-1/CA-2 e2e do fluxo de receita (@receita)
- DoD: idem
