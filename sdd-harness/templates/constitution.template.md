# Constitution: <NOME DO PROJETO>

> Regras inegociaveis de engenharia. Toda fase seguinte obedece a isto.

## Principios
1. **Tipos:** TypeScript strict, sempre.
2. **Testes:** toda feature nasce com teste do dominio. Cobertura minima do dominio: __%.
3. **Decisoes:** nenhuma decisao de arquitetura sem ADR em `spec/adr/`.
4. **Ambientes:** nada sobe pra AWS sem passar verde no ambiente local (Docker + LocalStack).
5. **Design:** toda UI consulta `spec/design-system.md` + `spec/design-tokens.json`. Sem cores/spacings "magicos".
6. **Seguranca:** secrets nunca no codigo; inputs validados (Zod); deps sem CVE critico.
7. **Monetizacao:** cobranca em USD e BRL desde o MVP.
8. **Ordem de build:** por fatia, Banco -> Backend -> Frontend.
9. **Git:** uma branch por feature/fix (`feature/<slug>`, `fix/<slug>`, `chore/<slug>`). Nunca commitar direto na `main`. Commit + push na branch -> PR -> merge na `main` -> apagar branch.
10. **Observabilidade:** Sentry + PostHog desde o dia 1.
11. **Fonte da verdade:** `spec/STATUS.md` reflete sempre o estado real.

## Aditivos deste projeto
- <regra extra 1>

---
**Gate:** cobre tipos, testes (com numero), ADRs, ambientes, design, seguranca, monetizacao, ordem de build, Git e STATUS.
