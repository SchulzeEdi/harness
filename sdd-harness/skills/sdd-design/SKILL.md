---
name: sdd-design
description: Fase 3 do harness SDD. Define UX/UI ate ficar redondo, bonito e unico - paleta, tipografia, cada botao, estados, tom. Produz spec/design-system.md (playbook) e design-tokens.json (tokens), a fonte de verdade da UI. USE SEMPRE QUE o usuario falar em design, visual, "como vai ficar", interface, telas, UX/UI, identidade, paleta de cores, tipografia, componentes, design system, ou apos o PRD. Dispare antes de qualquer UI ser implementada; nada de UI generica de template.
---

# Fase 3 — Design (UX/UI + design system)

Objetivo: criar um design system unico e vivo que vira a fonte de verdade de toda a UI. Nada de UI generica de template.

## Como conduzir
1. Confirme `prd.gatePassed = true`.
2. Leia `spec/prds/PRD-V1-01.md` (para saber quais telas/fluxos existem) e `${CLAUDE_PLUGIN_ROOT}/reference/design-standards.md` do plugin.
3. Use `${CLAUDE_PLUGIN_ROOT}/templates/design-system.template.md` e `${CLAUDE_PLUGIN_ROOT}/templates/design-tokens.template.json`.
4. Conduza uma escolha **deliberada de identidade** (e registre o porque de cada uma):
   - **Personalidade/tom**: minimalista-confiavel? ousado-vibrante? tecnico-preciso?
   - **Paleta**: primaria com personalidade + neutros + estados (sucesso/erro/aviso). Justifique.
   - **Tipografia**: escolha intencional de fontes + escala tipografica.
   - **Grid/espacamento**, raios, sombras.
   - **Componentes**: botoes (primario/secundario/destrutivo/ghost), inputs, modais, tabelas, navegacao, cards.
   - **Estados obrigatorios**: hover, foco, desabilitado, erro, vazio, carregando.
   - **Micro-interacoes** e **acessibilidade** (contraste AA, foco visivel, navegacao por teclado).
5. **Renderize previews visuais** (HTML/React) das telas e componentes principais para o usuario aprovar ANTES de fixar os tokens.
6. Escreva `spec/design-system.md` (playbook humano) e `spec/design-tokens.json` (tokens maquina). Os tokens devem ser suficientes para gerar o `tailwind.config` (ver scaffold em `${CLAUDE_PLUGIN_ROOT}/reference/scaffolds/design/`).

## GATE
- [ ] Paleta + tipografia definidas e justificadas.
- [ ] Botoes e inputs especificados com seus estados (incluindo erro/vazio/carregando).
- [ ] Tokens em `design-tokens.json` consistentes com o playbook.
- [ ] Contraste/acessibilidade verificados.

## Ao concluir (doc gate)
- Atualize `state.json`: `design` completed/gatePassed, `currentPhase = "architect"`. Registre a conclusao no `spec/STATUS.md`. Ver `${CLAUDE_PLUGIN_ROOT}/reference/documentation-standards.md`.
- Diga: "Fase 3 aprovada. O design system e a fonte de verdade da UI. Proximo: Fase 4 — rode `sdd-architect`."
