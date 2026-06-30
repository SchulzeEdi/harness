# Reference — Automation (gates executaveis + hooks)

Tira os gates do papel: em vez de checklist que depende de lembrar, vira **script que falha** e **hook que bloqueia**. Usado por `sdd-implement`, `sdd-review`, `sdd-deploy` e `sdd-docs`.

## Scripts (`${CLAUDE_PLUGIN_ROOT}/scripts/`)

Rode na **raiz do projeto** (onde estao `package.json` e `spec/`).

| Script | O que faz | Sai !=0 quando |
|--------|-----------|----------------|
| `check-gates.sh` | typecheck (ou `tsc --noEmit`), lint, test, build, **security** | algum gate falha |
| `security-scan.sh` | scan de segredos hardcoded + `npm audit` | segredo encontrado ou CVE critico |
| `validate-state.mjs` | valida `spec/state.json` (chaves, fases, arrays, consistencia de gate) | estado invalido/inconsistente |
| `check-docs.mjs` | drift: artefato fora do STATUS, sprint sem retro, ADR fora do indice | ha drift |
| `render-status.mjs` | regenera o bloco AUTO do `STATUS.md` a partir do `state.json` | — |
| `log-usage.mjs` | registra interacao no logbook + agregado (tokens/custo/tempo) | — |
| `pre-push-gate.sh` | entrypoint do hook: so age em `git push` e roda `check-gates.sh` | gates vermelhos (exit 2 = bloqueia) |

```bash
bash   ${CLAUDE_PLUGIN_ROOT}/scripts/check-gates.sh
node   ${CLAUDE_PLUGIN_ROOT}/scripts/validate-state.mjs
node   ${CLAUDE_PLUGIN_ROOT}/scripts/check-docs.mjs
```

## Hook: bloquear push com gate vermelho

`hooks/hooks.json` registra um `PreToolUse` em `Bash` que chama `pre-push-gate.sh`. Quando o agente tenta `git push`, o hook roda os gates locais; se algo estiver vermelho, **bloqueia o push** (exit 2) e devolve o motivo. Implementa, de forma inegociavel, a regra da constitution: *nada sobe sem o local verde*.

```json
{
  "hooks": {
    "PreToolUse": [
      { "matcher": "Bash", "hooks": [
        { "type": "command", "command": "${CLAUDE_PLUGIN_ROOT}/scripts/pre-push-gate.sh" }
      ] }
    ]
  }
}
```

O hook e carregado **automaticamente**: o Claude Code le `hooks/hooks.json` do plugin por convencao. NAO referencie esse arquivo no `plugin.json` (campo `hooks`) — isso gera erro de "duplicate hooks file". O campo `hooks` do manifesto so serve para arquivos de hook *adicionais*. Para projetos sem o plugin instalado, copie o bloco para `.claude/settings.json` trocando `${CLA