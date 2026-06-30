# 05 — Monetization: <NOME DO PROJETO>

> Como o dinheiro entra nos dois mercados. Checkout USD e BRL nao sao opcionais.

> Aviso: padroes tecnicos/operacionais abaixo nao substituem orientacao de um contador (Brasil) e de especialista para estrutura no exterior. Regras fiscais variam por volume e situacao.

## Tiers de preco
| Tier | USD | BRL | Limites/recursos |
|---|---|---|---|
| Free | $0 | R$0 | <limites> |
| Pro  | $__ /mes | R$__ /mes | <recursos> |
| Team | $__ /mes | R$__ /mes | <recursos> |

## Gateways por mercado
- **USD (exterior):** <Stripe | Lemon Squeezy/Paddle (Merchant of Record)> — justificativa.
- **BRL (Brasil):** <Stripe BR/Pix | Pagar.me | Asaas | Iugu> — justificativa. Pix obrigatorio.

## Camada de billing (codigo)
- Interface `PaymentProvider` com metodos: createCheckout, handleWebhook, getSubscription, cancel.
- Implementacoes: `StripeUsdProvider`, `<BrlProvider>`.
- Selecao por mercado/locale do cliente.

## Fluxo de checkout
<Passo a passo: selecao de plano -> checkout do provider -> webhook confirma -> ativa assinatura.>

## Webhooks e modelo de assinatura
- Eventos tratados: <checkout.completed, subscription.updated, invoice.paid, ...>
- Tabela `subscriptions`: tenant_id, provider, plan, status, current_period_end, ...

## Fiscal / operacional
- **Brasil:** comecar como MEI -> migrar para ME (Simples Nacional) conforme cresce; emissao de NF; confirmar CNAE/tributacao de SaaS com contador.
- **Exterior (USD):** estrutura para receber/sacar (ex.: LLC + Mercury/Wise, ou MoR que ja recolhe imposto). Validar com especialista.

---
**Gate:**
- [ ] Tiers em USD e BRL
- [ ] Um gateway por mercado escolhido
- [ ] Camada de billing abstrata especificada
