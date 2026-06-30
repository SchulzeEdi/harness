# Changelog — sdd-harness

Formato: [Keep a Changelog](https://keepachangelog.com). Versionamento semantico.

## [0.5.1] — 2026-06-30
### Corrigido
- Erro "Duplicate hooks file detected" ao carregar o plugin: removido o campo `hooks` do `plugin.json`. O `hooks/hooks.json` ja e carregado automaticamente por convencao; o campo do manifesto so deve referenciar arquivos de hook adicionais.

## [0.5.0] — 2026-06-30
### Adicionado
- **Subagentes especializados** (`agents/`): `sdd-bug-fixer`, `sdd-implementer`, `sdd-reviewer`, `sdd-security-auditor`, `sdd-doc-auditor`, `sdd-scale-analyst` — contexto isolado, ferramentas escopadas, auto-delegacao pela descricao. Skills delegam a eles (sdd-bug -> bug-fixer, sdd-review -> reviewer, etc.).
- **CI no GitHub Actions**: scaffold `ci/github-actions.yml` rodando gates + npm audit no PR; `sdd-init` cria o workflow e venda os scripts; nota em `git-workflow.md`.
- **Seguranca no gate**: `scripts/security-scan.sh` (scan de segredos + npm audit), integrado ao `check-gates.sh` e ao agente security-auditor.
- **Rastreabilidade BDD**: `reference/bdd-traceability.md` + scaffold `test/acceptance.spec.ts`; criterio de aceite `CA-N` mapeia para teste; gate no review.
- **Observabilidade -> incidente**: `reference/observability-playbook.md` + `templates/incident.template.md`; alerta de prod vira BUG rastreavel.
- **Guardrail de custo**: `profile.budgetUsd`; `log-usage.mjs` avisa em 80% e ao estourar o teto.

### Mudado
- `check-gates.sh` agora roda tambem o scan de seguranca.
- Exemplo `cobrafacil` atualizado (CA-N, CI, budget).

## [0.4.0] — 2026-06-30
### Adicionado
- **sdd-loadtest**: teste de carga/desempenho (k6) com metas (p95/RPS/erro) e ponto de quebra — sustenta a validacao de escala. Template `loadtest`, `reference/performance-playbook.md`, scaffold `loadtest/k6-load.js`.
- **Gates executaveis**: `scripts/check-gates.sh`, `validate-state.mjs`, `check-docs.mjs`, `render-status.mjs`, `log-usage.mjs`; hook `pre-push-gate` que **bloqueia `git push` com gate vermelho** (`hooks/