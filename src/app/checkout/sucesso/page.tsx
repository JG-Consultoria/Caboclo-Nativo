"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Emblema from "@/components/Emblema";
import { Divisor } from "@/components/Grafismos";
import { formatarPreco } from "@/lib/products";

function Conteudo() {
  const params = useSearchParams();
  const forma = params.get("forma") ?? "pix";
  const total = Number(params.get("total") ?? 0);
  const pix = params.get("pix") ?? "";
  const [copiado, setCopiado] = useState(false);

  function copiar() {
    navigator.clipboard?.writeText(pix);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 1800);
  }

  return (
    <section className="wrap narrow" style={{ paddingTop: "4rem", textAlign: "center" }}>
      <Emblema size={100} color="var(--barro)" />
      <h1 className="title" style={{ marginTop: "1.4rem" }}>Pedido recebido!</h1>
      <p className="lead" style={{ margin: "0 auto 1.5rem" }}>
        Obrigado pela confiança. {total > 0 && <>Valor total: <strong style={{ color: "var(--barro)" }}>{formatarPreco(total)}</strong>.</>}
      </p>

      <Divisor className="" />

      {forma === "pix" ? (
        <div className="surface" style={{ padding: "2rem", textAlign: "left", marginTop: "1.5rem" }}>
          <h2 style={{ fontFamily: "var(--lap)", fontSize: "1.5rem", marginBottom: ".6rem" }}>Pague com Pix</h2>
          <p style={{ color: "var(--tinta-suave)", marginTop: 0 }}>
            Copie o código abaixo e cole no app do seu banco. Assim que o pagamento for confirmado, sua peça entra em preparo.
          </p>
          <div style={{ display: "flex", justifyContent: "center", margin: "1.5rem 0" }}>
            <div style={{ width: 180, height: 180, background: "var(--carvao)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Emblema size={120} color="var(--ouro)" />
            </div>
          </div>
          <code
            style={{
              display: "block",
              wordBreak: "break-all",
              background: "var(--osso)",
              border: "1px solid rgba(43,38,32,.2)",
              padding: "1rem",
              fontSize: ".82rem",
              fontFamily: "monospace",
            }}
          >
            {pix || "código gerado no back-end (modo demo)"}
          </code>
          <button className="btn" style={{ marginTop: "1rem" }} onClick={copiar}>
            {copiado ? "Copiado ✓" : "Copiar código Pix"}
          </button>
        </div>
      ) : (
        <div className="surface" style={{ padding: "2rem", marginTop: "1.5rem" }}>
          <h2 style={{ fontFamily: "var(--lap)", fontSize: "1.5rem" }}>Pagamento com cartão</h2>
          <p style={{ color: "var(--tinta-suave)" }}>
            Em produção, você seria levado ao ambiente seguro do Mercado Pago para concluir o pagamento.
            Estamos em modo de demonstração, então consideramos o pedido confirmado.
          </p>
        </div>
      )}

      <div style={{ marginTop: "2.5rem", display: "flex", gap: ".8rem", justifyContent: "center", flexWrap: "wrap" }}>
        <Link href="/catalogo" className="btn">Voltar ao catálogo</Link>
        <Link href="/" className="btn ghost">Início</Link>
      </div>
    </section>
  );
}

export default function SucessoPage() {
  return (
    <Suspense fallback={<div className="wrap" style={{ padding: "4rem 2rem" }}>Carregando…</div>}>
      <Conteudo />
    </Suspense>
  );
}
