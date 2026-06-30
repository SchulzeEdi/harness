---
name: sdd-implement
description: Fase de implementacao do harness SDD. Executa UMA task de uma sprint - cria a branch da feature/fix, implementa na ordem Banco -> Backend -> Frontend consultando o design system, roda os quality gates locais, passa por review e faz commit+push -> PR -> merge na main. USE SEMPRE QUE o usuario quiser implementar/codar/desenvolver uma task, disser "bora fazer essa task", "implementa", "codifica", "escreve o codigo", "mao na massa", ou ao executar uma task dentro de uma sprint. Dispare por task. Para revisar o que foi feito use sdd-review; para promover entre ambientes use sdd-deploy; para registrar custo/tempo use sdd-measure.
---

# Implementacao — uma task, do branch ao merge

Loop por task: **branch -> implementacao (DB->Back->Front) -> gates locais -> review -> DONE -> commit+push -> PR -> merge na main.**

## Passos
1. Leia `spec/constitution.md` (regras, inclusive politica de Git) e a task alvo no arquivo de tasks. Marque a task como `doing`.
2. **Crie a branch** a partir da `main` atualizada:
   - feature -> `feature/<slug>`; correcao -> `fix/<slug>`; manutencao -> `chore/<slug>`.
   - `git switch -c feature/<slug>` (nunca trabalhe direto na `main`).
3. **Implemente na ordem Banco -> Backend -> Frontend:**
   - Banco: schema/migrations, seeds.
   - Backend: dominio + endpoint, com testes (Vitest).
   - Frontend: UI **lendo `spec/design-system.md` + `spec/design-tokens.json`** (proibido criar UI sem consultar; use os tokens).
   - Use os scaffolds em `${CLAUDE_PLUGIN_ROOT}/reference/scaffolds/` (schema, route-handler, payment-provider, validation, tailwind.config, testes) quando aplicavel.

## Quality gates (rodar no AMBIENTE LOCAL antes de qualquer push)
> Atalho: `bash ${CLAUDE_PLUGIN_ROOT}/scripts/check-gates.sh` automatiza tsc/lint/test/build. O `git push` e protegido pelo hook `pre-push-gate` — gate vermelho bloqueia o push. Ver `${CLAUDE_PLUGIN_ROOT}/reference/automation.md`.
- [ ] `tsc --noEmit` limpo (strict).
- [ ] ESLint + Prettier limpos.
- [ ] Testes passam (dominio + e2e dos fluxos de receita).
- [ ] `next build` passa; IaC sintetiza sem erro.
- [ ] UI usa tokens do design system; estados erro/vazio/carregando existem; contraste ok.
- [ ] Sem secrets no codigo; inputs validados (Zod); deps sem CVE critico.
- [ ] Erros no Sentry, eventos no PostHog.
- [ ] Decisao arquitetural nova => ADR em `spec/adr/` (e indexado no STATUS).

## Review -> DONE -> commit + push -> merge
1. Com os gates verdes, rode `sdd-review` no diff (constitution + engineering-standards + design system). Resolva os bloqueantes.
2. Marque a task como `done`. Commit claro (`feat: <task>` / `fix: <task>`), `git push -u origin <branch>`.
3. Abra um PR para a `main`; ao aprovar, faca o merge e apague a branch. Ver `${CLAUDE_PLUGIN_ROOT}/reference/git-workflow.md`.
4. Promova via `sdd-deploy`: local verde -> staging (AWS) -> producao (AWS). Nada vai pra AWS sem o local verde.

## Ao concluir (doc gate)
- Atualize o estado da task e o `spec/STATUS.md` (e, se houve bug/debito, registre). Ver `${CLAUDE_PLUGIN_ROOT}/reference/documentation-standards.md`.
- Registre a interacao no logbook via `sdd-measure` (tokens/custo/tempo).
