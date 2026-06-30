# Reference — Monetization playbook (USD + BRL)

Usado pela Fase 5 (`sdd-monetize`).

> Aviso: nao sou contador nem advogado. O que segue sao padroes tecnicos/operacionais comuns; valide a parte fiscal/juridica com um contador brasileiro e, para estrutura no exterior, com um especialista. Regras mudam e dependem do seu volume e situacao.

## Receber em dolar (clientes fora do Brasil)
- **Mais simples (solo dev):** Merchant of Record como Lemon Squeezy ou Paddle — sao o vendedor legal, recolhem imposto global (VAT/sales tax) por voce e repassam o liquido. Taxa maior, menos controle.
- **Mais controle:** Stripe. Muitos brasileiros abrem uma LLC nos EUA (ex.: via Stripe Atlas) + conta Mercury/Wise e trazem o dinheiro via cambio. Implicacoes fiscais nos dois paises — exige contador.
- **Trazer o liquido ao Brasil:** Wise/Payoneer costumam dar cambio melhor que banco tradicional.

## Receber em real (Brasil)
- **Stripe Brasil** ja suporta BRL e Pix (pode dar para usar um so gateway). Alternativas locais fortes: Pagar.me, Asaas, Iugu (boas em Pix + boleto + recorrencia).
- **Pix e obrigatorio** para conversao no Brasil; boleto importa em alguns nichos.
- **Fiscal:** comecar como MEI e migrar para ME (Simples Nacional) conforme cresce; SaaS normalmente exige CNPJ para emitir nota. Confirme CNAE e tributacao com contador.

## Camada de billing abstrata (no codigo)
Interface `PaymentProvider` com `createCheckout`, `handleWebhook`, `getSubscription`, `cancel`. Implementacoes para USD e BRL, selecionadas por mercado/locale do cliente. Todo projeto nasce com checkout USD **e** BRL como tasks no backlog — nao opcional.

## Eventos de webhook minimos
checkout.completed, subscription.updated/canceled, invoice.paid/failed -> atualizar tabela `subscriptions` (status, periodo, plano).
