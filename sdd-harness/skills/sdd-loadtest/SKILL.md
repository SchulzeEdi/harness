---
name: sdd-loadtest
description: Skill de teste de carga e desempenho do harness SDD. Valida a escalabilidade com metas numericas - latencia (p50/p95/p99), vazao (RPS/throughput) e taxa de erro sob niveis crescentes de carga - e acha o ponto de quebra ("o que quebra com 10x"). Produz spec/loadtests/LOAD-NNN-*.md usando k6. USE SEMPRE QUE o usuario falar em teste de carga, load test, performance, desempenho, escalabilidade, "aguenta quantos usuarios", "quantas requisicoes por segundo", latencia, p95, vazao, throughput, stress test, gargalo, "vai aguentar?", ou for validar se o sistema escala. Dispare antes de promover algo critico para producao e ao validar a tese de escalabilidade. Para arquitetura use sdd-architect; para testes de dominio use sdd-implement.
---

# Load test — validar escala (latencia, vazao, erro)

Objetivo: provar (com numero) que o sistema escala, ligando o resultado a secao "o que quebra com 10x?" da arquitetura. Metodo em `${CLAUDE_PLUGIN_ROOT}/reference/performance-playbook.md`.

## Como conduzir
1. Confirme um ambiente alvo estavel (staging na AWS de preferencia; nunca a maquina local para numeros finais).
2. Defina **metas** antes de rodar (SLO): ex.: `p95 < 300ms`, `>= 200 RPS`, `erro < 1%`.
3. Escreva/adapte o script k6 a partir de `${CLAUDE_PLUGIN_ROOT}/reference/scaffolds/loadtest/k6-load.js` cobrindo os **fluxos criticos** (incluindo o de receita/checkout).
4. Rode em **estagios crescentes** (smoke -> carga nominal -> 2x -> 10x) e registre, em cada nivel: latencia (p50/p95/p99), vazao (RPS), taxa de erro, e o recurso que satura primeiro (CPU, conexoes de banco, memoria).
5. Identifique o **ponto de quebra** e a causa raiz; cruze com os candidatos da arquitetura (pooling/RDS Proxy, filas para jobs longos, cache/rate-limit de IA).
6. Crie `spec/loadtests/LOAD-NNN-<slug>.md` a partir de `${CLAUDE_PLUGIN_ROOT}/templates/loadtest.template.md`.
7. **Delegue a interpretacao ao agente `sdd-scale-analyst`** (via Task): ele cruza o resultado com a arquitetura, aponta o gargalo e propoe mitigacoes/ADRs.

## GATE
- [ ] Metas (SLO) definidas ANTES do teste.
- [ ] Resultados por nivel de carga (latencia + vazao + erro).
- [ ] Ponto de quebra e causa raiz identificados.
- [ ] Recomendacao: passou? o que ajustar antes de 10x?

## Ao concluir (doc gate)
- Registre o teste na secao *Load tests* do `spec/STATUS.md` e no array `loadtests` de `spec/state.json`.
- Se 