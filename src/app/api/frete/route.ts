import { NextResponse } from "next/server";
import { calcularFrete } from "@/lib/frete";
import { rateLimit, clientIp } from "@/lib/rateLimiter";

// POST /api/frete  { cep, itens }
export async function POST(req: Request) {
  const { allowed } = rateLimit(`frete:${clientIp(req)}`, 30, 60_000);
  if (!allowed) {
    return NextResponse.json({ erro: "Muitas tentativas. Aguarde um momento." }, { status: 429 });
  }

  try {
    const { cep, itens } = await req.json();
    const opcoes = await calcularFrete(String(cep ?? ""), itens ?? []);
    return NextResponse.json({ opcoes });
  } catch (e: any) {
    return NextResponse.json({ erro: e.message ?? "Erro ao calcular frete" }, { status: 400 });
  }
}
