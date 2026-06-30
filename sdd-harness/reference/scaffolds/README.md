# Scaffolds — pontos de partida canonicos

Usados por `sdd-init` (bootstrap) e `sdd-implement` (por task). Nao sao codigo final: sao **esqueletos opinativos** alinhados a `reference/architecture-patterns.md` (Next.js + TS strict, Drizzle, Vitest, Zod, modular monolith, multi-tenancy row-level, billing USD+BRL). Copie e adapte; nunca invente padrao novo sem ADR.

| Arquivo | Para que serve | Quem usa |
|---|---|---|
| `config/.gitignore` | ignore base (node, env, build) | sdd-init |
| `config/docker-compose.yml` | ambiente local (Postgres + LocalStack) | sdd-init / environments |
| `storybook/main.ts`, `preview.ts` | catalogo visual do design system | sdd-init (Fase 3) |
| `design/tailwind.config.ts` | Tailwind a partir do design-tokens.json | sdd-implement (Front) |
| `db/schema.ts` | schema Drizzle com tenant_id | sdd-implement (Banco) |
| `db/0001_init.sql` | exemplo de migration | sdd-implement (Banco) |
| `modules/module-structure.md` | fronteiras de dominio do monolito modular | sdd-architect / implement |
| `api/route-handler.ts` | Route Handler Next.js com Zod | sdd-implement (Backend) |
| `billing/payment-provider.ts` | interface PaymentProvider (USD+BRL) | sdd-monetize / implement |
| `config/validation.ts` | validacao Zod nas bordas | sdd-implement |
| `db/example.test.ts` | teste de dominio (Vitest) | sdd-implement (testes) |
| `adr/0001-example.md` | ADR de exemplo ja preenchido | sdd-architect |

## Tenancy (isolamento multi-tenant)
| `tenancy/repository.ts` | repo que injeta tenant_id em toda query | sdd-implement |
| `tenancy/isolation.test.ts` | teste de isolamento A-nao-ve-B (obrigatorio em feature de dados) | sdd-review |
| `db/rls.sql` | Row-Level Security no Postgres (defesa em profundidade) | sdd-architect |

## Load test
| `loadtest/k6-load.js` | script k6 em rampa (nominal->10x) com thresholds | sdd-loadtest |
