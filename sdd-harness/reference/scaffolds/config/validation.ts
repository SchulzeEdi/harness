import { z } from "zod";

// Validacao nas bordas (API, forms, env). Config por ambiente; segredo nunca no repo.
export const Env = z.object({
  DATABASE_URL: z.string().url(),
  STRIPE_SECRET: z.string().min(1),
  NODE_ENV: z.enum(["development", "test", "production"]),
});
export type Env = z.infer<typeof Env>;

export function loadEnv(raw: NodeJS.ProcessEnv): Env {
  return Env.parse(raw); // falha cedo e explicito se faltar segredo/config
}
