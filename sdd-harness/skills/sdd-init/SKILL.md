---
name: sdd-init
description: Inicializa um novo projeto Spec-Driven Development e cria a estrutura base. USE SEMPRE QUE o usuario quiser comecar/criar um projeto novo, micro-SaaS, app ou produto do zero, disser "novo projeto", "bora comecar", "criar do zero", "montar a estrutura", "iniciar o spec", ou rodar /sdd-new. Cria spec/ (STATUS.md, state.json, subpastas prds, tasks, sprints, bugs, adr, mvp_scope, deploys, logbook, experiments), docker-compose.yml, infra/ e .storybook/. Dispare no inicio absoluto, antes de qualquer fase. Prepara o terreno para a Fase 0 (opportunity).
---

# sdd-init — Bootstrap do projeto SDD

Cria a estrutura base e deixa tudo pronto para a Fase 0.

## Passos
1. Pergunte o nome do projeto (slug kebab-case) se nao informado.
2. Inicialize o Git se ainda nao houver repo (`git init`), com `main` como branch padrao. Crie o `.gitignore` a partir de `${CLAUDE_PLUGIN_ROOT}/reference/scaffolds/config/.gitignore`.
3. Crie a estrutura:
   ```
   spec/
     prds/                # PRD-V1-NN.md
     tasks/               # TASKS-PRD-V1-NN.md
     sprints/             # SPRINT-NNN-*.md e RETRO-NNN-*.md
     bugs/                # BUG-NNN-*.md
     adr/                 # Architecture Decision Records
     deploys/             # DEPLOY-NNN-*.md
     loadtests/           # LOAD-NNN-*.md (carga/desempenho)
     changes/             # CHG-NNN-*.md (emendas a artefatos aprovados)
     incidents/           # INC-NNN-*.md (postmortems de producao)
     logbook/             # LOG-AAAAMM.md (diario de bordo: tokens/custo/tempo)
     experiments/         # EXP-NNN-*.md (vibe coding x SDD)
     mvp_scope/           # historico imutavel — NAO editar
     STATUS.md            # fonte da verdade
     state.json           # estado legivel por maquina
   infra/                 # IaC (AWS CDK/SST) — populado na Fase 4
   docker-compose.yml     # copiado de scaffolds/config/ (Postgres + LocalStack)
   .storybook/            # catalogo visual do design system — copiado de scaffolds/storybook/
   ```
4. Escreva `spec/STATUS.md` a partir de `${CLAUDE_PLUGIN_ROOT}/templates/status.template.md`.
5. Crie `spec/mvp_scope/README.md` com o aviso: "Historico imutavel do escopo de MVP fechado. Nao editar."
6. Copie do `${CLAUDE_PLUGIN_ROOT}/reference/scaffolds/`: `config/docker-compose.yml`, `storybook/` (main.ts, preview.ts) e `ci/github-actions.yml` -> `.github/workflows/ci.yml`. **Vende os scripts** do harness em `scripts/sdd/` (copie `${CLAUDE_PLUGIN_ROOT}/scripts/*.mjs` e `*.sh`) para o CI e os hooks usarem a mesma copia.
7. Escreva `spec/state.json`:
   ```json
   {
     "project": "<slug>",
     "createdAt": "<ISO>",
     "currentPhase": "opportunity",
     "git": { "defaultBranch": "main", "branchPerFeature": true },
     "profile": { "billing": true, "markets": ["USD", "BRL"], "cloud": "aws", "budgetUsd": 0 },
     "phases": {
       "opportunity":  { "status": "pending", "gatePassed": false, "artifact": "spec/opportunity.md" },
       "constitution": { "status": "pending", "gatePassed": false, "artifact": "spec/constitution.md" },
       "prd":          { "status": "pending", "gatePassed": false, "artifact": "spec/prds/" },
       "design":       { "status": "pending", "gatePassed": false, "artifact": "spec/design-system.md" },
       "architect":    { "status": "pending", "gatePassed": false, "artifact": "spec/architecture.md" },
       "monetize":     { "status": "pending", "gatePassed": false, "artifact": "spec/monetization.md" },
       "tasks":        { "status": "pending", "gatePassed": false, "artifact": "spec/tasks/" }
     },
     "sprints": [],
     "prds": [],
     "bugs": [],
     "deploys": [],
     "loadtests": [],
     "changes": [],
     "logbook": { "interactions": 0, "tokensIn": 0, "tokensOut": 0, "costUsd": 0, "timeMin": 0 },
     "experiments": []
   }
   ```
   > `profile` define o escopo: `billing` (cobra ou nao), `markets` (USD/BRL/ambos), `cloud` (`aws` | `none`) e `budgetUsd` (teto de custo de IA; 0 = sem limite). As fases monetize/architect/deploy respeitam isso, e `log-usage.mjs` avisa ao passar do orcamento (confirme na constitution).
8. Confirme o que foi criado e diga: "Estrutura pronta. Proximo: Fase 0 — rode `sdd-opportuni