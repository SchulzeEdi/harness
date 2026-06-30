---
description: Inicia um novo projeto SDD (roda init + abre a Fase 0 Opportunity)
---

Inicie um novo projeto de micro-SaaS sob o harness SDD.

1. Invoque a skill `sdd-init` para criar a pasta `spec/` (com STATUS.md, state.json, subpastas prds/tasks/sprints/bugs/adr/mvp_scope), o `docker-compose.yml` e o `.storybook/`.
2. Em seguida invoque a skill `sdd-opportunity` (Fase 0).
3. Ao final, mostre a fase atual e o proximo passo da cadeia.

Cadeia: opportunity -> constitution -> prd -> design -> architect -> monetize -> tasks -> (loop: sprint -> implement -> retro).

Argumentos opcionais (nome do projeto, ideia inicial): $ARGUMENTS
