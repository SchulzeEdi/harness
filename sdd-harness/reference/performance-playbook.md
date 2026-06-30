# Reference — Performance playbook (testes de carga e escala)

Usado por `sdd-loadtest`. Objetivo: dar base numerica a afirmacao de que o sistema escala — a evidencia central de um trabalho sobre escalabilidade.

## O que medir (sempre)
- **Latencia:** p50, p95, p99 (nao use media — ela esconde a cauda).
- **Vazao (throughput):** requisicoes por segundo (RPS) sustentadas.
- **Taxa de erro:** % de respostas 5xx/timeout sob carga.
- **Saturacao:** qual recurso satura primeiro (CPU, memoria, conexoes de banco, I/O).

## Metas (SLO) — defina ANTES de rodar
Exemplo de alvo para um endpoint de API:
- p95 < 300 ms na carga nominal.
- >= 200 RPS sustentados com erro < 1%.
- Degradacao graciosa (sem cascata de erro) ate 2x a carga nominal.

Sem meta previa, o teste vira "rodei e deu um numero" — inutil para argumentar.

## Tipos de teste
- **Smoke:** carga minima, so confirma que o cenario funciona.
- **Carga (load):** a carga esperada em producao; valida os SLOs.
- **Stress:** sobe ate quebrar; acha o teto e o ponto de quebra.
- **Soak:** carga moderada por tempo longo; acha vazamento de memoria/conexao.

## Estagios (responde "o que quebra com 10x?")
Rode em rampa: nominal -> 2x -> 5x -> 10x. Em cada nivel registre latencia/vazao/erro e o recurso que satura. O harness (Fase 4) ja obriga a documentar os candidatos a quebra: conexoes de banco (pooling/RDS Proxy), jobs longos (SQS+worker), custo/limite de IA (cache+rate limit). O load test confirma qual quebra de fato.

## Onde rodar
- Numeros **finais** vao em staging na AWS (infra de verdade, mesma IaC). Local serve so para smoke.
- Isole a carga: o gerador (k6) nao pode competir por CPU com a app.

## Ferramenta
k6 (script em JS, CLI simples, bom relatorio). Alternativas: Artillery, Gatling. Scaffold em `scaffolds/loadtest/k6-load.js`.

```
k6 run scaffolds/loadtest/k6-load.js          # carga nominal
k6 run -e RATE=2000 scaffolds/loadtest/k6-load.js   # estressar
```

## Ameacas a validade (cite no TCC)
- Ambiente diferente de producao (tamanho, rede) -> use staging com a mesma IaC.
- Cache quente vs frio muda o numero -> declare o estado.
- Dados sinteticos vs reais -> descreva o dataset.
- Cold start de Lambda -> separe a primeira janela.
