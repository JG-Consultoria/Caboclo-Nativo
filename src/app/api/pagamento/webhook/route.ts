import { NextResponse } from "next/server";
import { createHmac } from "crypto";

/* ============================================================
   POST /api/pagamento/webhook
   Mercado Pago chama esta URL quando o status do pagamento muda.
   A assinatura HMAC-SHA256 é verificada antes de processar.

   Variável de ambiente necessária: MP_WEBHOOK_SECRET
   (Painel MP → Suas integrações → Webhooks → Chave secreta)
   ============================================================ */

function verificarAssinatura(
  dataId: string | undefined,
  xSignature: string,
  xRequestId: string
): boolean {
  const secret = process.env.MP_WEBHOOK_SECRET;
  if (!secret) return false;

  // x-signature formato: "ts=<timestamp>,v1=<hmac_hex>"
  const partes = Object.fromEntries(
    xSignature.split(",").map((p) => p.split("=") as [string, string])
  );
  const ts = partes["ts"];
  const v1 = partes["v1"];
  if (!ts || !v1) return false;

  const manifest = `id:${dataId ?? ""};request-id:${xRequestId};ts:${ts}`;
  const esperado = createHmac("sha256", secret).update(manifest).digest("hex");

  return esperado === v1;
}

export async function POST(req: Request) {
  const xSignature = req.headers.get("x-signature") ?? "";
  const xRequestId = req.headers.get("x-request-id") ?? "";

  const body = await req.json().catch(() => ({}));

  // Valida assinatura se o secret estiver configurado
  if (process.env.MP_WEBHOOK_SECRET) {
    if (!verificarAssinatura(body?.data?.id, xSignature, xRequestId)) {
      return NextResponse.json({ erro: "Assinatura inválida." }, { status: 401 });
    }
  }

  // TODO (Fase 2):
  // const paymentId = body?.data?.id;
  // const pagamento = await consultarPagamentoMP(paymentId);
  // if (pagamento.status === "approved") {
  //   await marcarPedidoPago(pagamento.external_reference);
  //   await baixarEstoque(pagamento.external_reference);
  //   await gerarEtiquetaEnvio(pagamento.external_reference);
  // }

  console.log("[webhook MP] recebido:", body?.type ?? "evento", "| id:", body?.data?.id ?? "—");
  return NextResponse.json({ recebido: true });
}

// MP valida o endpoint com GET
export async function GET() {
  return NextResponse.json({ ok: true });
}
