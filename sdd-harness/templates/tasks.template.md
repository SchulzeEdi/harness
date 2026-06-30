# TASKS-PRD-V1-NN: <titulo do PRD>

> Quebra do PRD-V1-NN em tasks executaveis. Fatias verticais; ordem DB -> Backend -> Frontend.

## Convencao (bloco de metadados por task)
```
### [T-NN] <titulo>
- estado: todo | doing | done | blocked
- camada: DB | Back | Front
- estimativa: <P/M/G ou pontos>
- depende_de: [T-..]
- branch: feature/<slug> | fix/<slug>
- criterios_de_aceite:
  - [ ] ...
- teste: <unidade/e2e exigido>
- DoD: build verde + testes + (se UI) usa design system + local verde + PR merge na main
```

---

## Milestone M0 — Walking skeleton
### [T-01] Infra base + deploy + health check
- estado: todo
- camada: DB
- estimativa: M
- depende_de: []
- branch: feature/walking-skeleton
- criterios_de_aceite:
  - [ ] App sobe local (Docker) e na AWS (staging) com health check verde
- teste: e2e smoke
- DoD: gates verdes + PR merge na main

### [T-02] Auth minimo (login)
- estado: todo
- camada: DB
- estimativa: M
- depende_de: [T-01]
- branch: feature/auth-login
- criterios_de_aceite:
  - [ ] Usuario faz login e ve dashboard vazio
- teste: unidade + e2e
- DoD: gates verdes + UI usa design system + PR merge na main

## Milestone M1 — MVP pagavel
### [T-03] <feature core>
- estado: todo
- camada: DB
- ...

### [T-04] Checkout USD  ← PRIMEIRA TASK DE RECEITA
- estado: todo
- camada: Back
- ...

### [T-05] Checkout BRL (Pix)
- estado: todo
- camada: Back
- ...

## Milestone M2 — Crescimento
### [T-06] ...
