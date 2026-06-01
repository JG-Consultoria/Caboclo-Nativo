import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { Grain } from "@/components/Grafismos";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Caboclo Nativo · Objetos de Poder",
  description:
    "Cachimbos, kuripes, maracás, abanilhos e tabaco de rezo — feitos à mão, com as mãos e com a reza.",
  openGraph: {
    title: "Caboclo Nativo · Objetos de Poder",
    description: "Objetos de poder feitos à mão.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Marcellus+SC&family=Marcellus&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Amatic+SC:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Grain />
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
