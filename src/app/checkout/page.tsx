"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatarPreco } from "@/lib/products";
import type { OpcaoFrete, FormaPagamento } from "@/lib/types";

export default function CheckoutPage() {
  const { itens, totalCentavos, limpar } = useCart();
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cep, setCep] = useState("");
  const [fretes, setFretes] = useState<OpcaoFrete[]>([]);
  const [freteSel, setFreteSel] = useState<OpcaoFrete | null>(null);
  const [pagamento, setPagamento] = useState<FormaPagamento>("pix");
  const [calculando, setCalculando] = useState(false);
  const [processando, setProcessando] = useState(false);
  const [erro, setErro] = useState("");

  const total = totalCentavos + (freteSel?.precoCentavos ?? 0);

  if (itens.length === 0) {
    return (
      <section className="wrap" style={{ minHeight: "50vh", paddingTop: "4rem", textAlign: "center" }}>
        <h1 className="title">Nada para finalizar</h1>
        <Link href="/catalogo" className="btn">Ver o catálogo</Link>
      </section>
    );
  }

  async function calcularFrete() {
    setErro("");
    setCalculando(true);
    setFretes([]);
    setFreteSel(null);
    try {
      const r = await fetch("/api/frete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cep, itens }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.erro || "Falha ao calcular frete");
      setFretes(data.opcoes);
      setFreteSel(data.opcoes[0] ?? null);
    } catch (e: any) {
      setErro(e.message);
    } finally {
      setCalculando(false);
    }
  }

  async function finalizar() {
    setErro("");
    if (!nome || !email) return setErro("Preencha nome e e-mail.");
    if (!freteSel) return setErro("Calcule e escolha o frete.");
    setProcessando(true);
    try {
      const r = await fetch("/api/pagamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itens,
          freteCentavos: freteSel.precoCentavos,
          comprador: { nome, email },
          forma: pagamento,
        }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.erro || "Falha no pagamento");

      // Em produção: redireciona ao init_point do Mercado Pago.
      // Em demo: vai para a tela de sucesso simulada.
      limpar();
      const params = new URLSearchParams({
        forma: pagamento,
        total: String(total),
        pix: data.pixCopiaECola ?? "",
      });
      router.push(`/checkout/sucesso?${params.toString()}`);
    } catch (e: any) {
      setErro(e.message);
      setProcessando(false);
    }
  }

  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <span className="sec-num">Checkout</span>
      <h1 className="title">Finalizar compra</h1>

      <div className="checkout-layout" style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "2.5rem", marginTop: "2rem" }}>
        <div>
          {/* dados */}
          <h2 style={subt}>Seus dados</h2>
          <div className="field">
            <label>Nome completo</label>
            <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Como devemos chamar você" />
          </div>
          <div className="field">
            <label>E-mail</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" />
          </div>

          {/* frete */}
          <h2 style={{ ...subt, marginTop: "2rem" }}>Entrega</h2>
          <div style={{ display: "flex", gap: ".8rem", alignItems: "flex-end" }}>
            <div className="field" style={{ flex: 1, marginBottom: 0 }}>
              <label>CEP</label>
              <input value={cep} onChange={(e) => setCep(e.target.value)} placeholder="00000-000" inputMode="numeric" />
            </div>
            <button className="btn ghost" onClick={calcularFrete} disabled={calculando}>
              {calculando ? "Calculando…" : "Calcular frete"}
            </button>
          </div>

          {fretes.length > 0 && (
            <div style={{ marginTop: "1rem", display: "grid", gap: ".6rem" }}>
              {fretes.map((f) => (
                <label
                  key={f.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: ".9rem 1rem",
                    border: `1px solid ${freteSel?.id === f.id ? "var(--barro)" : "rgba(43,38,32,.2)"}`,
                    background: freteSel?.id === f.id ? "rgba(156,74,46,.06)" : "transparent",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: ".7rem" }}>
                    <input
                      type="radio"
                      name="frete"
                      checked={freteSel?.id === f.id}
                      onChange={() => setFreteSel(f)}
                    />
                    <span>
                      <strong>{f.transportadora} {f.servico}</strong>
                      <span style={{ display: "block", fontSize: ".82rem", color: "var(--tinta-suave)" }}>
                        até {f.prazoDias} dias úteis
                      </span>
                    </span>
                  </span>
                  <strong style={{ fontFamily: "var(--lap)" }}>{formatarPreco(f.precoCentavos)}</strong>
                </label>
              ))}
            </div>
          )}

          {/* pagamento */}
          <h2 style={{ ...subt, marginTop: "2rem" }}>Pagamento</h2>
          <div style={{ display: "flex", gap: ".8rem" }}>
            {(["pix", "cartao"] as FormaPagamento[]).map((forma) => (
              <button
                key={forma}
                onClick={() => setPagamento(forma)}
                className="surface"
                style={{
                  flex: 1,
                  padding: "1rem",
                  cursor: "pointer",
                  textAlign: "center",
                  border: `1px solid ${pagamento === forma ? "var(--barro)" : "rgba(43,38,32,.2)"}`,
                  background: pagamento === forma ? "rgba(156,74,46,.06)" : "var(--osso-2)",
                  fontFamily: "var(--lap-sc)",
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  fontSize: ".74rem",
                }}
              >
                {forma === "pix" ? "Pix" : "Cartão"}
              </button>
            ))}
          </div>
          <p style={{ fontSize: ".85rem", color: "var(--tinta-suave)", marginTop: ".7rem" }}>
            {pagamento === "pix"
              ? "Você receberá o QR Code / código copia-e-cola na próxima etapa."
              : "Você será levado ao ambiente seguro do Mercado Pago para informar os dados do cartão."}
          </p>

          {erro && <p style={{ color: "var(--brasa)", marginTop: "1rem" }}>{erro}</p>}
        </div>

        {/* resumo */}
        <aside className="surface" style={{ padding: "1.8rem", alignSelf: "start", position: "sticky", top: "calc(var(--header-h) + 1rem)" }}>
          <h2 style={{ fontFamily: "var(--lap)", fontSize: "1.4rem", marginBottom: "1rem" }}>Resumo</h2>
          {itens.map((i) => (
            <div key={i.produtoId} style={{ display: "flex", justifyContent: "space-between", fontSize: ".92rem", padding: ".3rem 0" }}>
              <span>{i.quantidade}× {i.nome}</span>
              <span>{formatarPreco(i.precoCentavos * i.quantidade)}</span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid rgba(43,38,32,.14)", marginTop: ".7rem", paddingTop: ".7rem" }}>
            <Row k="Subtotal" v={formatarPreco(totalCentavos)} />
            <Row k="Frete" v={freteSel ? formatarPreco(freteSel.precoCentavos) : "—"} />
          </div>
          <div style={{ borderTop: "1px solid rgba(43,38,32,.18)", marginTop: ".7rem", paddingTop: ".9rem", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontFamily: "var(--lap-sc)", letterSpacing: ".16em", textTransform: "uppercase", fontSize: ".74rem" }}>Total</span>
            <strong style={{ fontFamily: "var(--lap)", fontSize: "1.5rem", color: "var(--barro)" }}>{formatarPreco(total)}</strong>
          </div>
          <button className="btn" style={{ width: "100%", justifyContent: "center", marginTop: "1.2rem" }} onClick={finalizar} disabled={processando}>
            {processando ? "Processando…" : pagamento === "pix" ? "Gerar Pix" : "Pagar com cartão"}
          </button>
        </aside>
      </div>
    </section>
  );
}

const subt: React.CSSProperties = {
  fontFamily: "var(--lap)",
  fontSize: "1.4rem",
  marginBottom: "1rem",
  color: "var(--carvao)",
};

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: ".25rem 0", fontSize: ".95rem" }}>
      <span style={{ color: "var(--tinta-suave)" }}>{k}</span>
      <span>{v}</span>
    </div>
  );
}
