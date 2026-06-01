import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { computeAdminToken } from "@/lib/adminAuth";

export async function POST(req: Request) {
  const { senha } = await req.json().catch(() => ({}));

  const correta = process.env.ADMIN_PASSWORD ?? "";

  const valida = (() => {
    if (typeof senha !== "string") return false;
    try {
      const a = Buffer.from(senha);
      const b = Buffer.from(correta);
      return a.length === b.length && timingSafeEqual(a, b);
    } catch {
      return false;
    }
  })();

  if (!valida) {
    await new Promise((r) => setTimeout(r, 400)); // evita enumeração por timing
    return NextResponse.json({ erro: "Senha incorreta." }, { status: 401 });
  }

  const token = await computeAdminToken();
  const res = NextResponse.json({ ok: true });

  res.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 8, // 8 horas
    path: "/",
  });

  return res;
}
