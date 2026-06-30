# Reference — Arquitetura de referencia (micro-SaaS TypeScript na AWS)

Default opinativo usado pela Fase 4 (`sdd-architect`). Deliberadamente "chato e provado": chato escala e gera dinheiro; novidade gera bugs.

## Stack default
- **App:** Next.js (App Router), TypeScript strict. Server Actions / Route Handlers como API.
- **Banco:** Postgres no Amazon RDS (ou Aurora Serverless v2 para trafego irregular).
- **ORM:** Drizzle (type-safe, leve) ou Prisma — decisao via ADR.
- **Auth:** Clerk (acelera muito solo) ou Auth.js — ADR.
- **Storage/CDN:** S3 + CloudFront.
- **Compute AWS (recomendado):** SST/OpenNext deployando Next.js sobre Lambda + CloudFront (TS-native, otimo fluxo local->AWS, usa CDK por baixo). Alternativa para workers/APIs dedicadas: ECS Fargate.
- **IaC:** AWS CDK (ou SST) em TypeScript, versionado em `infra/`.
- **Observabilidade:** Sentry (erros) + PostHog (produto) desde o dia 1; CloudWatch para logs/metricas.
- **Testes:** Vitest (dominio) + Playwright (e2e dos fluxos de receita).

## Padrao: Modular Monolith
Nao microsservicos (over-engineering e dreno de dinheiro com 0 usuarios). Monolito modular com fronteiras de dominio explicitas:

```
src/
├── modules/
│   ├── auth/        (identidade, sessoes)
│   ├── billing/     (assinaturas, faturas, webhooks)
│   ├── tenancy/     (organizacoes, membros, isolamento)
│   └── <core>/      (o dominio que E o produto)
├── shared/          (tipos, utils, db client, config)
└── app/             (rotas Next.js — finas, so orquestram modulos)
```
Cada modulo tem seus tipos e so conversa com outros via interfaces. Simplicidade de deploy hoje; extracao para servico separado so quando (e se) a escala exigir.

## Multi-tenancy
Row-level (coluna `tenant_id` + politicas) — simples e suficiente ate milhares de tenants. Schema-per-tenant so via ADR com requisito real.

## O que escala primeiro (a Fase 4 obriga a documentar)
- Conexoes de banco -> pooling / RDS Proxy.
- Jobs longos -> SQS + worker (Fargate/Lambda).
- Custo de IA (se houver LLM) -> cache + rate limit.
