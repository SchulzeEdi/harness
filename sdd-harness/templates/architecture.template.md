# 04 — Architecture: <NOME DO PROJETO>

> O COMO tecnico. Default: modular monolith em TypeScript, infra AWS.

## Visao de componentes
<Diagrama textual ou mermaid: app (Next.js), modulos de dominio, banco, storage, integracoes.>

## Modulos de dominio (fronteiras)
- `auth/` — identidade, sessoes
- `billing/` — assinaturas, faturas, webhooks
- `tenancy/` — organizacoes, membros, isolamento
- `<core>/` — o dominio que E o produto
- `shared/` — tipos, utils, db client, config

## Modelo de dados
| Entidade | Campos-chave | Relacoes | tenant_id? |
|---|---|---|---|
| ... | ... | ... | sim/nao |
- Indices relevantes:
- Estrategia multi-tenant: row-level (default) / outra (justificar em ADR)

## Contratos de API
<Endpoints/Server Actions principais, payloads, auth.>

## Infra AWS
- **Compute:** <SST/OpenNext em Lambda+CloudFront (default) | ECS Fargate> (ADR)
- **Banco:** <RDS Postgres | Aurora Serverless v2> (ADR)
- **Storage/CDN:** S3 + CloudFront
- **IaC:** AWS CDK / SST em `infra/`
- **Filas/jobs (se houver):** SQS + worker

## Ambientes (mesma IaC, tamanhos diferentes)
- **Local:** Docker Compose (Postgres + LocalStack) — onde se testa.
- **Staging:** AWS, replica menor.
- **Producao:** AWS.

## Escala — "o que quebra com 10x usuarios?"
- Conexoes de banco: <plano: pooling / RDS Proxy>
- Jobs longos: <plano: fila>
- Custo de IA (se aplicavel): <cache + rate limit>

## ADRs relacionados
- ADR-0001 <titulo>
- ADR-0002 <titulo>

---
**Gate:**
- [ ] Cada decisao nao-trivial tem ADR
- [ ] Responde "o que quebra com 10x?"
- [ ] Infra AWS + 3 ambientes via mesma IaC
- [ ] Modelo de dados respeita multi-tenancy
