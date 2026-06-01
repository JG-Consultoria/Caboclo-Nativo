import { NextResponse } from "next/server";
import type { Agendamento } from "@/lib/types";

/* ============================================================
   POST /api/agendamento
   Registra um pedido de conversa para peça personalizada.

   Modo demo: valida e devolve um protocolo.
   Produção: gravar no banco e criar evento na agenda
   (ex.: Google Calendar) + notificação (e-mail/WhatsApp).
   ============================================================ */

export async function POST(req: Request) {
  const dados = (await req.json().catch(() => null)) as Agendamento | null;

  if (!dados?.nome || !dados?.contato || !dados?.dataPreferida) {
    return NextResponse.json(
      { erro: "Informe nome, contato e data preferida." },
      { status: 400 }
    );
  }

  // Produção:
  // const evento = await criarEventoAgenda(dados);
  // await notificarCasa(dados); await notificarCliente(dados);

  const protocolo = "AG-" + Date.now().toString(36).toUpperCase();
  return NextResponse.json({ ok: true, protocolo, demo: true });
}
