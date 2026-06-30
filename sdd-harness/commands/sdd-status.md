---
description: Le spec/STATUS.md e mostra o estado atual do projeto, a saude da documentacao e o proximo passo
---

Leia `spec/STATUS.md` (fonte da verdade) e, se util, `spec/state.json`. Apresente de forma clara:

1. Fase atual e resumo executivo.
2. PRDs ativos e seus status.
3. Sprint atual (tasks em andamento) e historico de sprints/retros.
4. Indice de decisoes (ADRs + D-N), bugs em aberto e debitos tecnicos.
5. Ultimos deploys (staging/producao) e resumo do logbook (tokens/custo/tempo).
6. **Saude da documentacao**: se houver indicio de drift, sugira rodar `/sdd-docs`.
7. O proximo passo recomendado (proxima fase da cadeia ou proxima task da sprint).

Cadeia: opportunity -> constitution -> prd -> design -> architect -> monetize -> tasks -> (loop de entrega: sprint -> implement -> review -> deploy; bug e retro quando necessario; measure/experiment para o TCC).

Se `spec/STATUS.md` nao existir, avise que o projeto nao foi inicializado e sugira `/sdd-new`.
