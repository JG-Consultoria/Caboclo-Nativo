import { NextResponse } from "next/server";
import { calcularFrete } from "@/lib/frete";

// POST /api/frete  { cep, itens }
export async function POST(req: Request) {
  try {
    const { cep, itens } = await req.json();
    const opcoes = await calcularFrete(String(cep ?? ""), itens ?? []);
    return NextResponse.json({ opcoes });
  } catch (e: any) {
    return NextResponse.json({ erro: e.message ?? "Erro ao calcular frete" }, { status: 400 });
  }
}
