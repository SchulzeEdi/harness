---
description: Roda teste de carga/desempenho (k6) com metas e registra latencia, vazao, erro e ponto de quebra
---

Invoque a skill `sdd-loadtest` para validar a escala:

1. Defina as metas (SLO) ANTES: p95, RPS, erro%.
2. Rode k6 em rampa (nominal -> 2x -> 5x -> 10x) contra staging.
3. Registre latencia/vazao/erro por nivel e o ponto de quebra (cruze com a arquitetura).
4. Crie `spec/loadtests/LOAD-NNN-*.md` e atualize STATUS + state.json.

Argumentos opcionais (fluxo alvo, RPS base): $ARGUMENTS
