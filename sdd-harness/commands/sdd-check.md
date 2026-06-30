---
description: Roda os checks executaveis (gates locais, validacao do state.json e drift de documentacao)
---

Rode, na raiz do projeto, os checks do harness e reporte o resultado:

```
bash ${CLAUDE_PLUGIN_ROOT}/scripts/check-gates.sh        # tsc, lint, test, build
node ${CLAUDE_PLUGIN_ROOT}/scripts/validate-state.mjs    # integridade do spec/state.json
node ${CLAUDE_PLUGIN_ROOT}/scripts/check-docs.mjs        # drift de documentacao
node ${CLAUDE_PLUGIN_ROOT}/scripts/render-status.mjs     # regenera o bloco AUTO do STATUS
```

Se algum sair vermelho, explique o que falhou e o proximo passo. Ver `${CLAUDE_PLUGIN_ROOT}/reference/automation.md`.
