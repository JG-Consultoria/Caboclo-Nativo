"use client";

import { useState } from "react";
import Emblema from "@/components/Emblema";
import Icone from "@/components/Icone";
import { Divisor } from "@/components/Grafismos";

const TIPOS = ["Cachimbo", "Kuripe / Tipí", "Maracá / Apito", "Abanilho", "Outro"];

// Horários de exemplo — em produção viriam do back (agenda real / Google Calendar).
const HORARIOS = ["09:00", "10:30", "14:00", "15:30", "17:00"];

const PASSOS = [
  { n: "01", t: "Conversa", d: "Você conta a intenção da peça; desenhamos juntos madeira, tamanho e gravação." },
  { n: "02", t: "Orçamento", d: "Enviamos o valor e o prazo. Aprovado, reservamos a madeira." },
  { n: "03", t: "Feitura", d: "A peça nasce no tempo das mãos. Acompanha fotos do processo." },
  { n: "04", t: "Envio", d: "Embalada com selo da casa e despachada com rastreio." },
];

export default function PersonalizadoPage() {
  const [form, setForm] = useState({
    nome: "",
    contato: "",
    tipoPeca: TIPOS[0],
    descricao: "",
    dataPreferida: "",
    horario: HORARIOS[0],
  });
  const [enviando, setEnviando] = useState(false);
  const [ok, setOk] = useState(false);
  const [erro, setErro] = useState("");

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function enviar() {
    setErro("");
    if (!form.nome || !form.contato || !form.dataPreferida) {
      return setErro("Preencha nome, contato e a data desejada.");
    }
    setEnviando(true);
    try {
      const r = await fetch("/api/agendamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.erro || "Falha ao agendar");
      setOk(true);
    } catch (e: any) {
      setErro(e.message);
    } finally {
      setEnviando(false);
    }
  }

  const hoje = new Date().toISOString().slice(0, 10);

  return (
    <>
      {/* topo escuro */}
      <section style={{ background: "var(--carvao)", color: "var(--osso)" }}>
        <div className="wrap personalizado-hero" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "2.5rem", alignItems: "center" }}>
          <div>
            <p className="kicker on-dark">Sob encomenda</p>
            <h1 className="title" style={{ color: "var(--osso)" }}>Uma peça<br />feita para você.</h1>
            <p className="lead" style={{ color: "rgba(236,227,208,.8)" }}>
              Cachimbos, maracás e abanilhos nascem do diálogo. Agende uma conversa e desenhamos
              juntos o objeto de poder que combina com a sua reza.
            </p>
          </div>
          <div className="hero-aside" style={{ display: "flex", justifyContent: "center" }}>
            <Emblema size={180} color="var(--ouro)" />
          </div>
        </div>
      </section>

      {/* como funciona */}
      <section className="wrap">
        <span className="sec-num">Como funciona</span>
        <h2 className="title">Do silêncio à sua mão.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: "1.4rem", marginTop: "2rem" }}>
          {PASSOS.map((p, i) => (
            <div key={p.n} className="surface" style={{ padding: "1.6rem" }}>
              <span style={{ color: "var(--ocre)" }}>
                <Icone nome={(["jiboia", "cesto", "pantera", "abanico"] as const)[i % 4]} variante="linha" size={42} />
              </span>
              <div className="produto-nome" style={{ fontSize: "1.6rem", marginTop: ".5rem" }}>{p.n} · {p.t}</div>
              <p style={{ fontSize: ".92rem", color: "var(--tinta-suave)", margin: ".4rem 0 0", lineHeight: 1.5 }}>{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* agendamento */}
      <section className="wrap narrow" style={{ paddingTop: 0 }}>
        <Divisor className="" />
        <div className="surface" style={{ padding: "2.5rem", marginTop: "2rem" }}>
          {ok ? (
            <div style={{ textAlign: "center" }}>
              <Emblema size={90} color="var(--barro)" />
              <h2 className="title" style={{ marginTop: "1rem" }}>Conversa agendada!</h2>
              <p className="lead" style={{ margin: "0 auto" }}>
                Recebemos seu pedido para <strong>{form.dataPreferida}</strong> às <strong>{form.horario}</strong>.
                Entraremos em contato pelo {form.contato} para confirmar. Obrigado!
              </p>
            </div>
          ) : (
            <>
              <p className="kicker">Agendar conversa</p>
              <h2 style={{ fontFamily: "var(--lap)", fontSize: "1.8rem", marginBottom: "1.5rem" }}>
                Conte sobre a sua peça
              </h2>

              <div className="form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1.2rem" }}>
                <div className="field">
                  <label>Seu nome</label>
                  <input value={form.nome} onChange={(e) => set("nome", e.target.value)} />
                </div>
                <div className="field">
                  <label>Contato (WhatsApp ou e-mail)</label>
                  <input value={form.contato} onChange={(e) => set("contato", e.target.value)} />
                </div>
              </div>

              <div className="field">
                <label>Tipo de peça</label>
                <select value={form.tipoPeca} onChange={(e) => set("tipoPeca", e.target.value)}>
                  {TIPOS.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>

              <div className="field">
                <label>O que você imagina?</label>
                <textarea rows={4} value={form.descricao} onChange={(e) => set("descricao", e.target.value)} placeholder="Madeira, tamanho, gravação, intenção…" />
              </div>

              <div className="form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1.2rem" }}>
                <div className="field">
                  <label>Data preferida</label>
                  <input type="date" min={hoje} value={form.dataPreferida} onChange={(e) => set("dataPreferida", e.target.value)} />
                </div>
                <div className="field">
                  <label>Horário</label>
                  <select value={form.horario} onChange={(e) => set("horario", e.target.value)}>
                    {HORARIOS.map((h) => <option key={h}>{h}</option>)}
                  </select>
                </div>
              </div>

              {erro && <p style={{ color: "var(--brasa)" }}>{erro}</p>}

              <button className="btn" style={{ marginTop: ".6rem" }} onClick={enviar} disabled={enviando}>
                {enviando ? "Enviando…" : "Agendar conversa"}
              </button>
            </>
          )}
        </div>
      </section>
    </>
  );
}
