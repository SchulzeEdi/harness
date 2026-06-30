# Reference — Measurement playbook (diario de bordo + comparacao)

Usado pelas skills `sdd-measure` (Fase de medicao) e `sdd-experiment`. Objetivo: dar base empirica ao TCC — registrar **modelo, tokens, custo em USD e tempo** por interacao, e comparar **vibe coding x SDD** de forma justa.

## Por que medir

A pergunta de pesquisa exige numeros: quanto custa (tokens/USD), quanto demora (tempo/iteracoes) e com que qualidade o software e produzido por agente. Sem registro no momento da interacao, o dado se perde. O logbook e a evidencia.

## O que capturar por interacao

| Campo | De onde vem | Observacao |
|-------|-------------|-----------|
| data/hora | relogio | ISO |
| fase/task | harness | ex.: `architect`, `T-07` |
| metodo | voce | `SDD` ou `vibe` |
| modelo | Claude Code | ex.: claude-opus-4 / sonnet |
| tokens_in | Claude Code | tokens de entrada (prompt+contexto) |
| tokens_out | Claude Code | tokens de saida |
| custo_usd | Claude Code | custo da interacao |
| tempo_min | cronometro | do envio ate a resposta util |
| iteracoes | voce | quantos turnos ate ficar pronto |
| resultado | voce | aceito / refeito / descartado |
| observacoes | voce | bloqueios, retrabalho, etc. |

### Como obter tokens e custo no Claude Code
- Comando `/cost` mostra o custo e os tokens acumulados da sessao.
- `/status` e o rodape da sessao mostram uso de contexto e modelo atual.
- Para custo **por interacao**, registre o acumulado antes e depois e tire a diferenca (ou use o delta que a CLI mostra apos cada resposta).
- Se usar a API/SDK, os tokens vem no campo `usage` (`input_tokens`, `output_tokens`) de cada resposta.

### Automatizar o registro
- Use `${CLAUDE_PLUGIN_ROOT}/scripts/log-usage.mjs` para gravar a linha do logbook e somar o agregado no `state.json` de uma vez (ver `automation.md`). Reduz erro de digitacao.
- Para coleta sem trabalho manual, o Claude Code pode exportar metricas via **OpenTelemetry** (habilite a telemetria e aponte um coletor OTLP): tokens e custo viram metricas agregadas por sessao — mais reproduzivel para a banca do que copiar `/cost` a mao. Confirme os nomes exatos das variaveis na doc vigente do Claude Code.
- Declare no TCC o metodo de coleta usado (manual via `/cost`, script, ou OTel) como parte da metodologia.

### Guardrail de custo
Defina `profile.budgetUsd` no `state.json` (teto de custo de IA do projeto/sprint). A cada registro, `log-usage.mjs` compara o acumulado com o teto e **avisa em 80% e ao estourar** — util para nao descobrir o custo so no fim e para discutir viabilidade economica no TCC.

> Os numeros exatos de preco por modelo mudam; confirme a tabela vigente em docs.claude.com antes de fechar os custos do TCC. O playbook registra o dado bruto (tokens) **e** o custo informado pela ferramenta, para nao depender de uma tabela fixa.

## Como comparar vibe coding x SDD (experimento justo)

Para a comparacao valer no TCC, controle as variaveis:

1. **Mesma feature, mesmo enunciado inicial.** Escolha uma funcionalidade de complexidade media e descreva-a uma unica vez.
2. **Mesma stack e mesmo modelo** nos dois bracos (so muda o **metodo**).
3. **Vibe coding (braco A):** prompt direto "implemente X", sem spec/plan/tasks; iteracoes livres ate funcionar.
4. **SDD (braco B):** passa pela cadeia do harness (PRD->design->tasks->sprint->implement->review).
5. **Mesmo criterio de "pronto"** nos dois: mesma lista de criterios de aceite e mesmos testes.
6. **Ordem e fadiga:** se possivel, alterne a ordem entre features para nao favorecer um metodo; registre a ordem.
7. **Registre tudo no logbook**, marcando o campo `metodo`.

### Metricas da comparacao
- **Esforco:** iteracoes, tempo total, tokens (in/out), custo USD.
- **Qualidade:** testes passando, cobertura, bugs encontrados depois, nº de retrabalhos, lint/tsc limpos, aderencia ao design system.
- **Manutenibilidade (qualitativa):** clareza, modularidade, presenca de ADRs/decisoes documentadas.

### Ameacas a validade (cite no TCC)
- Aprendizado entre bracos (a 2a vez tende a ser mais rapida) — mitigue alternando ordem.
- Variabilidade do modelo (mesma prompt, respostas diferentes) — rode mais de uma vez se der.
- Vies do autor (voce sabe qual metodo "deveria" ganhar) — use criterios de aceite objetivos.
- 