---
name: sdd-opportunity
description: Fase 0 do harness SDD. Valida a oportunidade de um micro-SaaS antes de construir qualquer coisa - quem paga, em que mercado (USD/BRL), por quanto, e se vale a pena. Produz spec/opportunity.md. USE SEMPRE QUE o usuario chegar com uma ideia de produto/negocio, disser "tenho uma ideia", "sera que vale a pena", "quem pagaria por isso", "quanto cobrar", "vale construir?", validar mercado/demanda, ou logo apos sdd-init. Dispare antes de escrever spec ou codigo, mesmo que o usuario ja esteja animado para programar.
---

# Fase 0 — Opportunity

Objetivo: decidir se a ideia vale o esforco, ANTES de escrever spec ou codigo. Foco em monetizacao real nos dois mercados (dolar fora do Brasil, real no Brasil).

## Como conduzir
1. Leia `spec/state.json` para confirmar que a fase atual e `opportunity`.
2. Leia o template em `${CLAUDE_PLUGIN_ROOT}/templates/opportunity.template.md` (no diretorio do plugin) e use-o como estrutura exata do artefato.
3. Conduza o usuario com perguntas dirigidas, uma de cada vez, sobre:
   - **Problema/dor**: que dor concreta isso resolve? para quem?
   - **ICP por mercado**: descreva o cliente ideal USD e o cliente ideal BRL (podem ser diferentes).
   - **Sinais de demanda**: concorrentes, comunidades, buscas, disposicao a pagar.
   - **Modelo de receita**: assinatura, uso, one-time? Faixa de preco **em USD e em BRL**.
   - **Por que agora / por que voce**: timing e vantagem injusta.
4. Preencha `spec/opportunity.md` com o template.

## GATE (nao avance sem isso)
So marque a fase como concluida se o artefato tiver:
- [ ] Pelo menos um cliente pagante hipotetico **nomeado** (persona concreta, nao "todo mundo").
- [ ] Um numero de preco **para cada mercado** (USD e BRL).
- [ ] Um modelo de receita explicito.

Se faltar qualquer item, NAO avance. Diga o que falta e ajude a refinar a ideia. Uma oportunidade fraca aqui custa meses depois.

## Ao concluir (doc gate)
- Atualize `spec/state.json`: `opportunity.status = "completed"`, `gatePassed = true`, `currentPhase = "constitution"`.
- Registre a conclusao da fase (e o go/no-go) no `spec/STATUS.md`. Ver `${CLAUDE_PLUGIN_ROOT}/reference/documentation-standards.md`.
- Diga: "Fase 0 aprovada. Proximo: Fase 1 — rode `sdd-constitution`."
