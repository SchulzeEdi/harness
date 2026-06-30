# Design system — cobrafacil

**Personalidade:** confiavel-direto (dinheiro pede confianca; nada de firula).
**Paleta:** primaria verde-cobranca (#12805C) + neutros quentes + estados (sucesso/erro/aviso).
**Tipografia:** Inter (corpo) + Inter Tight (display).
**Componentes:** botoes (primario/secundario/destrutivo/ghost), input, modal, tabela de cobrancas, card de cliente.
**Estados obrigatorios:** hover, foco, desabilitado, erro, vazio ("nenhuma cobranca ainda"), carregando.
**Acessibilidade:** contraste AA, foco visivel, navegavel por teclado.
**Assinatura visual:** badge de status de cobranca (pago/pendente/atrasado) com cor + icone.

Pipeline: design-tokens.json -> tailwind.config -> componentes -> Storybook.
