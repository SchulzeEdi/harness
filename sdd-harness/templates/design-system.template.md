# 03 — Design System: <NOME DO PROJETO>

> Fonte de verdade de UX/UI. Toda UI consulta este arquivo + `design-tokens.json`.

## Identidade
- **Personalidade/tom:** <ex.: minimalista-confiavel / ousado-vibrante / tecnico-preciso>
- **Justificativa:** <por que esse tom combina com o ICP da Fase 0>
- **Referencias visuais:** <produtos que servem de norte e por que>

## Paleta de cores
| Token | Hex | Uso |
|---|---|---|
| primary | #______ | acoes principais, marca |
| primary-foreground | #______ | texto sobre primary |
| neutral-50..900 | ... | fundos, bordas, texto |
| success | #______ | confirmacoes |
| warning | #______ | avisos |
| danger | #______ | erros, acoes destrutivas |
**Justificativa da paleta:** <personalidade + contraste/acessibilidade>

## Tipografia
- **Fonte display/headings:** <fonte> — <por que>
- **Fonte corpo:** <fonte>
- **Escala:** xs 12 / sm 14 / base 16 / lg 18 / xl 20 / 2xl 24 / 3xl 30 / 4xl 36
- **Pesos:** regular 400 / medium 500 / semibold 600 / bold 700

## Espacamento, raios e sombras
- **Escala de espacamento:** 2,4,8,12,16,24,32,48,64
- **Raios:** sm 4 / md 8 / lg 12 / full 9999
- **Sombras:** sm / md / lg (definir)

## Componentes (especificacao + estados)
Para cada componente, definir: variantes + estados (default, hover, foco, desabilitado, erro, carregando).

- **Botao**: primario / secundario / ghost / destrutivo. Altura, padding, raio, estados.
- **Input / textarea / select**: estados incluindo erro (com mensagem) e foco.
- **Card**, **Modal/Dialog**, **Tabela**, **Navegacao/Sidebar**, **Toast/Alert**.
- **Estados de tela obrigatorios:** vazio (empty state), carregando (skeleton), erro.

## Micro-interacoes
- Transicoes, duracoes, feedback de clique/loading.

## Acessibilidade
- [ ] Contraste minimo AA
- [ ] Foco visivel em todos os interativos
- [ ] Navegacao por teclado
- [ ] Labels/aria nos formularios

## Onde isto vive
- Tokens -> `design-tokens.json` -> `tailwind.config`.
- Componentes -> shadcn/ui customizado (codigo proprio).
- Catalogo visual navegavel -> Storybook (`.storybook/`).

---
**Gate:**
- [ ] Paleta + tipografia definidas e justificadas
- [ ] Botoes e inputs com todos os estados (incl. erro/vazio/carregando)
- [ ] Tokens consistentes com `design-tokens.json`
- [ ] Acessibilidade verificada
