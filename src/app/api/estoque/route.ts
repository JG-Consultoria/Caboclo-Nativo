import { NextResponse } from "next/server";
import { PRODUTOS, nomeCategoria } from "@/lib/products";

/* ============================================================
   GET   /api/estoque        — lista itens com quantidade
   PATCH /api/estoque        — ajusta estoque { id, estoque }

   Modo demo: o PATCH apenas confirma (sem persistir).
   Produção: gravar no banco e baixar estoque automaticamente
   quando o webhook do Mercado Pago confirmar o pagamento.
   ============================================================ */

export async function GET() {
  const itens = PRODUTOS.map((p) => ({
    id: p.id,
    nome: p.nome,
    categoria: nomeCategoria(p.categoria),
    estoque: p.estoque,
    pecaUnica: p.pecaUnica,
  }));
  return NextResponse.json({ itens });
}

export async function PATCH(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.id !== "string" || typeof body.estoque !== "number") {
    return NextResponse.json({ erro: "Envie { id, estoque }" }, { status: 400 });
  }

  // Produção: await db.produto.update({ where:{id}, data:{ estoque } })
  return NextResponse.json({ ok: true, id: body.id, estoque: body.estoque, demo: true });
}
