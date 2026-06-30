# Reference — Ambientes: local -> staging -> producao (AWS)

Regra de ouro (da constitution): **nada sobe pra AWS sem passar verde no ambiente local.**

## Local (onde voce testa)
`docker-compose.yml` sobe Postgres + LocalStack (emula S3, SQS e outros servicos AWS localmente) + a app Next.js. Aqui rodam TODOS os quality gates antes de qualquer deploy. Com SST, `sst dev` permite desenvolvimento "live" conectado a recursos reais quando necessario.

O `docker-compose.yml` de referencia (Postgres + LocalStack) e **fonte unica** e vive em `${CLAUDE_PLUGIN_ROOT}/reference/scaffolds/config/docker-compose.yml`. O `sdd-init` copia a partir de la — nao duplique o conteudo aqui.

## Staging (AWS)
Ambiente identico a producao, porem menor/barato, criado pela MESMA IaC (CDK/SST) so trocando parametros (tamanho, dominio). Serve para validar o deploy real e rodar e2e contra infra de verdade.

## Producao (AWS)
Mesma IaC, recursos dimensionados. Deploy promovido a partir do staging.

## Fluxo de promocao (deploy)
Conduzido por `sdd-deploy`: implementa e testa **local** -> promove para **staging** -> valida -> promove para **producao**.

A IaC em `infra/` garante que os tres ambientes sejam o mesmo desenho, so com tamanhos diferentes — acabando com "na minha maquina funciona".
