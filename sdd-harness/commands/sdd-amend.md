---
description: Registra e conduz a mudanca de um artefato ja aprovado (PRD/design/arquitetura/ADR) sem edicao silenciosa
---

Invoque a skill `sdd-amend` para alterar um artefato aprovado ou mudar escopo no meio da sprint:

1. Crie `spec/changes/CHG-NNN-*.md` (o que muda, por que, tipo: emenda ou supersede).
2. Avalie e propague o impacto (tasks reabertas, sprints/fases afetadas, ADR superseded).
3. Atualize os artefatos + `state.json` (gates reabertos) + STATUS (`render-status`).

Argumentos opcionais (artefato alvo, motivo): $ARGUMENTS
