import { NextRequest, NextResponse } from "next/server";
import { computeAdminToken, safeEqual } from "@/lib/adminAuth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Página de login — sempre acessível
  if (pathname === "/admin/login") return NextResponse.next();

  // Sem credenciais configuradas: bloqueia em produção, libera em dev
  if (!process.env.ADMIN_SECRET || !process.env.ADMIN_PASSWORD) {
    if (process.env.NODE_ENV !== "production") return NextResponse.next();
    return NextResponse.json({ erro: "Admin não configurado." }, { status: 503 });
  }

  const token = req.cookies.get("admin_token")?.value ?? "";
  const expected = await computeAdminToken();

  if (!safeEqual(token, expected)) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
