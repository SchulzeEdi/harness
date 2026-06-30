# LOAD-NNN — <fluxo testado>

- **Data:** <ISO>
- **Ambiente:** staging (AWS) | local (so smoke)
- **Commit/sha:** <sha>
- **Ferramenta:** k6
- **Fluxos cobertos:** <ex.: login, checkout, listagem>

## Metas (SLO) definidas antes
| Metrica | Meta |
|---------|------|
| p95 | < 300 ms |
| Vazao | >= 200 RPS |
| Erro | < 1% |

## Resultados por nivel de carga
| Carga | RPS | p50 | p95 | p99 | Erro % | Recurso que satura |
|-------|-----|-----|-----|-----|--------|--------------------|
| nominal | | | | | | |
| 2x | | | | | | |
| 5x | | | | | | |
| 10x | | | | | | |

## Ponto de quebra
- **Quebrou em:** <RPS / nivel>
- **Causa raiz:** <conexoes de banco / CPU / memoria / ...>
- **Bate com a arquitetura?** <candidato previsto em architecture.md? sim/nao>

## Conclusao
- Metas batidas? <sim/nao, por metrica>
- Acao antes de 10x: <pooling / cache / fila / scale-out / ...>
- Debitos/bugs gerados: <DT-NN / BUG-NNN>
