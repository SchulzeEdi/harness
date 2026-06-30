# SDD Harness

Harness de engenharia **Spec-Driven Development** para micro-SaaS, empacotado como plugin do Claude Code. Leva uma ideia da validacao ao deploy, com cadeia de definicao + loop de entrega, **subagentes especializados**, **gates executaveis** (script + git hook + CI) e documentacao sem drift (STATUS gerado de um `state.json` unico).

> Documentacao completa: [`sdd-harness/README.md`](sdd-harness/README.md) · Changelog: [`sdd-harness/CHANGELOG.md`](sdd-harness/CHANGELOG.md)

## Estrutura
- `.claude-plugin/marketplace.json` — marketplace local (`edi-harness`)
- `sdd-harness/` — o plugin: `skills/`, `agents/`, `hooks/`, `scripts/`, `templates/`, `reference/`, `examples/`

## Instalar no Claude Code

Direto do GitHub:
```
/plugin marketplace add SchulzeEdi/harness
/plugin install sdd-harness@edi-harness
```
Reinicie a sessao depois de instalar.

## O que tem dentro
18 skills · 6 subagentes · gates executaveis (script + git hook + CI) · teste de carga (k6) · diario de bordo (tokens/custo/tempo) · isolamento multi-tenant · projeto de exemplo (`sdd-harness/examples/cobrafacil`).
