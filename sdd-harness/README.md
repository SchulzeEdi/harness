# SDD Harness (v0.5)

Harness de engenharia **Spec-Driven Development** para micro-SaaS. Leva uma ideia da validacao ate o deploy, com **entrega continua** (sprints, review, deploy, retros, bugs), **subagentes especializados** que o agente principal despacha, **gates executaveis** (scripts + hook que bloqueia push vermelho + CI), **documentacao como gate** sem drift (STATUS gerado de um `state.json` unico), **teste de carga** para validar escala e **medicao** (tokens/custo/tempo com guardrail de orcamento + comparacao vibe coding x SDD).

## Cadeia de definicao (uma vez por PRD)

```
0 opportunity  -> vale a pena? quem paga? quanto? (USD/BRL)
1 constitution -> regras de engenharia inegociaveis (Git + doc gate)
2 prd          -> Product Requirements Document via Discovery Interview (lotes de 4-5 perguntas)
3 design       -> design system unico e vivo
4 architect    -> arquitetura + ADRs + infra AWS
5 monetize     -> billing USD + BRL
6 tasks        -> quebra do PRD em tasks executaveis (com metadados)
```

## Loop de entrega (repete ate o PRD fechar)

```
SPRINT -> IMPLEMENT -> REVIEW -> DONE -> COMMIT+PUSH -> DEPLOY
```

- Cada **feature/fix** roda em sua **propria branch** (`feature/...`, `fix/...`), nunca direto na `main`.
- `implement` -> `review` (gate de qualidade) -> commit + push -> PR -> merge na `main` -> branch removida.
- `deploy` promove local -> staging -> producao pela mesma IaC. Nada sobe pra AWS sem o local verde.
- Ao fechar uma **sprint**: gera **RETRO**, roda **sdd-docs** (auditoria) e atualiza o **STATUS**.
- A qualquer momento: **measure** registra tokens/custo/tempo; **bug** rastreia defeitos; **experiment** compara metodos; **loadtest** valida escala; **amend** registra mudanca de artefato aprovado.

## Documentacao como gate (anti-drift)

O problema classico — comeca documentando bem e se perde — e tratado de frente: **toda skill, ao concluir, atualiza o `state.json`** e o `STATUS.md` e regenerado a partir dele (`render-status.mjs`), sem divergir. Nada fecha sem doc gate. A skill `sdd-docs` (e `check-docs.mjs`) audita drift ao fim de cada sprint. Regras em `reference/documentation-standards.md`.

## Gates executaveis (scripts + hook)

Os gates nao sao so checklist: viram script que falha e hook que bloqueia. `scripts/`: `check-gates.sh` (tsc/lint/test/build + **security**), `security-scan.sh` (segredos + npm audit), `validate-state.mjs`, `check-docs.mjs`, `render-status.mjs`, `log-usage.mjs`. O hook `pre-push-gate` **impede `git push` com gate vermelho** e o **CI** (GitHub Actions, `scaffolds/ci/`) repete os gates no PR — "nada sobe sem o local verde" deixa de depender de disciplina. Ver `reference/automation.md`.

## Artefatos (tudo em `spec/`)

```
spec/
├── STATUS.md            # view humano; bloco AUTO gerado por render-status.mjs (nao editar a mao)
├── state.json           # VERDADE DA MAQUINA (fases, gates, profile, sprints, prds, bugs, deploys, loadtests, changes, logbook, experiments)
├── opportunity.md       # Fase 0
├── constitution.md      # Fase 1 (Git + doc gate)
├── prds/                # PRD-V1-NN.md  (Fase 2)
├── design-system.md     # Fase 3
├── design-tokens.json
├── architecture.md      # Fase 4
├── adr/                 # Architecture Decision Records
├── monetization.md      # Fase 5
├── tasks/               # TASKS-PRD-V1-NN.md  (Fase 6)
├── sprints/             # SPRINT-NNN-*.md e RETRO-NNN-*.md
├── bugs/                # BUG-NNN-*.md
├── deploys/             # DEPLOY-NNN-*.md
├── loadtests/           # LOAD-NNN-*.md (carga/desempenho — k6)
├── changes/             # CHG-NNN-*.md (emendas a artefatos aprovados)
├── incidents/           # INC-NNN-*.md (postmortems de producao)
├── logbook/             # LOG-AAAAMM.md (tokens/custo/tempo)
├── experiments/         # EXP-NNN-*.md (vibe coding x SDD)
└── mvp_scope/           # historico imutavel do MVP fechado — NAO editar
```

## Skills

Cadeia: `sdd-init`, `sdd-opportunity`, `sdd-constitution`, `sdd-prd`, `sdd-design`, `sdd-architect`, `sdd-monetize`, `sdd-tasks`.
Loop de entrega: `sdd-sprint`, `sdd-implement`, `sdd-review`, `sdd-deploy`, `sdd-loadtest`.
Transversais: `sdd-bug`, `sdd-amend` (gestao de mudanca), `sdd-docs` (auditoria de doc), `sdd-measure` (diario de bordo), `sdd-experiment` (vibe x SDD).

18 skills no total. Veja `examples/cobrafacil/` para um `spec/` completo de referencia (passa verde nos scripts).

> As skills tem descricoes com **gatilhos automaticos**: disparam pelo contexto (ex.: "ta quebrado" -> sdd-bug; "bora fazer deploy" -> sdd-deploy; "quanto custou" -> sdd-measure; "aguenta 10x?" -> sdd-loadtest; "mudou o requisito" -> sdd-amend) sem precisar chama-las pelo nome.

## Agentes (subagentes especializados)

Alem das skills (que rodam na conversa principal), o harness traz **6 subagentes** em `agents/` — cada um com contexto proprio e ferramentas escopadas. O agente principal os despacha automaticamente pela descricao, ou uma skill os invoca via Task:

- **sdd-bug-fixer** — corrige um bug ponta a ponta (reproduz -> teste que falha -> fix -> gates).
- **sdd-implementer** — implementa uma task isolada; paraleliza tasks independentes numa sprint.
- **sdd-reviewer** — revisa o diff antes do merge (so leitura + gates).
- **sdd-security-auditor** — segredos, CVE, OWASP, isolamento multi-tenant.
- **sdd-doc-auditor** — audita drift e reconcilia STATUS x state.json.
- **sdd-scale-analyst** — interpreta load test e propoe mitigacoes/ADRs.

## Referencias (em `reference/`)

`architecture-patterns.md`, `design-standards.md`, `engineering-standards.md`, `environments.md`, `git-workflow.md`, `monetization-playbook.md`, `documentation-standards.md`, `measurement-playbook.md`, `performance-playbook.md`, `automation.md`, `bdd-traceability.md`, `observability-playbook.md` e `scaffolds/` (docker-compose, storybook, schema Drizzle + RLS, route handler, PaymentProvider, validacao Zod, tailwind config, repo/teste multi-tenant, k6, CI, acceptance spec, ADR exemplo).

Alem das skills, o plugin traz `agents/` (6 subagentes), `scripts/` (gates executaveis + medicao), `hooks/` (bloqueio de push) e `examples/` (projeto de referencia).

## Instalar (Claude Code, inclusive no terminal do Cursor)

Pre-requisitos: Node.js + Claude Code (`npm install -g @anthropic-ai/claude-code`).

1. Descompacte este kit num lugar fixo (ex.: `~/sdd-kit-v2`). Estrutura: pasta-mae com `.claude-plugin/marketplace.json` + subpasta `sdd-harness/`.
2. No Claude Code, registre e instale apontando para a **pasta-mae**:
   ```
   /plugin marketplace add ~/sdd-kit-v2
   /plugin install sdd-harness@edi-harness
   ```
3. Reinicie a sessao.

**Fallback (se o /plugin falhar):** copie `skills/`, `commands/`, `templates/` e `reference/` (de dentro de `sdd-harness/`) para `~/.claude/`.

## U