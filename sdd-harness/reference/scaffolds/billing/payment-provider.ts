// Camada de billing abstrata (Fase 5). USD e BRL nao-opcionais.
export type Market = "USD" | "BRL";

export interface Subscription {
  id: string;
  status: "active" | "past_due" | "canceled";
  plan: string;
  currentPeriodEnd: string;
}

export interface PaymentProvider {
  market: Market;
  createCheckout(input: { tenantId: string; plan: string; locale: string }): Promise<{ url: string }>;
  handleWebhook(payload: unknown, signature: string): Promise<void>;
  getSubscription(tenantId: string): Promise<Subscription | null>;
  cancel(tenantId: string): Promise<void>;
}

// Selecao por mercado/locale do cliente.
export function pickProvider(market: Market, providers: PaymentProvider[]): PaymentProvider {
  const p = providers.find((x) => x.market === market);
  if (!p) throw new Error(`Sem PaymentProvider para o mercado ${market}`);
  return p;
}
