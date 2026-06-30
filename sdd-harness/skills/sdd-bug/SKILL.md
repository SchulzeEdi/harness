---
name: sdd-bug
description: Skill de rastreamento de bugs do harness SDD. Registra um bug com origem rastreavel ate a sprint/task e conduz a correcao numa branch fix/. Produz spec/bugs/BUG-NNN-*.md e atualiza STATUS e state.json. USE SEMPRE QUE aparecer um bug, defeito, erro, "ta quebrado", "nao funciona", "deu errado", "comportamento estranho", regressao, crash, ou quando o usuario pedir para corrigir/consertar algo. Dispare mesmo que ele nao diga a palavra "bug", desde que descreva um comportamento errado. Para implementar uma feature nova use sdd-implement; para revisar codigo use sdd-review.
---

# Bug — registrar e corrigir

> **Incidente de producao** (alerta Sentry/CloudWatch com impacto a usuario): abra tambem um postmortem `spec/incidents/INC-NNN-*.md` (template `incident`) e siga `${CLAUDE_PLUGIN_ROOT}/reference/observability-playbook.md`. A correcao segue como bug normal — delegue ao agente `sdd-bug-fixer`.

## Registrar
1. Use `${CLAUDE_PLUGIN_ROOT}/templates/bug.template.md`. Crie `spec/bugs/BUG-NNN-<slug>.md` (NNN sequencial) com:
   - descricao, passos para reproduzir, comportamento esperado x atual, severidade.
   - **origem rastreavel**: sprint e/ou task onde foi introduzido (se conhecido).
   - estado: aberto.
2. Registre o bug em `spec/STATUS.md` (secao Bugs em aberto) e no array `bugs` de `spec/state.json`.

## Corrigir
> Prefira **delegar ao agente `sdd-bug-fixer`** (via Task): ele reproduz, escreve o teste que falha, corrige e roda os gates em contexto isolado. O fluxo manual abaixo e o fallback.
1. Crie a branch `fix/<slug>` a partir da `main`.
2. Invoque/aplique o fluxo de `sdd-implement` (DB->Back->Front conforme o caso, com teste que cobre o bug e os quality gates locais) e passe por `sdd-review`