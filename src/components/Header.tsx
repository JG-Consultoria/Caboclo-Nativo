"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Emblema from "./Emblema";
import { useCart } from "@/lib/cart";

const LINKS = [
  { href: "/", label: "Início" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/personalizado", label: "Personalizados" },
  { href: "/sobre", label: "Sobre" },
];

function CartIcon({ count }: { count: number }) {
  return (
    <Link href="/carrinho" aria-label="Carrinho" className="cn-cart">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M3 4h2l2.4 12.4a1 1 0 0 0 1 .8h8.7a1 1 0 0 0 1-.8L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="20" r="1.3" fill="currentColor" />
        <circle cx="18" cy="20" r="1.3" fill="currentColor" />
      </svg>
      <span className="cn-cart-count" data-has={count > 0}>{count || ""}</span>
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const { totalItens } = useCart();
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    setAberto(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [aberto]);

  return (
    <header className="cn-header">
      <div className="wrap cn-header-bar">
        <Link href="/" className="cn-brand" onClick={() => setAberto(false)}>
          <Emblema size={38} color="var(--barro)" />
          <span className="cn-wordmark">Caboclo Nativo</span>
        </Link>

        <nav className="cn-nav-desktop">
          {LINKS.map((l) => {
            const ativo = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link key={l.href} href={l.href} className="cn-link" data-ativo={ativo}>
                {l.label}
              </Link>
            );
          })}
          <CartIcon count={totalItens} />
        </nav>

        <div className="cn-mobile-actions">
          <CartIcon count={totalItens} />
          <button
            className="cn-burger"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={aberto}
            onClick={() => setAberto((v) => !v)}
          >
            <span data-aberto={aberto} />
            <span data-aberto={aberto} />
            <span data-aberto={aberto} />
          </button>
        </div>
      </div>

      <div className="cn-mobile-panel" data-aberto={aberto}>
        <nav>
          {LINKS.map((l) => {
            const ativo = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link key={l.href} href={l.href} className="cn-mobile-link" data-ativo={ativo}>
                {l.label}
              </Link>
            );
          })}
          <Link href="/carrinho" className="cn-mobile-link">
            Carrinho {totalItens ? `(${totalItens})` : ""}
          </Link>
        </nav>
      </div>
    </header>
  );
}
