---
name: sdd-monetize
description: Fase 5 do harness SDD. Define como o micro-SaaS recebe dinheiro nos dois mercados - tiers de preco, gateways USD (Stripe/Merchant of Record) e BRL (Pix/Stripe BR/gateways locais), checkout, webhooks, modelo de assinatura e playbook fiscal. Produz spec/monetization.md. USE SEMPRE QUE o usuario falar em cobranca, billing, pagamento, "como cobrar", precos, planos, assinatura, gateway, Stripe, Pix, checkout, webhook, USD/BRL, monetizar, faturamento, ou apos a arquitetura. Dispare para garantir que o dinheiro entra nos dois mercados desde o MVP.
---

# Fase 5 — Monetize (USD + BRL)

Objetivo: garantir que o dinheiro entra nos dois mercados, ligando o billing a arquitetura.

## Como conduzir
0. **Cheque o profile** (`state.json`): se `billing=false`, o projeto nao cobra — registre isso, marque a fase como concluida com nota e pule para tasks. Se `markets` tem so um (USD ou BRL), faca so esse mercado (o resto desta skill assume os dois).
1. Confirme `architect.gatePassed = true`.
2. Leia `spec/opportunity.md` (precos) e `spec/architecture.md`; do plugin: `${CLAUDE_PLUGIN_ROOT}/reference/monetization-playbook.md`. Use a interface em `${CLAUDE_PLUGIN_ROOT}/reference/scaffolds/billing/payment-provider.ts`.
3. Use `${CLAUDE_PLUGIN_ROOT}/templates/monetization.template.md`.
4. Defina:
   - **Tiers de preco** (USD e BRL) consistentes com a Fase 0.
   - **Gateway por mercado**: USD via Stripe ou Merchant of Record (Lemon Squeezy/Paddle); BRL via Stripe BR/Pix ou gateway local (Pagar.me/Asaas/Iugu).
   - **Camada de billing abstrata**: interface `PaymentProvider` com implementacoes USD e BRL, selecionada por mercado/locale.
   - **Fluxo de checkout**, **webhooks** de billing e **modelo de dados** de assinatura.
   - **Playbook fiscal/operacional** (MEI/CNPJ no Brasil; estrutura para receber USD).
5. Preencha `spec/monetization.md`.

## Importante
Inclua sempre o aviso: padroes tecnicos/operacionais nao substituem orientacao de um contador (Brasil) e de especialista (estrutura no exterior). Regras fiscais variam por volume e situacao.

## GATE
- [ ] Tiers definidos em USD e BRL.
- [ ] Um gateway escolhido para cada mercado.
- [ ] Camada de billing abstrata especificada (checkout USD e BRL nao-opcionais).

## Ao concluir (doc gate)
- Atualize `state.json`: `monetize` completed/gatePassed, `currentPhase = "tasks"`. Registre tiers/gateways no `spec/STATUS.md`. Ver `${CLAUDE_PLUGIN_ROOT}/reference/documentation-standards.md`.
- Diga: "Fase 5 aprovada. Proximo: Fase 6 — rode `sdd-tasks`."
