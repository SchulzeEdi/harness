# LOAD-001 — health + listagem de cobrancas

- **Data:** 2026-06-19 · **Ambiente:** staging (AWS) · **Commit:** a1b2c3d · **Ferramenta:** k6

## Metas
| Metrica | Meta |
|---------|------|
| p95 | < 300 ms |
| Vazao | >= 200 RPS |
| Erro | < 1% |

## Resultados por nivel
| Carga | RPS | p50 | p95 | p99 | Erro % | Satura |
|-------|-----|-----|-----|-----|--------|--------|
| nominal | 200 | 80ms | 180ms | 240ms | 0.1% | - |
| 2x | 400 | 95ms | 210ms | 300ms | 0.3% | conexoes DB |
| 5x | 1000 | 180ms | 460ms | 900ms | 2.1% | conexoes DB |

## Ponto de quebra
- **Quebrou em:** ~900 RPS · **Causa:** esgotamento de conexoes do Postgres (sem pool).
- **Bate com a arquitetura?** sim — previsto como candidato #1 (DT-01).

## Conclusao
- Metas batidas na carga nominal e 2x. Antes de 10x: RDS Proxy/pooling (DT-01).
