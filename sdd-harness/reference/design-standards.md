# Reference — Design standards (UX/UI)

Usado pela Fase 3 (`sdd-design`). Objetivo: cada SaaS fica usavel, bonito e UNICO — nunca UI generica de template.

## Principios de UX
- **Clareza > esperteza:** o usuario sempre sabe onde esta e o que fazer.
- **Um caminho feliz obvio** por tela; reduzir escolhas.
- **Feedback imediato:** todo clique tem resposta visual; loading nunca trava em branco.
- **Estados sempre cobertos:** default, hover, foco, desabilitado, erro, **vazio** e **carregando**.
- **Onboarding ate o "aha":** a primeira sessao leva ao valor rapido.

## Como ficar UNICO (e nao mais um template)
1. **Escolha uma personalidade** e comprometa-se (minimalista-confiavel, ousado-vibrante, tecnico-preciso...).
2. **Paleta com intencao:** uma primaria com carater + neutros bem calibrados; evite o azul-padrao-de-todo-SaaS sem motivo.
3. **Tipografia intencional:** uma escolha de fonte que carregue o tom; par display+corpo.
4. **Detalhe que assina:** um elemento recorrente (forma, raio, sombra, ilustracao, motion) que vira marca.
5. **Consistencia rigida** via tokens — a unicidade vem da identidade, nao da bagunca.

## Pipeline (onde o design vive)
`design-tokens.json` (fonte de verdade) -> `tailwind.config` -> componentes shadcn/ui customizados (codigo proprio) -> **Storybook** como catalogo visual navegavel de cada botao, estado e cor.

## Acessibilidade (minimo)
- Contraste AA (texto normal >= 4.5:1).
- Foco visivel em todos os interativos.
- Navegavel por teclado; ordem de tab logica.
- Labels e aria nos formularios; mensagens de erro associadas ao campo.

## Regra de ouro da implementacao
A implementacao (`sdd-implement`) e PROIBIDA de criar UI sem antes ler `spec/design-system.md` + `spec/design-tokens.json`. Sem cores/spacings "magicos" fora do tema.
