import { NextResponse } from "next/server";

/* ============================================================
   POST /api/pagamento/webhook
   Mercado Pago chama esta URL quando o status do pagamento muda.
   É AQUI que o fluxo automático se fecha:
     1. confirmar o pagamento (consultar a API do MP pelo id)
     2. marcar o pedido como "pago"
     3. baixar o estoque automaticamente
     4. disparar a etiqueta de envio (Melhor Envio)
     5. notificar cliente e a casa

   Em modo demo apenas registramos e respondemos 200.
   ============================================================ */

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  // Produção (esboço):
  // const paymentId = body?.data?.id;
  // const pagamento = await consultarPagamentoMP(paymentId);
  // if (pagamento.status === "approved") {
  //   await marcarPedidoPago(pagamento.external_reference);
  //   await baixarEstoque(pagamento.external_reference);
  //   await gerarEtiquetaEnvio(pagamento.external_reference);
  // }

  console.log("[webhook MP] recebido:", body?.type ?? "evento");
  return NextResponse.json({ recebido: true });
}

// MP às vezes valida o endpoint com GET
export async function GET() {
  return NextResponse.json({ ok: true });
}
