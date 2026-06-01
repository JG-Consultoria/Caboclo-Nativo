/* ============================================================
   Adaptador de pagamento — Mercado Pago (Pix + cartão).

   Este arquivo é o ÚNICO ponto que conhece o gateway.
   Em modo demo devolve dados falsos; com MP_ACCESS_TOKEN
   configurado, cria uma preferência real.

   Doc: https://www.mercadopago.com.br/developers/pt/docs
   Pacote sugerido p/ produção:  npm i mercadopago
   ============================================================ */

import type { ItemCarrinho, PreferenciaPagamento } from "./types";

const DEMO = process.env.NEXT_PUBLIC_DEMO_MODE !== "false" || !process.env.MP_ACCESS_TOKEN;

interface CriarPreferenciaArgs {
  itens: ItemCarrinho[];
  freteCentavos: number;
  comprador: { nome: string; email: string };
}

export async function criarPreferenciaPagamento(
  args: CriarPreferenciaArgs
): Promise<PreferenciaPagamento> {
  if (DEMO) {
    // Resposta simulada — o front consegue exibir tela de sucesso/Pix.
    return {
      preferenceId: "DEMO-" + Math.random().toString(36).slice(2, 10),
      initPoint: "/checkout/sucesso?demo=1",
      pixCopiaECola:
        "00020126580014BR.GOV.BCB.PIX0136demo-caboclo-nativo52040000530398654041.005802BR5915CABOCLO NATIVO6009SAO PAULO62070503***6304DEMO",
      pixQrCodeBase64: undefined,
      demo: true,
    };
  }

  /* ---------- Integração real (descomente em produção) ----------

  const { MercadoPagoConfig, Preference } = await import("mercadopago");
  const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });
  const pref = new Preference(client);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

  const result = await pref.create({
    body: {
      items: args.itens.map((i) => ({
        id: i.produtoId,
        title: i.nome,
        quantity: i.quantidade,
        unit_price: i.precoCentavos / 100,
        currency_id: "BRL",
      })),
      shipments: { cost: args.freteCentavos / 100, mode: "not_specified" },
      payer: { name: args.comprador.nome, email: args.comprador.email },
      payment_methods: {
        // só Pix e cartão (sem boleto), conforme pedido
        excluded_payment_types: [{ id: "ticket" }],
      },
      back_urls: {
        success: `${siteUrl}/checkout/sucesso`,
        pending: `${siteUrl}/checkout/sucesso`,
        failure: `${siteUrl}/checkout`,
      },
      auto_return: "approved",
      notification_url: `${siteUrl}/api/pagamento/webhook`,
    },
  });

  return { preferenceId: result.id!, initPoint: result.init_point };

  ---------------------------------------------------------------- */

  throw new Error("Mercado Pago não configurado. Defina MP_ACCESS_TOKEN ou use o modo demo.");
}
