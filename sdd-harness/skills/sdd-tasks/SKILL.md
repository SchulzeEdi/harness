---
name: sdd-tasks
description: Fase 6 do harness SDD. Quebra um PRD em tasks executaveis em fatias verticais, cada uma com bloco de metadados (estado, camada, estimativa, dependencias, criterios, teste, DoD). Produz spec/tasks/TASKS-PRD-V1-NN.md. USE SEMPRE QUE o usuario quiser quebrar/dividir o trabalho em tarefas, "montar o backlog", "o que precisa ser feito", planejar a execucao, milestones, fatias, ou apos design/arquitetura/monetizacao com o PRD aprovado. Dispare antes de montar a primeira sprint.
---

# Fase 6 — Tasks (quebra do PRD)

Objetivo: transformar um PRD em tasks acionaveis. O arquivo de tasks espelha o PRD: `PRD-V1-NN` -> `spec/tasks/TASKS-PRD-V1-NN.md`.

## Como conduzir
1. Leia o PRD alvo (`spec/prds/PRD-V1-NN.md`), `spec/design-system.md`, `spec/architecture.md` (+ ADRs) e `spec/monetization.md`.
2. Use `${CLAUDE_PLUGIN_ROOT}/templates/tasks.template.md`.

## Filosofia de quebra
- **Fatias verticais**: cada task entrega valor ponta a ponta.
- **Ordem dentro da fatia: Banco -> Backend -> Frontend.**
- **M0 = walking skeleton** (roda local e na AWS) antes de qualquer feature.
- Agrupe em milestones: M0 -> M1 (MVP pagavel) -> M2.
- Marque a **primeira task que gera receita** (checkout).

## Bloco de metadados (obrigatorio por task)
Cada task carrega um bloco:
```
### [T-NN] <titulo>
- estado: todo | doing | done | blocked
- camada: DB | Back | Front
- estimativa: <P/M/G ou pontos>
- depende_de: [T-..]
- branch: feature/<slug> | fix/<slug>   (definida ao entrar em sprint)
- criterios_de_aceite (cada um com id CA-N, rastreavel ate o teste):
  - [ ] CA-1: ...
- teste: cada CA-N vira um teste cujo titulo comeca com "CA-N:"; fluxo de receita marca @receita. Ver `${CLAUDE_PLUGIN_ROOT}/reference/bdd-traceability.md`.
- DoD: build verde + todo CA-N coberto por teste que passa + (se UI) usa design system + local verde + doc gate + PR merge na main
```

## GATE
- [ ] M0 antes de features.
- [ ] Toda task tem o bloco de metadados completo (estado, camada, estimativa, dependencias, criterios, teste, DoD).
- [ ] Ordem DB -> Backend -> Frontend respeitada.
- [ ] Primeira task de receita marcada.

## Ao concluir (doc gate)
- Registre o arquivo de tasks no `spec