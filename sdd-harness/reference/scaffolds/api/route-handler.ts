import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Validacao Zod na borda. Erros explicitos. tenant_id sempre presente no contexto.
const Body = z.object({ name: z.string().min(1), seats: z.number().int().positive() });

export async function POST(req: NextRequest) {
  const parsed = Body.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  // const tenantId = getTenant(req); // tenancy
  // ... chama o modulo de dominio ...
  return NextResponse.json({ ok: true, data: parsed.data }, { status: 201 });
}
