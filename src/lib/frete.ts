/* ============================================================
   Adaptador de frete.
   Modo demo: calcula uma estimativa simples por região do CEP.
   Produção: recomendo Melhor Envio (agrega Correios, Jadlog etc.).
   Doc: https://docs.melhorenvio.com.br
   ============================================================ */

import type { ItemCarrinho, OpcaoFrete } from "./types";

const DEMO = process.env.NEXT_PUBLIC_DEMO_MODE !== "false" || !process.env.MELHOR_ENVIO_TOKEN;

export async function calcularFrete(
  cepDestino: string,
  itens: ItemCarrinho[]
): Promise<OpcaoFrete[]> {
  const cep = cepDestino.replace(/\D/g, "");
  if (cep.length !== 8) throw new Error("CEP inválido");

  if (DEMO) {
    // Estimativa simulada baseada no primeiro dígito (região) e quantidade de itens.
    const regiao = parseInt(cep[0], 10);
    const qtd = itens.reduce((s, i) => s + i.quantidade, 0) || 1;
    const base = 1800 + regiao * 350 + qtd * 250;
    return [
      {
        id: "demo-pac",
        transportadora: "Correios",
        servico: "PAC",
        precoCentavos: base,
        prazoDias: 6 + regiao,
      },
      {
        id: "demo-sedex",
        transportadora: "Correios",
        servico: "SEDEX",
        precoCentavos: Math.round(base * 1.7),
        prazoDias: 2 + Math.round(regiao / 2),
      },
    ];
  }

  /* ---------- Integração real (descomente em produção) ----------

  const resp = await fetch("https://melhorenvio.com.br/api/v2/me/shipment/calculate", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.MELHOR_ENVIO_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      from: { postal_code: process.env.ORIGEM_CEP },
      to: { postal_code: cep },
      products: itens.map((i) => ({
        id: i.produtoId,
        width: 11, height: 11, length: 16, weight: 0.3, // ajustar por produto
        insurance_value: i.precoCentavos / 100,
        quantity: i.quantidade,
      })),
    }),
  });
  const data = await resp.json();
  return data
    .filter((o: any) => !o.error)
    .map((o: any) => ({
      id: String(o.id),
      transportadora: o.company.name,
      servico: o.name,
      precoCentavos: Math.round(parseFloat(o.price) * 100),
      prazoDias: o.delivery_time,
    }));

  ---------------------------------------------------------------- */

  throw new Error("Frete não configurado. Defina MELHOR_ENVIO_TOKEN ou use o modo demo.");
}
