# Arquitetura — cobrafacil

## Componentes (modular monolith)
modulos: auth, billing, tenancy, charges (core). App Next.js fino orquestra.

## Modelo de dados (multi-tenancy row-level)
tenants, users(tenant_id), customers(tenant_id), charges(tenant_id, customer_id, amount, currency, status), subscriptions.

## Contratos de API
POST /api/charges, GET /api/charges, POST /api/webhooks/billing.

## Infra AWS
SST/OpenNext (Lambda+CloudFront), RDS Postgres, S3, SES (e-mail). IaC em infra/. Ambientes local(Docker+LocalStack)->staging->prod, mesma IaC.

## O que quebra com 10x?
- Conexoes de banco -> RDS Proxy/pooling (DT-01).
- Envio de lembrete em massa -> fila SQS + worker.
- Webhooks concorrentes -> idempotencia por event id.

## ADRs
- ADR-0001: ORM Drizzle.
