import Link from "next/link";
import Emblema from "./Emblema";
import { FaixaLosangos } from "./Grafismos";
import { CATEGORIAS } from "@/lib/products";

export default function Footer() {
  return (
    <footer style={{ background: "var(--carvao)", color: "var(--osso)" }}>
      <div className="wrap" style={{ paddingTop: "4rem", paddingBottom: "3rem" }}>
        <FaixaLosangos className="band" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr 1fr",
            gap: "2.5rem",
            marginTop: "3rem",
          }}
          className="footer-grid"
        >
          <div>
            <Emblema size={64} color="var(--ouro)" />
            <p
              style={{
                fontFamily: "var(--lap-sc)",
                letterSpacing: ".16em",
                textTransform: "uppercase",
                marginTop: "1rem",
                fontSize: "1.1rem",
              }}
            >
              Caboclo Nativo
              <span style={{ display: "block", fontSize: ".58em", letterSpacing: ".24em", opacity: 0.7, marginTop: ".4em" }}>
                Objetos de Poder
              </span>
            </p>
          </div>

          <div>
            <p className="kicker on-dark">Catálogo</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: ".6rem" }}>
              {CATEGORIAS.map((c) => (
                <li key={c.slug}>
                  <Link href={`/catalogo?categoria=${c.slug}`} style={{ color: "rgba(236,227,208,.8)" }}>
                    {c.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="kicker on-dark">A casa</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: ".6rem" }}>
              <li><Link href="/personalizado" style={{ color: "rgba(236,227,208,.8)" }}>Peças personalizadas</Link></li>
              <li><Link href="/sobre" style={{ color: "rgba(236,227,208,.8)" }}>Sobre a casa</Link></li>
              <li><Link href="/carrinho" style={{ color: "rgba(236,227,208,.8)" }}>Carrinho</Link></li>
              <li>
                <a
                  href="https://www.instagram.com/caboclo_nativo"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "rgba(236,227,208,.8)" }}
                >
                  @caboclo_nativo
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p
          style={{
            fontFamily: "var(--mao)",
            fontWeight: 700,
            fontSize: "1.8rem",
            color: "var(--ocre)",
            marginTop: "3rem",
            letterSpacing: ".04em",
          }}
        >
          Com as mãos e com a reza.
        </p>
        <p
          style={{
            fontFamily: "var(--lap-sc)",
            letterSpacing: ".32em",
            fontSize: ".62rem",
            textTransform: "uppercase",
            color: "rgba(236,227,208,.45)",
            marginTop: ".6rem",
          }}
        >
          Caboclo Nativo · Objetos de Poder · Feito à mão
        </p>
      </div>
    </footer>
  );
}
