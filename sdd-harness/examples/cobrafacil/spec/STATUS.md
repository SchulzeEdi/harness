# STATUS — cobrafacil

> Fonte da verdade. Fase atual: loop de entrega · Ultima atualizacao: 2026-06-20

<!-- AUTO:START — gerado por scripts/render-status.mjs; nao editar a mao -->
**Fase atual:** loop · **Proximo:** rode sdd-sprint / sdd-implement
**Profile:** billing=true · cloud=aws · markets=USD/BRL

| Indicador | Valor |
|-----------|-------|
| PRDs | 1 |
| Sprints | 1 |
| Bugs em aberto | 0 |
| Deploys | 1 |
| Load tests | 1 |
| Emendas (CHG) | 0 |
| Logbook — interacoes | 7 |
| Logbook — custo USD | 1.92 |
| Logbook — tempo (min) | 96 |
<!-- AUTO:END -->

## Resumo executivo
- Fase atual: loop de entrega (M0 entregue).
- Proximo passo: SPRINT-002 (feature de receita — checkout).

## PRDs
| PRD | Titulo | Status |
|-----|--------|--------|
| PRD-V1-01 | MVP cobranca + lembrete | em entrega |

## Historico de sprints
| Sprint | Retro | Resultado | Debitos |
|--------|-------|-----------|---------|
| SPRINT-001 | RETRO-001 | walking skeleton no ar (staging) | DT-01 |

## Indice de decisoes (ADRs + D-N)
| ID | Decisao | Origem | Status |
|----|---------|--------|--------|
| ADR-0001 | ORM: Drizzle | architect | aceito |
| D-1 | Lembrete por e-mail no MVP (WhatsApp fica p/ V2) | PRD-V1-01 | vigente |
| D-2 | Pix obrigatorio no BRL | PRD-V1-01 | vigente |

## Bugs
**Em aberto:** nenhum.

## Debitos tecnicos
| ID | Descricao | Origem | Prioridade |
|----|-----------|--------|-----------|
| DT-01 | Sem pooling de conexao (RDS Proxy) ainda | SPRINT-001 | media |

## Deploys
| Deploy | Data | Ambiente | Commit | Resultado |
|--------|------|----------|--------|-----------|
| DEPLOY-001 | 2026-06-18 | staging | a1b2c3d | ok |

## Load tests
| Teste | Data | Ambiente | p95 | RPS | Erro % | Metas batidas |
|-------|------|----------|-----|-----|--------|---------------|
| LOAD-001 | 2026-06-19 | staging | 210ms | 260 | 0.3% | sim |

## Logbook (resumo acumulado)
| Metrica | Acumulado |
|---------|-----------|
| Interacoes | 7 |
| Custo (USD) | 1.92 |
| Tempo | 96 min |
