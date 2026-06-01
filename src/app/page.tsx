import Link from "next/link";
import Emblema from "@/components/Emblema";
import Icone from "@/components/Icone";
import { Divisor, FaixaLosangos } from "@/components/Grafismos";

export const metadata = { title: "Caboclo Nativo · Objetos de Poder" };

const VALORES = [
  {
    icone: "cachimbo" as const,
    t: "Feito à mão",
    d: "Nenhuma peça é igual a outra. Cada uma carrega o tempo lento das mãos e a marca da madeira.",
  },
  {
    icone: "oca" as const,
    t: "Com a reza",
    d: "Antes de virar objeto, a matéria é trabalhada com intenção. O que sai daqui carrega cuidado.",
  },
  {
    icone: "jiboia" as const,
    t: "Da floresta",
    d: "Madeiras, sementes e fibras de origem responsável — o respeito pela mata é parte do ofício.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* topo escuro com a logo oficial */}
      <section style={{ background: "var(--carvao)", color: "var(--osso)" }}>
        <div className="wrap personalizado-hero" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "2.5rem", alignItems: "center" }}>
          <div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: ".7rem", color: "var(--ocre)", marginBottom: ".6rem" }}>
              <Icone nome="caboclo" variante="linha" size={34} />
              <span className="kicker on-dark" style={{ margin: 0 }}>A casa</span>
            </span>
            <h1 className="title" style={{ color: "var(--osso)" }}>Caboclo Nativo</h1>
            <p className="lead" style={{ color: "rgba(236,227,208,.82)" }}>
              Objetos de poder feitos à mão, com as mãos e com a reza. Uma casa pequena, de produção
              cuidadosa, dedicada a cachimbos, kuripes, tipís, maracás, abanilhos e tabaco de rezo.
            </p>
          </div>
          <div className="hero-aside" style={{ display: "flex", justifyContent: "center" }}>
            <Emblema size={190} color="var(--ouro)" />
          </div>
        </div>
      </section>

      {/* manifesto */}
      <section className="wrap narrow">
        <p className="kicker">O que nos move</p>
        <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "clamp(1.4rem,3vw,2rem)", lineHeight: 1.5, color: "var(--tinta)" }}>
          Não fabricamos objetos — <b style={{ fontStyle: "normal", fontFamily: "var(--lap)", color: "var(--brasa)" }}>despertamos a memória</b> que dorme
          na madeira, na semente e na fumaça. Cada peça é uma ponte entre quem reza e o que é rezado.
        </p>
        <Divisor className="" />
      </section>

      {/* valores */}
      <section className="wrap" style={{ paddingTop: 0 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: "1.4rem" }}>
          {VALORES.map((v) => (
            <div key={v.t} className="surface" style={{ padding: "1.8rem 1.6rem" }}>
              <span style={{ color: "var(--barro)" }}>
                <Icone nome={v.icone} variante="selo" size={56} />
              </span>
              <h3 style={{ fontFamily: "var(--lap)", fontSize: "1.4rem", color: "var(--carvao)", marginTop: ".6rem" }}>{v.t}</h3>
              <p style={{ fontSize: ".95rem", color: "var(--tinta-suave)", margin: ".4rem 0 0", lineHeight: 1.5 }}>{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* chamada */}
      <section className="wrap" style={{ paddingTop: 0 }}>
        <div className="surface" style={{ background: "var(--barro)", color: "var(--osso)", border: "none", padding: "3rem", textAlign: "center" }}>
          <h2 className="title" style={{ color: "var(--osso)" }}>Quer conhecer as peças?</h2>
          <p style={{ fontSize: "1.1rem", color: "rgba(236,227,208,.86)", maxWidth: "52ch", margin: "0 auto 1.6rem" }}>
            Explore o catálogo ou agende uma conversa para uma peça feita só para você.
          </p>
          <div style={{ display: "flex", gap: ".8rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/catalogo" className="btn" style={{ background: "var(--carvao)", borderColor: "var(--carvao)" }}>Ver o catálogo</Link>
            <Link href="/personalizado" className="btn ghost on-dark">Peça personalizada</Link>
          </div>
        </div>
        <div style={{ marginTop: "3rem", color: "var(--ocre)" }}>
          <FaixaLosangos className="band" />
        </div>
      </section>
    </>
  );
}
