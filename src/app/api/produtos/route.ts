import { NextResponse } from "next/server";
import { listarProdutos } from "@/lib/products";

// GET /api/produtos?categoria=cachimbos
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const categoria = searchParams.get("categoria") ?? undefined;
  return NextResponse.json({ produtos: listarProdutos(categoria) });
}
