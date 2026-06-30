---
name: sdd-constitution
description: Fase 1 do harness SDD. Define as regras de engenharia inegociaveis do projeto - tipos, testes/cobertura, ADRs, ambientes, design system, seguranca, monetizacao, ordem de build e a politica de Git (branch por feature/fix). Produz spec/constitution.md. USE SEMPRE QUE o usuario for definir "as regras do projeto", "como vamos trabalhar", padroes de engenharia, stack obrigatoria, politica de branches/commits, ou logo apos a Fase 0 (opportunity). Dispare quando faltar um acordo de padroes antes de comecar a especificar.
---

# Fase 1 — Constitution

Escreve as regras inegociaveis (1 pagina). Tudo nas fases seguintes obedece a isto.

## Como conduzir
1. Confirme em `spec/state.json` que `opportunity.gatePassed = true`.
2. Use `${CLAUDE_PLUGIN_ROOT}/templates/constitution.template.md`.
3. Proponha os defaults e ajuste com o usuario:
   - TypeScript strict sempre.
   - Toda feature nasce com teste do dominio (definir alvo de cobertura, ex.: 80%).
   - Nenhuma decisao de arquitetura sem ADR.
   - Nada sobe pra AWS sem passar verde no ambiente local.
   - Toda UI consulta o design system (`spec/design-system.md` + `spec/design-tokens.json`).
   - Secrets nunca no codigo.
   - Cobranca em USD e BRL desde o MVP.
   - Ordem de build por fatia: Banco -> Backend -> Frontend.
   - **Politica de Git:** uma branch por feature/fix (`feature/<slug>`, `fix/<slug>`, `chore/<slug>`); nunca commitar direto na `main`; commit + push na branch -> PR -> merge na `main` -> apagar a branch. Ver `${CLAUDE_PLUGIN_ROOT}/reference/git-workflow.md`.
   - **Documentacao como gate:** STATUS.md e a fonte da verdade e e atualizado a cada fase/task/sprint. Ver `${CLAUDE_PLUGIN_ROOT}/reference/documentation-standards.md`.
   - **Profile do projeto** (em `state.json`): `billing` (cobra ou nao), `markets` (USD/BRL/ambos), `cloud` (`aws`|`none`). As fases monetize/architect/deploy respeitam isso — ajuste aqui se o projeto nao cobra ou nao usa AWS.
4. Preencha `spec/constitution.md`.

## GATE
- [ ] Cobre tipos, testes (com numero), ADRs, ambientes, design system, seguranca, monetizacao, ordem de build, politica de Git e doc gate.

## Ao concluir (doc gate)
- Atualize `spec/state.json` (constitution completed/gatePassed, currentPhase="prd") e registre a conclusao no `spec/STATUS.md`.
- Diga: "Fase 1 aprovada. Proximo: Fase 2 — rode `sdd-prd`."
