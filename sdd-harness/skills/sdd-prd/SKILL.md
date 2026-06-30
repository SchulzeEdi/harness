---
name: sdd-prd
description: Fase 2 do harness SDD. Gera um Product Requirements Document (PRD) via Discovery Interview - perguntas em lotes de 4 a 5 por vez - definindo problema, escopo (in/out), decisoes (D-N), criterios de sucesso e riscos. Produz spec/prds/PRD-V1-NN.md. USE SEMPRE QUE o usuario quiser especificar/documentar o que o produto faz, "levantar requisitos", "escrever o PRD", definir escopo, "o que entra e o que fica de fora", personas e jornadas, ou apos a constitution. Dispare quando a ideia ja foi validada mas ainda falta o "o que" detalhado.
---

# Fase 2 — PRD (Product Requirements Document)

Objetivo: transformar a oportunidade num PRD claro e acionavel, via entrevista de descoberta.

## Como conduzir (Discovery Interview)
1. Confirme `constitution.gatePassed = true` em `spec/state.json`. Leia `spec/opportunity.md`.
2. Use `${CLAUDE_PLUGIN_ROOT}/templates/prd.template.md`.
3. **Conduza a entrevista em LOTES de 4 a 5 perguntas por vez** (nunca uma avalanche). Apos cada lote, sintetize as respostas e so entao faca o proximo lote. Cubra, ao longo dos lotes:
   - **Problema**: dor, contexto, quem sofre, evidencias.
   - **Escopo**: o que entra (in-scope) e o que NAO entra (out-of-scope) nesta versao.
   - **Usuarios/personas** e jornadas principais.
   - **Requisitos funcionais** e nao-funcionais (performance, seguranca, i18n USD/BRL).
   - **Criterios de sucesso** com numero-alvo.
   - **Riscos** e mitigacoes.
4. **Decisoes (D-N):** registre cada decisao tomada durante a entrevista como `D-1`, `D-2`, ... com a opcao escolhida e o motivo. Sao o nucleo rastreavel do PRD.
5. Numere o PRD: `spec/prds/PRD-V1-NN.md`. **Versionamento:** `V<major>` = versao do produto; `NN` = PRD sequencial dentro dela (o primeiro e `PRD-V1-01`). Mudanca que quebra um PRD ja aprovado nao reescreve o arquivo — vira `PRD-V2-NN` que **supersede** o anterior via `sdd-amend` (registro CHG). Mudanca pequena = emenda in-place anotada.
6. Registre o PRD em `spec/STATUS.md` (lista de PRDs ativos), as decisoes D-N no indice de decisoes, e em `spec/state.json` (array `prds`).

## GATE
- [ ] Problema, escopo (in/out), criterios de sucesso (com numero) e riscos preenchidos.
- [ ] Pelo menos as decisoes-chave registradas como D-N (com motivo).
- [ ] Entrevista feita em lotes de 4-5 perguntas (nao tudo de uma vez).

## Ao concluir (doc gate)
- Atualize `spec/state.json` (prd completed/gatePassed, currentPhase="design") e o `spec/STATUS.md` (PRD + D-N no indice de decisoes). Ver `${CLAUDE_PLUGIN_ROOT}/reference/documentation-standards.md`.
- Diga: "PRD-V1-NN aprovado. Proximo: Fase 3 — rode `sdd-design`."
