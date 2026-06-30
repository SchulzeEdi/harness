---
description: Registra a interacao atual no diario de bordo (tokens, custo USD, tempo) e atualiza o agregado no STATUS
---

Invoque a skill `sdd-measure` para registrar a interacao no `spec/logbook/` (modelo, tokens in/out, custo USD, tempo, iteracoes, fase/task) e atualizar o agregado em `spec/STATUS.md`.

Se a intencao for comparar vibe coding x SDD na mesma feature, use `sdd-experiment` no lugar.

Argumentos opcionais (fase/task, metodo SDD|vibe, observacoes): $ARGUMENTS
