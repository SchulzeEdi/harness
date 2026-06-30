---
name: sdd-review
description: Skill de review/verificacao do harness SDD. Revisa o diff de uma task ANTES do merge na main, conferindo contra a constitution, os engineering-standards, o design system e a seguranca, e decide aprovar ou pedir ajustes. USE SEMPRE QUE o usuario falar em review, revisar, revisao de codigo, code review, "pode mergear?", "ta pronto pra PR?", conferir/verificar o codigo, checar qualidade, ou ao abrir/avaliar um Pull Request. Dispare automaticamente como etapa do loop, logo apos sdd-implement terminar uma task e ANTES do commit/merge, mesmo sem pedido explicito. Foca em revisar mudancas existentes; nao implementa a feature (isso e sdd-implement) nem registra bug novo (isso e sdd-bug).
---

# Review — verificacao antes do merge

Etapa explicita de qualidade no loop de entrega: **implement -> REVIEW -> commit/PR -> merge.** Garante que o que vai pra `main` respeita as regras do projeto.

> Para um review com contexto fresco, **delegue ao agente `sdd-reviewer`** (via Task); em features sensiveis (auth/billing/dados de tenant) acione tambem o `sdd-security-auditor`. O processo abaixo vale quando voce mesmo revisa.

## Como conduzir
1. Leia `spec/constitution.md`, `${CLAUDE_PLUGIN_ROOT}/reference/engineering-standards.md` e `${CLAUDE_PLUGIN_ROOT}/reference/design-standards.md`. Identifique a task e a branch alvo.
2. Gere/leia o **diff** da branch contra a `main` e revise contra a checklist abaixo. Rode `bash ${CLAUDE_PLUGIN_ROOT}/scripts/check-gates.sh` (automatiza tsc/lint/test/build) e `node ${CLAUDE_PLUGIN_ROOT}/scripts/validate-state.mjs` — ver `${CLAUDE_PLUGIN_ROOT}/reference/automation.md`.
3. Para cada problema, classifique: **bloqueante** (impede merge) ou **nao-bloqueante** (vira debito tecnico DT-NN ou bug).

## Checklist de review
- [ ] **Tipos:** `tsc --noEmit` limpo (strict); sem `any` injustificado.
- [ ] **Lint/format:** ESLint + Prettier limpos.
- [ ] **Testes:** dominio coberto; fluxos de receita com e2e; testa o caminho de erro.
- [ ] **Rastreabilidade (BDD):** todo criterio de aceite `CA-N` da task tem teste correspondente que passa (titulo "CA-N: ..."). Ver `${CLAUDE_PLUGIN_ROOT}/reference/bdd-traceability.md`.
- [ ] **Build/IaC:** `next build` passa; IaC sintetiza.
- [ ] **Design system:** UI usa tokens (sem cor/spacing magico); estados erro/vazio/carregando presentes; contraste AA.
- [ ] **Seguranca:** sem secrets no codigo; inputs validados (Zod); sem CVE critico; OWASP top-10 considerado.
- [ ] **Multi-tenancy:** acesso a dados filtra por `tenant_id`; feature de dados tem **teste de isolamento** (tenant A nao ve B — scaffold `tenancy/isolation.test.ts`).
- [ ] **Observabilidade:** erros no Sentry, eventos no PostHog.
- [ ] **ADR:** decisao arquitetural nova esta registrada em `spec/adr/` e indexada no STATUS.
- [ ] **Escopo:** o diff entrega a task (criterios de aceite) e nada alem (sem scope