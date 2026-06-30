# STATUS — <NOME DO PROJETO>

> **Fonte da verdade** do estado atual, do comeco ao fim do projeto.
> Toda skill atualiza este arquivo ao concluir (ver `reference/documentation-standards.md`).
> Fase atual: <fase> · Ultima atualizacao: <data ISO>

<!-- AUTO:START — gerado por scripts/render-status.mjs (state.json e a verdade da maquina); nao editar a mao -->
<!-- AUTO:END -->

## Resumo executivo
- **Fase atual:** <opportunity|constitution|prd|design|architect|monetize|tasks|loop de entrega>
- **Proximo passo:** <skill recomendada / proxima task>
- **Saude da doc:** <ok | drift detectado — rodar sdd-docs>

## PRDs
| PRD | Titulo | Status |
|-----|--------|--------|
| PRD-V1-01 | ... | rascunho / aprovado / em entrega / fechado |

## Sprint atual
- **SPRINT-NNN** (<slug>) — objetivo: ...
- Tasks: <T-NN doing>, <T-NN todo> ...
- Criterio de "sprint pronta": ...

## Historico de sprints
| Sprint | Retro | Resultado | Debitos gerados |
|--------|-------|-----------|-----------------|
| SPRINT-001 | RETRO-001 | ... | DT-.. |

## Indice de decisoes (ADRs + D-N)
> Toda decisao de arquitetura vira ADR e aparece aqui. Decisoes de produto (D-N) do PRD entram quando relevantes.

| ID | Decisao | Origem | Status |
|----|---------|--------|--------|
| ADR-0001 | <titulo> | architect | aceito / superseded por ADR-NNNN |
| D-1 | <decisao do PRD> | PRD-V1-01 | vigente |

## Bugs
**Em aberto:**
- BUG-NNN: <descricao> (origem: SPRINT-NNN / T-NN · severidade)

**Resolvidos:**
- BUG-NNN: <descricao> (corrigido em SPRINT-NNN · fix/<slug>)

## Debitos tecnicos
| ID | Descricao | Origem | Prioridade |
|----|-----------|--------|-----------|
| DT-NN | ... | SPRINT-NNN | alta / media / baixa |

## Deploys
| Deploy | Data | Ambiente | Commit | Resultado |
|--------|------|----------|--------|-----------|
| DEPLOY-001 | <ISO> | staging / producao | <sha> | ok / rollback |

## Load tests
| Teste | Data | Ambiente | p95 | RPS | Erro % | Metas batidas |
|-------|------|----------|-----|-----|--------|---------------|
| LOAD-001 | <ISO> | staging | | | | sim / nao |

## Emendas (change requests)
| ID | Artefato alterado | Motivo | Impacto |
|----|-------------------|--------|---------|
| CHG-001 | PRD-V1-01 / D-3 | ... | tasks reabertas |

## Logbook (resumo acumulado)
> Detalhe por interacao em `spec/logbook/`. Aqui so o agregado, para o TCC.

| Metrica | Acumulado |
|---------|-----------|
| Interacoes registradas | 0 |
| Tokens de entrada | 0 |
| Tokens de saida | 0 |
| Custo (USD) | 0.00 |
| Tempo total | 0h00 |

## Experimentos (vibe coding x SDD)
| ID | Feature | Vencedor | Link |
|----|---------|----------|------|
| EXP-001 | ... | vibe / SDD / empate | spec/experiments/EXP-001-*.md |
