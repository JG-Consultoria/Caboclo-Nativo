import { NextResponse } from "next/server";
import { CATEGORIAS } from "@/lib/products";

/* ============================================================
   GET /api/metricas — métricas financeiras do painel.
   Modo demo: números fixos de exemplo.
   Produção: agregar pedidos do banco + status do Mercado Pago.
   ============================================================ */

export async function GET() {
  const porCategoria = CATEGORIAS.map((c, i) => ({
    categoria: c.nome,
    vendasCentavos: [128000, 38000, 41000, 96000, 32000, 54000, 230000][i] ?? 20000,
  }));

  return NextResponse.json({
    faturamentoMesCentavos: 374000,
    pedidosMes: 18,
    ticketMedioCentavos: Math.round(374000 / 18),
    pendentes: 3,
    porCategoria,
    ultimosPedidos: [
      { id: "#1042", cliente: "Marina S.", totalCentavos: 52000, status: "pago", data: "27/05" },
      { id: "#1041", cliente: "João P.", totalCentavos: 18000, status: "enviado", data: "26/05" },
      { id: "#1040", cliente: "Ana L.", totalCentavos: 24000, status: "pago", data: "25/05" },
      { id: "#1039", cliente: "Carlos M.", totalCentavos: 6000, status: "pendente", data: "25/05" },
      { id: "#1038", cliente: "Rita F.", totalCentavos: 38000, status: "enviado", data: "24/05" },
    ],
  });
}
