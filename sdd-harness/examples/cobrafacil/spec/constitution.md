# Constitution — cobrafacil

Regras inegociaveis:
- TypeScript strict sempre.
- Toda feature nasce com teste de dominio; cobertura alvo 80%.
- Nenhuma decisao de arquitetura sem ADR.
- Nada sobe pra AWS sem o local verde (gate executavel: check-gates.sh; push protegido por hook).
- Toda UI consulta o design system (design-system.md + design-tokens.json).
- Secrets nunca no codigo.
- Cobranca em USD e BRL desde o MVP (profile.billing=true, markets=USD,BRL).
- Ordem de build por fatia: Banco -> Backend -> Frontend.
- Git: uma branch por feature/fix; PR -> merge na main; nunca commit direto na main.
- Documentacao como gate: state.json e a verdade da maquina; STATUS gerado por render-status; toda skill atualiza ao concluir.

## Profile do projeto
billing=true · cloud=aws · markets=[USD, BRL].
