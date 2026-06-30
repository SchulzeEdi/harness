---
name: sdd-experiment
description: Skill de experimento controlado do harness SDD. Conduz e registra a comparacao vibe coding x SDD na mesma feature, medindo iteracoes, tokens, tempo, custo e qualidade do codigo. Produz spec/experiments/EXP-NNN-*.md. USE SEMPRE QUE o usuario falar em comparar, comparacao, vibe coding versus/x SDD, "qual metodo e melhor", benchmark de metodo, experimento, A/B de desenvolvimento, ou evidencia/dado para o TCC sobre qual abordagem rende mais. Dispare mesmo que o usuario nao diga "experimento" explicitamente, desde que a intencao seja comparar as duas formas de desenvolver. Para apenas registrar custo/tempo de uma interacao isolada, use sdd-measure.
---

# Experimento — vibe coding x SDD (mesma feature)

Objetivo: gerar evidencia comparativa para o TCC. Desenho justo descrito em `${CLAUDE_PLUGIN_ROOT}/reference/measurement-playbook.md`.

## Como conduzir
1. Garanta a pasta `spec/experiments/`. Crie `spec/experiments/EXP-NNN-<slug>.md` (NNN sequencial) a partir de `${CLAUDE_PLUGIN_ROOT}/templates/experiment.template.md`.
2. **Desenhe o experimento** (preencha a secao 1): escolha UMA feature de complexidade media, com **enunciado unico**, **mesma stack/modelo**, **mesmo criterio de pronto** e **mesmos testes** nos dois bracos. Defina e registre a **ordem** (A->B ou B->A) para controlar aprendizado.
3. **Braco A — vibe coding:** implemente direto ("implemente X"), sem spec/plan/tasks, iteracao livre. Registre cada interacao no logbook com `metodo = vibe` (use `sdd-measure`).
4. **Braco B — SDD:** rode a cadeia do harness (PRD -> design -> tasks -> sprint -> implement -> review). Registre cada interacao com `metodo = SDD`.
5. **Colete as metricas** dos dois bracos a partir do logbook e preencha a tabela de resultados (iteracoes, tempo, tokens, custo, testes, cobertura, bugs, retrabalho, aderencia ao design system).
6. **Analise**: vencedor por metrica, leitura geral e **ameacas a validade** (aprendizado, variabilidade do modelo, vies do autor, amostra).

## GATE
- [ ] Bracos com a MESMA feature, criterio de pronto e testes.
- [ ] Interacoes dos dois bracos no logbook (com `metodo`).
- [ ] Tabela de resultados preenchida + ameacas a validade declaradas.

## Ao concluir (doc gate)
- Registre o experimento na secao *Experimentos* do `spec/STATUS.md` (ID, feature, vencedor, link).
- Atualize o agregado do logbook (via `sdd-measure`).
- Diga o resultado e o que ele sugere para a pesquisa.
