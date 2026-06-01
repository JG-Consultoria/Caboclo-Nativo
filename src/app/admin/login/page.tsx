"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Emblema from "@/components/Emblema";

export default function AdminLoginPage() {
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [destino, setDestino] = useState("/admin");
  const router = useRouter();

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setDestino(p.get("from") ?? "/admin");
  }, []);

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    try {
      const r = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senha }),
      });
      if (!r.ok) {
        const d = await r.json();
        setErro(d.erro ?? "Senha incorreta.");
        return;
      }
      router.push(destino);
    } catch {
      setErro("Erro de conexão. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "calc(100vh - var(--header-h))",
        background: "var(--carvao)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 380,
          background: "var(--carvao-2)",
          border: "1px solid rgba(236,227,208,.1)",
          padding: "3rem 2.5rem",
          textAlign: "center",
        }}
      >
        <Emblema size={68} color="var(--ouro)" />

        <h1
          style={{
            fontFamily: "var(--lap)",
            color: "var(--osso)",
            fontSize: "1.6rem",
            margin: "1.4rem 0 .3rem",
            fontWeight: 400,
          }}
        >
          Painel
        </h1>
        <p
          style={{
            fontFamily: "var(--lap-sc)",
            letterSpacing: ".22em",
            textTransform: "uppercase",
            fontSize: ".68rem",
            color: "var(--ocre)",
            marginBottom: "2.4rem",
          }}
        >
          Caboclo Nativo
        </p>

        <form onSubmit={entrar} style={{ textAlign: "left" }}>
          <div className="field">
            <label style={{ color: "var(--ocre)" }}>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoFocus
              placeholder="••••••••"
              style={{
                background: "rgba(236,227,208,.07)",
                borderColor: "rgba(236,227,208,.18)",
                color: "var(--osso)",
              }}
            />
          </div>

          {erro && (
            <p style={{ color: "#e07060", fontSize: ".88rem", marginBottom: "1rem", marginTop: "-.4rem" }}>
              {erro}
            </p>
          )}

          <button
            type="submit"
            className="btn"
            disabled={carregando || !senha}
            style={{ width: "100%", justifyContent: "center" }}
          >
            {carregando ? "Entrando…" : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
