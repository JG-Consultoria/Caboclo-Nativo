"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Produto } from "@/lib/types";
import { useCart } from "@/lib/cart";

export default function AddToCart({ produto }: { produto: Produto }) {
  const { adicionar } = useCart();
  const router = useRouter();
  const [qtd, setQtd] = useState(1);
  const [add, setAdd] = useState(false);
  const esgotado = produto.estoque <= 0;

  function handleAdd(irParaCarrinho = false) {
    adicionar(produto, qtd);
    setAdd(true);
    if (irParaCarrinho) router.push("/carrinho");
    else setTimeout(() => setAdd(false), 1800);
  }

  if (esgotado) {
    return (
      <p style={{ fontFamily: "var(--lap-sc)", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--brasa)" }}>
        Peça esgotada — fale conosco para encomendar
      </p>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ fontFamily: "var(--lap-sc)", letterSpacing: ".18em", textTransform: "uppercase", fontSize: ".68rem", color: "var(--barro)" }}>
          Quantidade
        </span>
        <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(43,38,32,.22)" }}>
          <button
            onClick={() => setQtd((q) => Math.max(1, q - 1))}
            aria-label="Diminuir"
            style={qtdBtn}
          >
            −
          </button>
          <span style={{ minWidth: 44, textAlign: "center", fontFamily: "var(--lap)" }}>{qtd}</span>
          <button
            onClick={() => setQtd((q) => Math.min(produto.estoque, q + 1))}
            aria-label="Aumentar"
            style={qtdBtn}
          >
            +
          </button>
        </div>
        <span style={{ fontSize: ".85rem", color: "var(--tinta-suave)" }}>
          {produto.estoque} em estoque
        </span>
      </div>

      <div style={{ display: "flex", gap: ".8rem", flexWrap: "wrap" }}>
        <button className="btn" onClick={() => handleAdd(false)}>
          {add ? "Adicionado ✓" : "Adicionar ao carrinho"}
        </button>
        <button className="btn ghost" onClick={() => handleAdd(true)}>
          Comprar agora
        </button>
      </div>
    </div>
  );
}

const qtdBtn: React.CSSProperties = {
  width: 38,
  height: 38,
  background: "transparent",
  border: "none",
  cursor: "pointer",
  fontSize: "1.2rem",
  color: "var(--barro)",
  fontFamily: "var(--lap)",
};
