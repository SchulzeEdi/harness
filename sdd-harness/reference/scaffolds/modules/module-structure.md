# Esqueleto — Modular Monolith (fronteiras de dominio)

Default da Fase 4. Modulos so conversam por **interfaces**. App so orquestra.

```
src/
├── modules/
│   ├── auth/        (identidade, sessoes)
│   ├── billing/     (assinaturas, faturas, webhooks)  <- ver billing/payment-provider.ts
│   ├── tenancy/     (organizacoes, membros, isolamento por tenant_id)
│   └── <core>/      (o dominio que E o produto)
├── shared/          (tipos, utils, db client, config)
└── app/             (rotas Next.js — finas; chamam modulos)
```

Cada modulo expoe um `index.ts` com sua API publica (tipos + funcoes). Nada de import cruzado em arquivos internos de outro modulo. Extracao para servico separado: so com ADR e escala real.
