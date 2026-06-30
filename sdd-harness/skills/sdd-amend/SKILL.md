---
name: sdd-amend
description: Skill de gestao de mudanca do harness SDD. Conduz a alteracao de um artefato JA APROVADO (PRD, constitution, design, arquitetura, ADR) ou uma mudanca de escopo no meio da sprint, com registro rastreavel em spec/changes/CHG-NNN-*.md e reabertura controlada do gate. USE SEMPRE QUE o usuario disser "mudou o requisito", "preciso alterar o PRD", "o escopo mudou", "reabrir a fase", "voltar atras", "o design nao cabe", "trocar a decisao D-N", "mudar a arquitetura aprovada", change request, emenda, ou quando uma fase ja fechada precisar mudar. Dispare para evitar edicao silenciosa de artefato aprovado — toda mudanca vira registro. Para um defeito use sdd-bug; para uma fase ainda nao aprovada, continue na propria skill da fase.
---

# Amend — mudar um artefato aprovado (sem edicao silenciosa)

A cadeia tem gates, mas projeto real volta atras: o design muda o PRD, a arquitetura muda o design. Aqui a mudanca e **rastreada**, nao escondida. Regra: artefato aprovado e ADR aceito **nunca** sao reescritos em silencio — viram emenda ou supersede.

## Como conduzir
1. Identifique o artefato e o trecho afetado (ex.: `PRD-V1-01` / decisao `D-3`; `ADR-0004`).
2. Crie `spec/changes/CHG-NNN-<slug>.md` a partir de `${CLAUDE_PLUGIN_ROOT}/templates/change.template.md`: o que muda, **por que**, tipo da mudanca e o **impacto**.
3. Escolha o tipo:
   - **Emenda in-place:** mudanca pequena/aditiva. Edite o artefato e anote no topo "emendado por CHG-NNN".
   - **Supersede:** mudanca grande/quebra. Crie a nova versao (ex.: novo ADR `ADR-0009` que supersede o `ADR-0004`; ou novo PRD de versao superior) com link nos dois sentidos. Nao apague o antigo.
4. **Avalie o impacto** e propague: tasks que precisam reabrir (`done -> todo` com motivo), sprints afetadas, design/arquitetura/monetizacao a revisar. Se um gate precisa reabrir, marque em `state.json` (`gatePassed=false` com nota) e reconduza a fase.
5. Atualize os artefatos afetados e o `state.json` (`changes[]`, gates).

## GATE
- [ ] Mudanca registrada em CHG-NNN (o que, por que, tipo).
- [ ] Impacto avaliado (tasks/sprints/fases afetadas) e propagado.
- [ ] Supersede com link bidirecional (nada reescrito em silencio).
- [ ] `state.json` reflete reaberturas de gate.

## Ao concluir (doc gate)
- Registre a emenda na secao *Emendas* do `spec/STATUS.md` e rode `node ${CLAUDE_PLUGIN_ROOT}/scripts/render-status.mjs`.
- Diga o que mudou, o impacto e qual fase/sprint precisa ser reconduzida.
