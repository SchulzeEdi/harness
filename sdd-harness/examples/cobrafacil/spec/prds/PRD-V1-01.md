# PRD-V1-01 — MVP cobranca + lembrete

## Problema
Freelancer perde cobranca e recebe atrasado, em dois mercados (USD/BRL).

## Escopo
**In:** cadastrar cliente; criar cobranca (USD ou BRL); enviar link de pagamento; lembrete automatico por e-mail; marcar como pago (webhook).
**Out (V1):** lembrete por WhatsApp; multi-usuario por conta; relatorios avancados.

## Personas / jornada
Freelancer cria cobranca -> envia link -> cliente paga (Pix/cartao USD) -> webhook marca pago -> sistema para de lembrar.

## Requisitos nao-funcionais
- p95 < 300ms nos endpoints de cobranca.
- i18n USD/BRL (moeda e idioma).
- Isolamento por tenant (cada freelancer so ve o seu).

## Criterios de sucesso
- 20 freelancers pagantes em 60 dias.
- < 1% de erro no fluxo de checkout.

## Decisoes (D-N)
- **D-1:** lembrete por e-mail no MVP (WhatsApp fica para V2). Motivo: custo/complexidade de API.
- **D-2:** Pix obrigatorio no BRL. Motivo: conversao no Brasil.
- **D-3:** receber USD via Merchant of Record (Lemon Squeezy). Motivo: evitar abrir LLC no MVP.

## Riscos
- Cambio/680 fiscal no USD -> mitigado por MoR.
- Entregabilidade de e-mail -> usar provedor com boa reputacao.
