-- Defesa em profundidade: alem do repo escopado, ligue Row-Level Security no Postgres.
-- A app seta o tenant atual por conexao; a policy garante isolamento mesmo se a query esquecer o filtro.
ALTER TABLE charges ENABLE ROW LEVEL SECURITY;

CREATE POLICY charges_tenant_isolation ON charges
  USING (tenant_id = current_setting('app.current_tenant')::uuid);

-- Na app, por requisicao/conexao:
--   SET app.current_tenant = '<tenant_id>';
