---
name: sdd-measure
description: Skill de medicao (diario de bordo) do harness SDD. Registra cada interacao com o agente em spec/logbook/ com modelo, tokens de entrada/saida, custo em USD, tempo e iteracoes, e atualiza o agregado no STATUS. USE SEMPRE QUE o usuario falar em custo, "quanto gastei/gastou", tokens, consumo, "quanto demorou", tempo, metricas, diario de bordo, logbook, registrar/medir interacao, ou dados para o TCC/pesquisa. Dispare tambem PROATIVAMENTE ao concluir uma fase, task ou sprint para registrar o consumo, mesmo que o usuario nao peca explicitamente. Nao confundir com sdd-experiment (que compara vibe coding x SDD).
---

# Medicao — diario de bordo (tokens, custo USD, tempo)

Objetivo: deixar rastro empirico do desenvolvimento conduzido por IA, para sustentar o TCC. Detalhe em `${CLAUDE_PLUGIN_ROOT}/reference/measurement-playbook.md`.

## Quando registrar
- Ao concluir uma **fase**, **task** ou **sprint** (proativo).
- Sempre que o usuario perguntar/mencionar custo, tokens, tempo ou consumo.
- Em cada interacao relevante de um **experimento** (marcando o `metodo`).

## Como conduzir
1. Garanta a pasta `spec/logbook/`. Use o arquivo do mes `LOG-AAAAMM.md` a partir de `${CLAUDE_PLUGIN_ROOT}/templates/logbook.template.md` (crie se nao existir).
2. Capture os numeros da interacao (ver playbook): `data/hora`, `fase/task`, `metodo` (SDD|vibe), `modelo`, `tokens_in`, `tokens_out`, `custo_usd`, `tempo_min`, `iteracoes`, `resultado`, `observacoes`.
   - Tokens/custo no Claude Code: comando `/cost` (registre o delta antes/depois) ou o campo `usage` da API.
   - Se algum numero nao estiver disponivel, registre o que houver e marque o que falta — nunca pule a linha.
3. Registre com o script (escreve o CSV **e** atualiza o agregado no `state.json`):
   `node ${CLAUDE_PLUGIN_ROOT}/scripts/log-usage.mjs --phase <fase/task> --method <SDD|vibe> --model <modelo> --in <tokens> --out <tokens> --cost <usd> --time <min> --iter <n> --note "<obs>"`
   Sem o script, edite `spec/logbook/LOG-AAAAMM.md` na mao a partir do template.
4. Atualize o resumo do STATUS: `node ${CLAUDE_PLUGIN_ROOT}/scripts/render-status.mjs`.
> Guardrail: se `profile.budgetUsd > 0`, o `log-usage.mjs` avisa em 80% e ao estourar o teto de custo de IA.

## GATE
- [ ] Linha registrada com modelo, tokens (ou o que estava disponivel), custo e tempo.
- [ ] Agregado do `state.json` atualizado (o script faz) e STATUS regenerado (`render-status.mjs`).

## Ao concluir (doc gate)
- Confirme STATUS atualizado (ver `${CLAUD