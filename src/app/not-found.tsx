import Link from "next/link";
import Emblema from "@/components/Emblema";

export default function NotFound() {
  return (
    <section className="wrap narrow" style={{ minHeight: "60vh", textAlign: "center", paddingTop: "5rem" }}>
      <Emblema size={100} color="rgba(156,74,46,.4)" />
      <h1 className="title" style={{ marginTop: "1.4rem" }}>Caminho não encontrado</h1>
      <p className="lead" style={{ margin: "0 auto 2rem" }}>
        A peça que você procura pode ter saído das mãos. Volte ao catálogo.
      </p>
      <Link href="/catalogo" className="btn">Ver o catálogo</Link>
    </section>
  );
}
