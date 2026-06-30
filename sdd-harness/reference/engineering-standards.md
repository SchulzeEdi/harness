# Reference — Engineering standards (quality gates)

Usado pela implementacao (`sdd-implement`) e pelo review (`sdd-review`) no loop de entrega. Uma task so fecha se TODOS os gates passarem — rodados no ambiente local antes de promover para AWS.

## Quality gates
- **Tipos:** `tsc --noEmit` limpo (strict).
- **Lint/format:** ESLint + Prettier limpos.
- **Testes:** dominio coberto (alvo da constitution); fluxos de receita com e2e (Playwright).
- **Build & infra:** `next build` passa; IaC (CDK/SST) sintetiza sem erro.
- **Design:** UI usa tokens do design system; estados erro/vazio/carregando existem; contraste AA.
- **Seguranca:** sem secrets no codigo; deps sem CVE critico; inputs validados (Zod); OWASP top-10 considerado. Automatizado por `scripts/security-scan.sh` (scan de segredos + npm audit) e pelo agente `sdd-security-auditor`.
- **Multi-tenancy:** toda query de dominio filtra por `tenant_id`; feature de dados tem teste de isolamento (A nao ve B); RLS no banco como defesa em profundidade.
- **Observabilidade:** erros novos vao pro Sentry; eventos de produto pro PostHog.
- **ADR:** decisao arquitetural nova => ADR registrado.
- **Documentacao (doc gate):** `spec/STATUS.md`, indices e `state.json` atualizados — ver `documentation-standards.md`. Sem isso, a task nao fecha.

## Ordem de implementacao (por fatia)
Banco -> Backend -> Frontend. Schema/migrations primeiro, depois servico/endpoint com testes, por ultimo a UI puxando o design system.

## Convencoes
- Commits pequenos e descritivos; uma fatia por PR quando possivel.
- Validacao de input com Zod nas bordas (API, forms).
- Erros tratados explicitamente; nada de `catch` silencioso.
- Config por ambiente via variaveis; segredos no gerenciador de secrets (nunca no repo).

## Definicao de pronto (DoD) generica
Build verde + testes passando + (se UI) bate com o design system