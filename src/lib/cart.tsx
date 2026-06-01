"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ItemCarrinho, Produto } from "./types";

interface CartContextValue {
  itens: ItemCarrinho[];
  totalCentavos: number;
  totalItens: number;
  adicionar: (produto: Produto, quantidade?: number) => void;
  remover: (produtoId: string) => void;
  alterarQtd: (produtoId: string, quantidade: number) => void;
  limpar: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "caboclo-nativo:carrinho";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const [hidratado, setHidratado] = useState(false);

  // hidrata do localStorage no cliente
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItens(JSON.parse(raw));
    } catch {
      /* ignora */
    }
    setHidratado(true);
  }, []);

  // persiste
  useEffect(() => {
    if (!hidratado) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(itens));
    } catch {
      /* ignora */
    }
  }, [itens, hidratado]);

  function adicionar(produto: Produto, quantidade = 1) {
    setItens((atual) => {
      const existente = atual.find((i) => i.produtoId === produto.id);
      if (existente) {
        return atual.map((i) =>
          i.produtoId === produto.id
            ? { ...i, quantidade: Math.min(i.quantidade + quantidade, produto.estoque) }
            : i
        );
      }
      return [
        ...atual,
        {
          produtoId: produto.id,
          slug: produto.slug,
          nome: produto.nome,
          precoCentavos: produto.precoCentavos,
          quantidade: Math.min(quantidade, produto.estoque),
          imagem: produto.imagem,
        },
      ];
    });
  }

  function remover(produtoId: string) {
    setItens((atual) => atual.filter((i) => i.produtoId !== produtoId));
  }

  function alterarQtd(produtoId: string, quantidade: number) {
    setItens((atual) =>
      atual
        .map((i) => (i.produtoId === produtoId ? { ...i, quantidade } : i))
        .filter((i) => i.quantidade > 0)
    );
  }

  function limpar() {
    setItens([]);
  }

  const totalCentavos = useMemo(
    () => itens.reduce((s, i) => s + i.precoCentavos * i.quantidade, 0),
    [itens]
  );
  const totalItens = useMemo(() => itens.reduce((s, i) => s + i.quantidade, 0), [itens]);

  const value: CartContextValue = {
    itens,
    totalCentavos,
    totalItens,
    adicionar,
    remover,
    alterarQtd,
    limpar,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart precisa estar dentro de <CartProvider>");
  return ctx;
}
