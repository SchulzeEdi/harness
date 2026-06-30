# Reference — Observability playbook (erro em prod -> bug)

Fecha o loop que faltava: o harness ja exige Sentry (erros) + PostHog (produto) desde o dia 1, mas nao dizia o que fazer quando algo quebra em producao. Aqui o alerta vira acao rastreavel.

## Instrumentacao (desde o MVP)
- **Erros:** Sentry no front e no back; toda excecao nao tratada sobe com contexto (tenant, rota, release).
- **Produto:** PostHog nos eventos-chave (signup, criar cobranca, checkout, pagamento) — alimenta funil e ativacao.
- **Infra:** CloudWatch (logs/metricas) para latencia, erro 5xx, saturacao de banco.

## SLOs (ligados ao load test)
Defina e publique no STATUS:
- **Disponibilidade:** ex. 99.5%/mes.
- **Latencia:** p95 < 300ms nos endpoints de receita (mesma meta do `sdd-loadtest`).
- **Erro:** taxa 5xx < 1%.
O **error budget** que sobra orienta se a proxima sprint e feature ou hardening.

## Alertas (o que acorda voce)
- Pico de erro no Sentry (novas issues por minuto).
- Estouro de SLO de latencia/erro (CloudWatch).
- Falha de webhook de billing (dinheiro!) — alerta dedicado.

## Loop alerta -> bug (rastreavel)
1. **Alerta** dispara (Sentry/CloudWatch).
2. **Triagem:** severidade + impacto (quantos tenants, receita afetada?).
3. **Incidente:** se houve impacto a usuario, abra `spec/incidents/INC-NNN-*.md` (postmortem blameless) com `${CLAUDE_PLUGIN_ROOT}/templates/incident.template.md`.
4. **Correcao:** abra um BUG e **delegue ao agente `sdd-bug-fixer`** (reproduz, teste, fix, gates).
5. **Sistemico?** se a causa raiz e arquitetural, gere ADR e/ou debito (DT-NN); se for escala, acione `sdd-scale-analyst`.
6. **Doc gate:** registre INC + BUG no STATUS; rode `render-status.mjs`.

## Postmortem blameless
Foco em sistema, nao em pessoa. Timeline, impacto, causa raiz, e **itens de acao** com responsavel e prazo. O valor esta nas acoes que evitam a reincidencia.
