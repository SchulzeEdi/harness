# DEPLOY-NNN — <slug>

- **Data:** <ISO>
- **Ambiente:** staging | producao
- **Commit/sha:** <sha na main>
- **Origem:** SPRINT-NNN / PRD-V1-NN
- **IaC:** CDK | SST (mesma dos outros ambientes)

## O que subiu
- Features/tasks: T-.., T-..
- Migrations aplicadas: <sim/nao — quais>

## Gates antes da promocao
- [ ] Local verde (tsc, lint, testes, build)
- [ ] IaC sintetiza sem erro
- [ ] (producao) staging validado com e2e dos fluxos de receita

## Resultado
- Status: ok | rollback
- Observacoes: ...

## Plano de rollback
- Como reverter: <redeploy do sha anterior / migration down / etc.>
