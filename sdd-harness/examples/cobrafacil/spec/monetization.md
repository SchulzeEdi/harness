# Monetizacao — cobrafacil (USD + BRL)

## Tiers
- Free: ate 3 clientes.
- BRL: R$ 29/mes. USD: US$ 9/mes.

## Gateways
- **BRL:** Stripe BR + Pix (D-2).
- **USD:** Lemon Squeezy (Merchant of Record, D-3) — recolhe imposto global.

## Camada abstrata
Interface PaymentProvider (createCheckout/handleWebhook/getSubscription/cancel), selecionada por mercado/locale. Checkout USD e BRL como tasks nao-opcionais.

## Webhooks minimos
checkout.completed, subscription.updated/canceled, invoice.paid/failed -> tabela subscriptions.

> Aviso: padroes tecnicos nao substituem contador (BR) / especialista (exterior).
