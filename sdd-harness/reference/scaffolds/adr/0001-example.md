# ADR 0001 — ORM: Drizzle

- **Data:** 2026-06-25
- **Status:** aceito

## Contexto
Precisamos de acesso a dados type-safe num monolito modular TS, com migrations versionadas e baixo overhead.

## Decisao
Adotar **Drizzle** como ORM/queries.

## Alternativas
- Prisma: DX otima, mas runtime mais pesado e menos controle de SQL.
- SQL puro: controle total, menos seguranca de tipos.

## Consequencias
- (+) Type-safety ponta a ponta, migrations versionadas, leve.
- (-) Ecossistema menor que Prisma.
- Indexado no STATUS (Indice de decisoes).
