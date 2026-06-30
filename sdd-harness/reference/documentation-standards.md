# Reference — Documentation standards (documentacao continua)

Usado por **todas** as skills. Objetivo: resolver o problema classico do harness — o projeto comeca documentando bem (sprints, ADRs) e **vai se perdendo**. Aqui a documentacao deixa de ser habito e vira **gate**: nenhuma unidade de trabalho fecha sem deixar rastro no lugar certo.

## Principio central

`spec/STATUS.md` e a **fonte da verdade** do comeco ao fim. Todo artefato (PRD, ADR, sprint, retro, bug, deploy, logbook) existe no seu arquivo proprio **e** aparece indexado no STATUS. Se nao esta no STATUS, para o projeto **nao aconteceu**.

Regra de ouro: **toda skill, ao concluir, atualiza o STATUS e os indices.** Isso esta no "Ao concluir" de cada skill e e verificado por `sdd-docs`.

### Uma verdade, dois formatos (sem divergir)
Para o STATUS e o `state.json` nunca conflitarem: **`spec/state.json` e a verdade da maquina** (fase, gates, contadores, arrays). O bloco entre `<!-- AUTO:START -->` e `<!-- AUTO:END -->` do `STATUS.md` e **gerado** a partir dele por `scripts/render-status.mjs` — nao se edita a mao. O texto humano (narrativa, decisoes, retros) mora **fora** dos marcadores. Assim a skill atualiza o `state.json` e roda `render-status`, e o resumo do STATUS nunca fica defasado. `validate-state.mjs` garante que o `state.json` esta integro.

## O que documentar em cada etapa

| Etapa | Artefato proprio | O que entra no STATUS.md |
|---|---|---|
| 0 opportunity | `spec/opportunity.md` | linha de fase concluida + decisao go/no-go |
| 1 constitution | `spec/constitution.md` | fase concluida + link |
| 2 prd | `spec/prds/PRD-V1-NN.md` | PRD na lista de PRDs ativos + decisoes-chave (D-N) |
| 3 design | `spec/design-system.md` + tokens | fase concluida + link |
| 4 architect | `spec/architecture.md` + `spec/adr/NNNN-*.md` | cada ADR no **indice de decisoes** |
| 5 monetize | `spec/monetization.md` | fase concluida + tiers/gateways |
| 6 tasks | `spec/tasks/TASKS-PRD-V1-NN.md` | arquivo de tasks na lista |
| sprint | `spec/sprints/SPRINT-NNN-*.md` | sprint atual + objetivo |
| implement | (commit/PR/branch) | task movida para `done` + branch/PR |
| review | bloco no arquivo da sprint/task | resultado do review (aprovado/ajustes) |
| deploy | `spec/deploys/DEPLOY-NNN-*.md` | ultimo deploy de staging/prod |
| loadtest | `spec/loadtests/LOAD-NNN-*.md` | metas vs resultado + ponto de quebra |
| amend | `spec/changes/CHG-NNN-*.md` | artefato alterado + impacto nas tasks |
| bug | `spec/bugs/BUG-NNN-*.md` | bug em aberto / movido para resolvido |
| retro | `spec/sprints/RETRO-NNN-*.md` | sprint no historico + debitos gerados |
| measure | `spec/logbook/` | total acumulado (tokens/custo/tempo) |
| experiment | `spec/experiments/EXP-NNN-*.md` | resultado da comparacao |

## O "doc gate" (entra no DoD)

Uma unidade de trabalho (task, sprint, fase, bug, deploy) so esta **pronta** se:

- [ ] O artefato proprio foi criado/atualizado no caminho canonico.
- [ ] O `STATUS.md` foi atualizado (lista/indice correspondente).
- [ ] O `state.json` foi atualizado (fase/gate/array correspondente).
- [ ] Os **cross-links** existem nos dois sentidos (ex.: a sprint cita as tasks; o RETRO cita a sprint; o BUG cita a sprint de origem; o ADR aparece no indice de decisoes).

Sem os quatro itens, a unidade **continua aberta**. Isto e o que impede o drift.

## Indices vivos (no STATUS.md)

O STATUS mantem secoes que **crescem** ao longo do projeto e nunca sao apagadas, so movidas (de "em aberto" para "historico"):

- **PRDs ativos** e seus status.
- **Sprint atual** + **historico de sprints/retros**.
- **Indice de decisoes** (todos os ADRs e os D-N relevantes, com link).
- **Bugs** em aberto e resolvidos (rastreaveis ate a sprint de origem).
- **Debitos tecnicos** acumulados.
- **Deploys** (ultimos staging/prod).
- **Logbook** (resumo acumulado: interacoes, tokens, custo USD, tempo).

## Anti-drift (por que comeca bem e se perde — e como nao se perder)

1. **Atualizacao no mesmo passo, nao depois.** A skill que produz o artefato e a mesma que atualiza o STATUS. Nunca "documento no fim da semana".
2. **Cross-link obrigatorio.** Todo artefato aponta para sua origem e e apontado pelo indice. Documento orfao = drift.
3. **Imutaveis nunca sao reescritos.** `spec/mvp_scope/` e os ADRs ja aceitos sao historico; mudanca = novo ADR que **supersede** o antigo (com link), nunca edicao silenciosa. Toda alteracao de artefato aprovado passa por `sdd-amend` (registro `CHG-NNN`).
4. **Auditoria periodica.** `sdd-docs` roda ao fim de cada sprint e acusa: task `done` sem STATUS, sprint sem RETRO, ADR fora do indice, bug sem origem, logbook em atraso.
5. **STATUS e curto e indexado, nao um diario gigante.** O detalhe mora no arquivo do artefato; o STATUS aponta. Assim ele continua legivel (e atualizado) ate o fim.

## Convencoes

- Numeracao sequencial com zero-pad: `ADR 0007`, `SPRINT-003`, `BUG-012`, `DEPLOY-002`, `EXP-001`.
- Datas em ISO (`2026-06-25`).
- Links relativos dentro de `spec/` (ex.: `[SPRINT-003](sprints/SPRINT-003-checkout.md)`).
- Estados padronizados: `todo | doing | done | blocked` (tasks); `aberto | resolvido` (bugs); `pending | completed` + `gatePassed` (fases).
