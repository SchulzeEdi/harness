# ADR 0001 — ORM: Drizzle

- **Data:** 2026-06-05
- **Status:** aceito

## Contexto
Acesso a dados type-safe num monolito modular TS, migrations versionadas, baixo overhead em Lambda.

## Decisao
Adotar Drizzle.

## Alternativas
- Prisma (DX otima, runtime mais pesado em Lambda).
- SQL puro (controle total, menos type-safety).

## Consequencias
- (+) type-safe, leve, migrations versionadas.
- (-) ecossistema menor. Indexado no STATUS.
