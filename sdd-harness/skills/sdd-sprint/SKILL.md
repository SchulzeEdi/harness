---
name: sdd-sprint
description: Fase de entrega do harness SDD. Monta uma sprint a partir de um lote de tasks, acompanha a execucao e, ao fechar, gera o RETRO, roda a auditoria de doc e atualiza o STATUS. Produz spec/sprints/SPRINT-NNN-*.md e RETRO-NNN-*.md. USE SEMPRE QUE o usuario quiser montar/planejar/abrir/fechar uma sprint, organizar um lote de tasks, disser "bora pra proxima sprint", "planejar a semana/ciclo", "iteracao", "fechar a sprint", "fazer a retro", ou quando ja existem tasks prontas para executar. Dispare para orquestrar a entrega; a execucao de cada task e do sdd-implement.
---

# Sprint — planejar, executar, fechar

Objetivo: orquestrar a entrega de um lote de tasks. Loop canonico do harness:
**PRD -> TASKS -> SPRINT -> IMPLEMENTACAO -> REVIEW -> DONE -> COMMIT+PUSH -> DEPLOY.**

## Abrir uma sprint
1. Leia `spec/tasks/TASKS-PRD-V1-NN.md` e `spec/STATUS.md`.
2. Selecione um lote coerente de tasks (respeitando dependencias; M0 primeiro). Use `${CLAUDE_PLUGIN_ROOT}/templates/sprint.template.md`.
3. Crie `spec/sprints/SPRINT-NNN-<slug>.md` (NNN sequencial) com: objetivo da sprint, tasks incluidas, criterio de "sprint pronta".
4. Para cada task da sprint, defina a branch (`feature/<slug>` ou `fix/<slug>`).
5. Atualize `spec/STATUS.md` (sprint atual) e `spec/state.json` (array `sprints`).

## Executar
- Para cada task, invoque `sdd-implement` (cria a branch, implementa Banco->Backend->Frontend, roda os gates locais, passa por `sdd-review` e faz commit+push -> PR -> merge na main).
- **Paralelizacao:** tasks INDEPENDENTES (sem `depende_de` em comum) podem ser delegadas em paralelo ao agente `sdd-implementer` (via Task); o review de cada uma vai ao `sdd-reviewer`. Respeite as dependencias.
- Registre as interacoes no logbook via `sdd-measure`.
- Mantenha o estado das tasks atualizado (todo/doing/done/blocked) no arquivo de tasks e no STATUS.

## Fechar a sprint
1. Confirme que todas as tasks da sprint estao `done` (ou movidas para a proxima sprint, com motivo).
2. Gere `spec/sprints/RETRO-NNN-<slug>.md` usando `${CLAUDE_PLUGIN_ROOT}/templates/retro.template.md`: o que foi entregue, o que correu bem, o que melhorar, debitos tecnicos gerados, bugs abertos.
3. Rode `sdd-docs` para auditar drift de documentacao antes de fechar.
4. Atualize `spec/STATUS.md`: mova a sprint para historico, registre debitos/bugs/deploy de staging.

## GATE para fechar (doc gate)
- [ ] Tasks da sprint resolvidas (done) ou repactuadas com motivo.
- 