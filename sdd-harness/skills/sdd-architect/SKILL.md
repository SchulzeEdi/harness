---
name: sdd-architect
description: Fase 4 do harness SDD. Projeta a arquitetura tecnica de um micro-SaaS escalavel - componentes, modelo de dados, fronteiras de dominio, multi-tenancy, contratos de API e a infra AWS (local -> staging -> producao), gerando ADRs. Produz spec/architecture.md e spec/adr/. USE SEMPRE QUE o usuario falar em arquitetura, "como construir tecnicamente", banco de dados, modelagem, API, infra, AWS, escalabilidade, "o que quebra com 10x", decisao tecnica/ADR, multi-tenant, ou apos o design. Dispare antes de quebrar em tasks, para o COMO tecnico ficar claro.
---

# Fase 4 — Architect (arquitetura + infra AWS)

Objetivo: definir o COMO tecnico para escalar sem dividas, com infra AWS e ambiente de teste local.

## Como conduzir
1. Confirme `design.gatePassed = true`.
2. Leia `spec/prds/PRD-V1-01.md`, `spec/design-system.md`, e do plugin: `${CLAUDE_PLUGIN_ROOT}/reference/architecture-patterns.md` e `${CLAUDE_PLUGIN_ROOT}/reference/environments.md`.
3. Use `${CLAUDE_PLUGIN_ROOT}/templates/architecture.template.md` e `${CLAUDE_PLUGIN_ROOT}/templates/adr.template.md`. Aproveite os scaffolds em `${CLAUDE_PLUGIN_ROOT}/reference/scaffolds/` (modulos, schema, route-handler).
4. Defina:
   - **Componentes** e **fronteiras de dominio** (default: modular monolith — modulos auth/billing/tenancy/<core>).
   - **Modelo de dados** (entidades, relacoes, indices, `tenant_id`).
   - **Multi-tenancy** (default: row-level, coluna `tenant_id`). Especifique o **isolamento**: repositorio que injeta `tenant_id` em toda query (scaffold `tenancy/repository.ts`) + RLS no Postgres (`db/rls.sql`) como defesa em profundidade.
   - **Cloud:** respeite `profile.cloud` — se `none`, defina o alvo real (ex.: VPS/Vercel) em vez da infra AWS; o resto (3 ambientes via mesma IaC) continua valendo.
   - **Contratos de API**.
   - **Infra AWS**: compute (default recomendado: SST/OpenNext em Lambda+CloudFront; alternativa ECS Fargate), banco (RDS/Aurora Serverless v2), S3, CloudFront, IaC em `infra/` (CDK/SST).
   - **Ambientes**: local (Docker+LocalStack) -> staging (AWS) -> producao (AWS), mesma IaC.
   - **Escala**: responda explicitamente "o que quebra com 10x usuarios?" (conexoes de banco, jobs longos, custo de IA).
5. **Para cada decisao nao-trivial, crie um ADR** em `spec/adr/NNNN-titulo.md` (ORM, compute AWS, auth, fila, etc.).
6. Preencha `spec/architecture.md`.

## GATE
- [ ] Cada decisao tecnica nao-trivial tem um ADR.
- [ ] A arquitetura responde "o que quebra com 10x?".
- [ ] Infra AWS + os 3 ambientes estao definidos via mesma IaC.
- [ ] Modelo de dados respeita multi-tenancy.

## Ao concluir (doc gate)
- Atualize `state.json`: `architect` completed/gatePassed, `currentPhase = "monetize"`. Registre cada ADR no **indice de decisoes** do `spec/STATUS.md`. Ver `${CLAUDE_PLUGIN_ROOT}/reference/documentation-standards.md`.
- Diga: "Fase 4 aprovada. Proximo: Fase 5 — rode `sdd-monetize`."
