---
name: sdd-docs
description: Skill de auditoria de documentacao do harness SDD. Verifica se o STATUS.md e os indices continuam a fonte da verdade e acusa drift - task done sem STATUS atualizado, sprint sem RETRO, ADR fora do indice de decisoes, bug sem origem, logbook em atraso, artefato orfao sem cross-link. Corrige ou lista o que falta. USE SEMPRE QUE o usuario falar em documentacao, doc, "atualizar o STATUS", "ta tudo documentado?", auditar/conferir documentacao, "ta desatualizado", organizar a doc, saude da documentacao, ou reclamar que o projeto se perdeu/esta baguncado. Dispare PROATIVAMENTE ao fim de cada sprint e sempre que perceber que artefatos foram criados sem entrar no STATUS. Baseia-se em reference/documentation-standards.md.
---

# Docs — auditoria de documentacao continua

Resolve o drift: o projeto comeca documentando bem e se perde. Esta skill e a rede de seguranca. Regras em `${CLAUDE_PLUGIN_ROOT}/reference/documentation-standards.md`.

> Pode **delegar ao agente `sdd-doc-auditor`** (via Task) — ele roda os scripts e corrige os indices em contexto isolado.

## Como conduzir
1. Leia `spec/STATUS.md`, `spec/state.json` e varra `spec/` (prds, tasks, sprints, bugs, adr, deploys, loadtests, changes, logbook, experiments). Rode `node ${CLAUDE_PLUGIN_ROOT}/scripts/check-docs.mjs` e `node ${CLAUDE_PLUGIN_ROOT}/scripts/validate-state.mjs` para achar drift e estado invalido programaticamente (ver `${CLAUDE_PLUGIN_ROOT}/reference/automation.md`).
2. Cheque cada item da lista de drift abaixo.
3. Apresente um **relatorio** (o que esta ok, o que falta) e **corrija** o que for seguro corrigir (atualizar indices, criar cross-links). O que exigir decisao do usuario, liste.
4. Rode `node ${CLAUDE_PLUGIN_ROOT}/scripts/render-status.mjs` para regenerar o bloco AUTO do STATUS a partir do `state.json` (a verdade da maquina) — garante que o resumo nunca fica defasado.

## Checklist de drift
- [ ] Toda task `done` no arquivo de tasks aparece como concluida no STATUS (com branch/PR).
- [ ] Toda sprint fechada tem `RETRO-NNN` e esta no historico do STATUS.
- [ ] Todo ADR em `spec/adr/` esta no **indice de decisoes** do STATUS.
- [ ] Todo bug tem **origem** (sprint/task) e esta na secao certa (aberto/resolvido).
- [ ] Todo deploy tem `DEPLOY-NNN` e aparece na secao Deploys.
- [ ] Logbook em dia: fases/tasks recentes tem linha; agregado do STATUS bate com os subtotais.
- [ ] Nenhum artefato **orfao** (sem cross-link de origem e sem indice).
- [ ] `state.json` consistente com o STATUS (fase atual, gates, arrays).
- [ ] Imutaveis intactos (`spec/mvp_scope/`, ADRs aceitos nao reescritos).

## Saida
- **Saude da doc:** ok | drift detectado (com a lista).
- Atualize o campo *Saude da doc* no resumo do `spec/STATUS.md`.

## Ao concluir (doc gate)
- Aplique a