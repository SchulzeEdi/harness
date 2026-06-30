# examples/ — projeto de referencia (dogfood)

`cobrafacil/` e um `spec/` **completo e coerente** de um micro-SaaS ficticio (cobranca + lembrete para freelancers, USD+BRL), levado da Fase 0 ate a primeira sprint entregue, com load test e logbook.

Serve para dois fins:
1. **Prova** que a cadeia do harness fecha ponta a ponta.
2. **Few-shot**: as skills leem este exemplo como referencia de "como um bom artefato se parece".

Os scripts rodam verdes contra ele:
```
cd examples/cobrafacil
node ../../scripts/validate-state.mjs
node ../../scripts/check-docs.mjs
node ../../scripts/render-status.mjs
```
Historico imutavel — nao editar como se fosse um projeto real.
