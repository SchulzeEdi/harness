---
name: sdd-deploy
description: Skill de deploy do harness SDD. Promove a aplicacao local -> staging -> producao na AWS usando a MESMA IaC (CDK/SST), so trocando parametros, com gates antes de cada promocao, e registra cada deploy em spec/deploys/. USE SEMPRE QUE o usuario falar em deploy, "subir", "publicar", "colocar no ar", "lancar", promover, staging, homologacao, producao, prod, "mandar pra AWS", release ou rollback. Dispare tambem ao fim de uma sprint, quando a main esta verde e o passo natural e promover. Garante a regra da constitution: nada sobe pra AWS sem o local verde. Para implementar/mergear uma task use sdd-implement; esta skill cuida da promocao entre ambientes.
---

# Deploy — promover local -> staging -> producao (AWS)

Regra de ouro (constitution): **nada sobe pra AWS sem passar verde no ambiente local.** Mesma IaC nos tres ambientes — ver `${CLAUDE_PLUGIN_ROOT}/reference/environments.md`.

## Profile
Respeite `profile.cloud` do `state.json`. Se `aws`, siga abaixo. Se `none`, promova para o alvo definido na arquitetura (ex.: Vercel/VPS) — a regra "local verde antes de promover" e a separacao staging/producao permanecem.

## Pre-condicoes
- `main` atualizada e com os quality gates verdes — confirme com `bash ${CLAUDE_PLUGIN_ROOT}/scripts/check-gates.sh` (ver `${CLAUDE_PLUGIN_ROOT}/reference/automation.md`).
- IaC em `infra/` sintetiza sem erro (`cdk synth` / `sst` build).

## Como conduzir
1. Confirme o estado da `main` e os gates locais (build, testes, tsc, lint).
2. **Staging (AWS):** faca o deploy pela IaC trocando so os parametros de ambiente (tamanho/dominio). Rode os e2e dos fluxos de receita contra a infra real.
3. **Producao (AWS):** so apos staging validado, promova com a MESMA IaC, recursos dimensionados.
4. Crie `spec/deploys/DEPLOY-NNN-<slug>.md` a partir de `${CLAUDE_PLUGIN_ROOT}/templates/deploy.template.md`: ambiente, commit/sha, o que foi (features/sprint), resultado, plano de rollback.
5. Se algo falhar, **rollback** e registre o motivo no mesmo DEPLOY-NNN.

## GATE
- [ ] Local verde antes de qualquer promocao.
- [ ] Staging validado (e2e dos fluxos de receita) antes de producao.
- [ ] Mesma IaC nos dois ambientes (so parametros diferentes).
- [ ] Registro DEPLOY-NNN criado, com plano de rollback.

## Ao concluir (doc gate)
- Atualize a secao *Deploys* do `spec/STATUS.md` (ultimo staging/prod) e o array `deploys` em `spec/state.json`.
- Diga o que subiu, para qual ambiente e o resultado.
