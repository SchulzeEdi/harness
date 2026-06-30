# Reference — Git workflow (branch por feature/fix)

Politica usada por `sdd-implement`, `sdd-sprint` e `sdd-bug`. Registrada na constitution.

## Regra central
- A `main` e sempre estavel e deployavel. **Nunca se commita direto na `main`.**
- Toda unidade de trabalho roda em sua **propria branch curta**, criada a partir da `main` atualizada.

## Nomenclatura de branches
- `feature/<slug>` — nova funcionalidade (uma task ou fatia).
- `fix/<slug>` — correcao de bug.
- `chore/<slug>` — manutencao, infra, refactor sem mudanca de comportamento.

## Ciclo (por task)
```
git switch main && git pull
git switch -c feature/<slug>
# ... implementa Banco -> Backend -> Frontend ...
# ... roda os quality gates LOCAIS (tsc, lint, testes, build) ...
git add -A && git commit -m "feat: <descricao>"
git push -u origin feature/<slug>
# abre PR -> revisao -> merge na main -> apaga a branch
git switch main && git pull
git branch -d feature/<slug>
```

## Convencao de commits (sugerida)
`feat:`, `fix:`, `chore:`, `refactor:`, `test:`, `docs:` — mensagens curtas e imperativas.

## CI (gates no PR)
Todo PR para a `main` roda os gates no GitHub Actions (`.github/workflows/ci.yml`, scaffold em `reference/scaffolds/ci/`): typecheck, lint, test, build, `npm audit` e, se vendados, `validate-state`/`check-docs`. PR vermelho nao mergeia — o mesmo criterio do hook local, agora tambem no servidor.

#