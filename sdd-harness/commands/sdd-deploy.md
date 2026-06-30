---
description: Promove a aplicacao entre ambientes (local -> staging -> producao) na AWS, com gates e registro
---

Invoque a skill `sdd-deploy` para promover a aplicacao pela mesma IaC (CDK/SST):

1. Confirme a `main` verde e os gates locais.
2. Deploy em staging (AWS) e validacao com e2e dos fluxos de receita.
3. Promocao para producao (AWS).
4. Registre `spec/deploys/DEPLOY-NNN-*.md` e atualize a secao Deploys do `spec/STATUS.md`.

Regra: nada sobe pra AWS sem o local verde.

Argumentos opcionais (ambiente alvo: staging|producao): $ARGUMENTS
