"use client";

import { useEffect, useState } from "react";
import Emblema from "@/components/Emblema";
import { formatarPreco } from "@/lib/products";

interface Metricas {
  faturamentoMesCentavos: number;
  pedidosMes: number;
  ticketMedioCentavos: number;
  pendentes: number;
  porCategoria: { categoria: string; vendasCentavos: number }[];
  ultimosPedidos: { id: string; cliente: string; totalCentavos: number; status: string; data: string }[];
}

interface ItemEstoque {
  id: string;
  nome: string;
  categoria: string;
  estoque: number;
  pecaUnica: boolean;
}

export default function AdminPage() {
  const [m, setM] = useState<Metricas | null>(null);
  const [estoque, setEstoque] = useState<ItemEstoque[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/metricas").then((r) => r.json()),
      fetch("/api/estoque").then((r) => r.json()),
    ])
      .then(([met, est]) => {
        setM(met);
        setEstoque(est.itens);
      })
      .finally(() => setCarregando(false));
  }, []);

  async function ajustarEstoque(id: string, delta: number) {
    const item = estoque.find((i) => i.id === id);
    if (!item) return;
    const novo = Math.max(0, item.estoque + delta);
    setEstoque((s) => s.map((i) => (i.id === id ? { ...i, estoque: novo } : i)));
    // persiste no back (modo demo só ecoa)
    await fetch("/api/estoque", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, estoque: novo }),
    });
  }

  if (carregando || !m) {
    return <section className="wrap" style={{ padding: "4rem 2rem" }}>Carregando painel…</section>;
  }

  const maxCat = Math.max(...m.porCategoria.map((c) => c.vendasCentavos), 1);

  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: ".8rem", marginBottom: ".4rem" }}>
        <Emblema size={36} color="var(--barro)" />
        <span className="sec-num" style={{ margin: 0 }}>Painel</span>
      </div>
      <h1 className="title">Vendas & estoque</h1>
      <p className="lead">Visão da casa. Em produção, os números vêm do banco e do Mercado Pago em tempo real.</p>

      {/* cards de métricas */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: "1.2rem", marginTop: "2rem" }}>
        <Metric titulo="Faturamento (mês)" valor={formatarPreco(m.faturamentoMesCentavos)} />
        <Metric titulo="Pedidos (mês)" valor={String(m.pedidosMes)} />
        <Metric titulo="Ticket médio" valor={formatarPreco(m.ticketMedioCentavos)} />
        <Metric titulo="A despachar" valor={String(m.pendentes)} destaque />
      </div>

      {/* vendas por categoria */}
      <h2 style={{ fontFamily: "var(--lap)", fontSize: "1.6rem", margin: "3rem 0 1.2rem" }}>Vendas por categoria</h2>
      <div className="surface" style={{ padding: "1.6rem" }}>
        {m.porCategoria.map((c) => (
          <div key={c.categoria} style={{ marginBottom: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".9rem", marginBottom: ".3rem" }}>
              <span>{c.categoria}</span>
              <strong style={{ fontFamily: "var(--lap)", color: "var(--barro)" }}>{formatarPreco(c.vendasCentavos)}</strong>
            </div>
            <div style={{ height: 8, background: "rgba(43,38,32,.1)" }}>
              <div style={{ height: "100%", width: `${(c.vendasCentavos / maxCat) * 100}%`, background: "var(--barro)" }} />
            </div>
          </div>
        ))}
      </div>

      {/* últimos pedidos */}
      <h2 style={{ fontFamily: "var(--lap)", fontSize: "1.6rem", margin: "3rem 0 1.2rem" }}>Últimos pedidos</h2>
      <div className="surface" style={{ padding: "0", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", fontFamily: "var(--lap-sc)", letterSpacing: ".12em", textTransform: "uppercase", fontSize: ".62rem", color: "var(--barro)" }}>
              <th style={th}>Pedido</th>
              <th style={th}>Cliente</th>
              <th style={th}>Total</th>
              <th style={th}>Status</th>
              <th style={th}>Data</th>
            </tr>
          </thead>
          <tbody>
            {m.ultimosPedidos.map((p) => (
              <tr key={p.id} style={{ borderTop: "1px solid rgba(43,38,32,.1)" }}>
                <td style={td}>{p.id}</td>
                <td style={td}>{p.cliente}</td>
                <td style={td}>{formatarPreco(p.totalCentavos)}</td>
                <td style={td}><StatusTag status={p.status} /></td>
                <td style={{ ...td, color: "var(--tinta-suave)" }}>{p.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* estoque */}
      <h2 style={{ fontFamily: "var(--lap)", fontSize: "1.6rem", margin: "3rem 0 1.2rem" }}>Controle de estoque</h2>
      <div className="surface" style={{ padding: "0", overflow: "hidden", marginBottom: "4rem" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", fontFamily: "var(--lap-sc)", letterSpacing: ".12em", textTransform: "uppercase", fontSize: ".62rem", color: "var(--barro)" }}>
              <th style={th}>Peça</th>
              <th style={th}>Categoria</th>
              <th style={th}>Estoque</th>
              <th style={th}>Ajustar</th>
            </tr>
          </thead>
          <tbody>
            {estoque.map((i) => (
              <tr key={i.id} style={{ borderTop: "1px solid rgba(43,38,32,.1)" }}>
                <td style={td}>
                  {i.nome}
                  {i.pecaUnica && <span style={{ marginLeft: ".5rem", fontSize: ".62rem", color: "var(--ocre)", fontFamily: "var(--lap-sc)", letterSpacing: ".1em", textTransform: "uppercase" }}>única</span>}
                </td>
                <td style={{ ...td, color: "var(--tinta-suave)" }}>{i.categoria}</td>
                <td style={td}>
                  <span style={{ fontFamily: "var(--lap)", fontSize: "1.1rem", color: i.estoque === 0 ? "var(--brasa)" : i.estoque <= 2 ? "var(--ocre)" : "var(--tinta)" }}>
                    {i.estoque}
                  </span>
                  {i.estoque === 0 && <span style={{ marginLeft: ".5rem", fontSize: ".7rem", color: "var(--brasa)" }}>esgotado</span>}
                </td>
                <td style={td}>
                  <div style={{ display: "inline-flex", border: "1px solid rgba(43,38,32,.2)" }}>
                    <button onClick={() => ajustarEstoque(i.id, -1)} style={ajBtn} aria-label="−">−</button>
                    <button onClick={() => ajustarEstoque(i.id, 1)} style={ajBtn} aria-label="+">+</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Metric({ titulo, valor, destaque }: { titulo: string; valor: string; destaque?: boolean }) {
  return (
    <div className="surface" style={{ padding: "1.4rem 1.5rem", background: destaque ? "var(--barro)" : "var(--osso-2)", color: destaque ? "var(--osso)" : "inherit", border: destaque ? "none" : undefined }}>
      <div style={{ fontFamily: "var(--lap-sc)", letterSpacing: ".16em", textTransform: "uppercase", fontSize: ".62rem", color: destaque ? "rgba(236,227,208,.8)" : "var(--barro)" }}>
        {titulo}
      </div>
      <div style={{ fontFamily: "var(--lap)", fontSize: "1.9rem", marginTop: ".4rem" }}>{valor}</div>
    </div>
  );
}

function StatusTag({ status }: { status: string }) {
  const cor = status === "pago" ? "var(--folha)" : status === "enviado" ? "var(--ocre)" : "var(--brasa)";
  return (
    <span style={{ fontFamily: "var(--lap-sc)", letterSpacing: ".1em", textTransform: "uppercase", fontSize: ".6rem", color: "var(--osso)", background: cor, padding: ".25em .6em" }}>
      {status}
    </span>
  );
}

const th: React.CSSProperties = { padding: ".9rem 1.2rem" };
const td: React.CSSProperties = { padding: ".85rem 1.2rem", fontSize: ".92rem" };
const ajBtn: React.CSSProperties = { width: 34, height: 32, border: "none", background: "transparent", cursor: "pointer", color: "var(--barro)", fontSize: "1.1rem", fontFamily: "var(--lap)" };
