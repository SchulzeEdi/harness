---
description: Audita a documentacao do projeto (drift), corrige o que for seguro e atualiza a saude da doc no STATUS
---

Invoque a skill `sdd-docs` para auditar o drift de documentacao e garantir que o `spec/STATUS.md` continua a fonte da verdade.

Verifica: task `done` sem STATUS, sprint sem RETRO, ADR fora do indice, bug sem origem, logbook em atraso, artefatos orfaos e consistencia do `state.json`. Corrige o que for seguro e lista o que precisa de decisao.

Rode ao fim de cada sprint (ou sempre que o projeto parecer desatualizado).

Argumentos opcionais (escopo: tudo|sprints|adr|bugs|logbook): $ARGUMENTS
