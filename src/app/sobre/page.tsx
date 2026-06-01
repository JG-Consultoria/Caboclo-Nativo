import Link from "next/link";
import Emblema from "@/components/Emblema";
import Icone from "@/components/Icone";
import { Divisor, FaixaLosangos } from "@/components/Grafismos";

export const metadata = { title: "Sobre · Caboclo Nativo" };

export default function SobrePage() {
  return (
    <>
      {/* topo escuro */}
      <section style={{ background: "var(--carvao)", color: "var(--osso)" }}>
        <div className="wrap personalizado-hero" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "2.5rem", alignItems: "center" }}>
          <div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: ".7rem", color: "var(--ocre)", marginBottom: ".6rem" }}>
              <Icone nome="caboclo" variante="linha" size={34} />
              <span className="kicker on-dark" style={{ margin: 0 }}>A história</span>
            </span>
            <h1 className="title" style={{ color: "var(--osso)" }}>Sobre o Caboclo Nativo</h1>
            <p className="lead" style={{ color: "rgba(236,227,208,.82)" }}>
              Uma casa pequena nascida da devoção ao ofício. Cada peça que sai daqui carrega tempo,
              intenção e o respeito pela matéria que veio da floresta.
            </p>
          </div>
          <div className="hero-aside" style={{ display: "flex", justifyContent: "center" }}>
            <Emblema size={190} color="var(--ouro)" />
          </div>
        </div>
      </section>

      {/* conheça o artesão */}
      <section className="wrap">
        <p className="kicker">Conheça o Artesão</p>
        <div
          className="artesao-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "3.5rem", alignItems: "start" }}
        >
          {/* foto placeholder */}
          <div
            style={{
              border: "2px dashed rgba(43,38,32,.2)",
              background: "var(--osso-2)",
              aspectRatio: "3 / 4",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.2rem",
            }}
          >
            <span style={{ color: "var(--ocre)", opacity: .65 }}>
              <Icone nome="caboclo" variante="linha" size={64} />
            </span>
            <span
              style={{
                fontFamily: "var(--lap-sc)",
                fontSize: ".68rem",
                letterSpacing: ".28em",
                textTransform: "uppercase",
                color: "var(--tinta-suave)",
                opacity: .55,
              }}
            >
              Foto em breve
            </span>
          </div>

          {/* texto */}
          <div>
            <h2 className="title" style={{ marginBottom: ".6rem" }}>André</h2>
            <p
              style={{
                fontFamily: "var(--lap-sc)",
                fontSize: ".72rem",
                letterSpacing: ".32em",
                textTransform: "uppercase",
                color: "var(--ocre)",
                marginBottom: "1.8rem",
              }}
            >
              Artesão &amp; fundador
            </p>

            <p className="lead" style={{ color: "var(--tinta-suave)" }}>
              [Texto da biografia em breve — aqui André contará sua história com o artesanato,
              sua relação com a floresta, a espiritualidade que guia o trabalho
              e como cada peça nasce das suas mãos.]
            </p>

            <div style={{ marginTop: "2rem" }}>
              <Divisor className="" />
            </div>

            <p
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: "clamp(1.15rem,2.2vw,1.5rem)",
                lineHeight: 1.55,
                color: "var(--tinta)",
                marginTop: "2rem",
              }}
            >
              [Frase marcante do artesão — algo que capture a essência do trabalho.]
            </p>
          </div>
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
