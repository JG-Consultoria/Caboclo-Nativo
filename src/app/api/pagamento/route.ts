import { NextResponse } from "next/server";
import { criarPreferenciaPagamento } from "@/lib/mercadopago";
import { rateLimit, clientIp } from "@/lib/rateLimiter";

/* ============================================================
   POST /api/pagamento  { itens, freteCentavos, comprador, forma }
   Cria a preferência de pagamento (Pix/cartão) no Mercado Pago.
   No fluxo real, o front redireciona para `initPoint`.
   ============================================================ */

export async function POST(req: Request) {
  const { allowed } = rateLimit(`pay:${clientIp(req)}`, 5, 5 * 60_000);
  if (!allowed) {
    return NextResponse.json(
      { erro: "Muitas tentativas. Aguarde alguns minutos." },
      { status: 429 }
    );
  }

  try {
    const { itens, freteCentavos, comprador } = await req.json();

    if (!Array.isArray(itens) || itens.length === 0) {
      return NextResponse.json({ erro: "Carrinho vazio" }, { status: 400 });
    }
    if (!comprador?.nome || !comprador?.email) {
      return NextResponse.json({ erro: "Dados do comprador incompletos" }, { status: 400 });
    }

    const pref = await criarPreferenciaPagamento({
      itens,
      freteCentavos: Number(freteCentavos ?? 0),
      comprador,
    });

    return NextResponse.json(pref);
  } catch (e: any) {
    return NextResponse.json({ erro: e.message ?? "Erro no pagamento" }, { status: 500 });
  }
}
