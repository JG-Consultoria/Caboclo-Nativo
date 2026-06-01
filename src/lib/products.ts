import type { Categoria, Produto } from "./types";

/* ============================================================
   Dados de exemplo (seed).
   Substituir por chamadas ao back-end / banco quando integrar.
   Os nomes de categoria e produtos seguem o Instagram da marca.
   ============================================================ */

export const CATEGORIAS: Categoria[] = [
  {
    slug: "cachimbos",
    nome: "Cachimbos",
    descricao: "O objeto de poder por excelência. Cachimbos cerimoniais entalhados à mão.",
    icone: "cachimbo",
  },
  {
    slug: "kuripes",
    nome: "Kuripes",
    descricao: "Para a aplicação em si mesmo. O instrumento da reza pessoal.",
    icone: "perereca",
  },
  {
    slug: "tipis",
    nome: "Tipís",
    descricao: "Para aplicar no outro — a reza partilhada, a dois.",
    icone: "jiboia",
  },
  {
    slug: "maracas-apitos",
    nome: "Maracás & Apitos",
    descricao: "A voz do ritmo e do chamado. Som que conduz a roda.",
    icone: "cesto",
  },
  {
    slug: "abanilhos",
    nome: "Abanilhos",
    descricao: "O sopro que move a fumaça e abençoa o espaço.",
    icone: "abanico",
  },
  {
    slug: "rape-tabaco",
    nome: "Rapé & Tabaco de Rezo",
    descricao: "Rapé, kumbaia e tabaco de rezo — preparados em lote pequeno.",
    icone: "oca",
  },
  {
    slug: "exclusivas",
    nome: "Peças Exclusivas",
    descricao: "Animais de poder e conjuntos cerimoniais. Únicas, de colecionador.",
    icone: "pantera",
  },
];

function ficha(material: string, dimensoes: string, origem = "Feito à mão · lote pequeno") {
  return [
    { rotulo: "Material", valor: material },
    { rotulo: "Dimensões", valor: dimensoes },
    { rotulo: "Origem", valor: origem },
  ];
}

export const PRODUTOS: Produto[] = [
  {
    id: "p001",
    slug: "cachimbo-cumaru",
    nome: "Cachimbo Cumaru",
    categoria: "cachimbos",
    precoCentavos: 38000,
    resumo: "Cachimbo cerimonial em cumaru, entalhe sóbrio e fornilho aberto.",
    descricao:
      "Talhado em uma só peça de cumaru, madeira densa e perfumada. O fornilho aberto e o canudo longo foram pensados para o tempo lento da reza. Cada veio da madeira é único — a peça que chega até você não se repete.",
    ficha: ficha("Cumaru maciço", "22 cm · 140 g"),
    estoque: 3,
    pecaUnica: true,
  },
  {
    id: "p002",
    slug: "cachimbo-jatoba-gravado",
    nome: "Cachimbo Jatobá Gravado",
    categoria: "cachimbos",
    precoCentavos: 52000,
    resumo: "Jatobá com selo gravado a fogo e grafismo de losangos.",
    descricao:
      "Em jatobá, com o selo da casa gravado a fogo no corpo e uma fileira de losangos — a terra — acompanhando o canudo. Uma peça de presença, para quem conduz roda.",
    ficha: ficha("Jatobá maciço", "26 cm · 180 g"),
    estoque: 1,
    pecaUnica: true,
  },
  {
    id: "p003",
    slug: "kuripe-osso-semente",
    nome: "Kuripe Osso & Semente",
    categoria: "kuripes",
    precoCentavos: 12000,
    resumo: "Kuripe leve, união em V de osso e semente de jarina.",
    descricao:
      "Kuripe de uso pessoal, com ângulo confortável e acabamento macio. A jarina (marfim vegetal) traz o tom de osso da marca. Acompanha saquinho de pano.",
    ficha: ficha("Jarina e osso", "7 cm"),
    estoque: 8,
    pecaUnica: false,
  },
  {
    id: "p004",
    slug: "tipi-bambu-trancado",
    nome: "Tipí de Bambu Trançado",
    categoria: "tipis",
    precoCentavos: 9000,
    resumo: "Tipí para aplicação no outro, com amarração em algodão cru.",
    descricao:
      "Bambu selecionado e curado, com amarração em algodão cru tingido com barro. Comprimento generoso para a aplicação a dois.",
    ficha: ficha("Bambu e algodão", "16 cm"),
    estoque: 6,
    pecaUnica: false,
  },
  {
    id: "p005",
    slug: "maraca-cabaca-sementes",
    nome: "Maracá de Cabaça",
    categoria: "maracas-apitos",
    precoCentavos: 24000,
    resumo: "Cabaça curada com sementes nativas e cabo em madeira.",
    descricao:
      "Cabaça curada ao sol, preenchida com sementes nativas que dão um chocalho seco e redondo. Cabo de madeira lixado à mão. A pintura segue a paleta de barro e ocre.",
    ficha: ficha("Cabaça, sementes, madeira", "28 cm"),
    estoque: 4,
    pecaUnica: true,
  },
  {
    id: "p006",
    slug: "apito-madeira-passaro",
    nome: "Apito Pássaro",
    categoria: "maracas-apitos",
    precoCentavos: 7000,
    resumo: "Apito entalhado, canto agudo para abrir caminho.",
    descricao:
      "Pequeno apito entalhado à mão, com som agudo e limpo usado para abrir caminho e chamar a roda. Cabe na palma da mão.",
    ficha: ficha("Madeira nativa", "6 cm"),
    estoque: 10,
    pecaUnica: false,
  },
  {
    id: "p007",
    slug: "abanilho-penas-arara",
    nome: "Abanilho de Penas",
    categoria: "abanilhos",
    precoCentavos: 16000,
    resumo: "Abanilho com penas naturais e cabo trançado.",
    descricao:
      "Abanilho para mover a fumaça e abençoar o espaço. Penas naturais coletadas de forma responsável, cabo trançado em algodão e barro.",
    ficha: ficha("Penas naturais e algodão", "32 cm"),
    estoque: 5,
    pecaUnica: true,
  },
  {
    id: "p008",
    slug: "rape-de-rezo",
    nome: "Rapé de Rezo",
    categoria: "rape-tabaco",
    precoCentavos: 6000,
    resumo: "Rapé preparado em lote pequeno, tabaco de rezo e cinzas.",
    descricao:
      "Preparado em lote pequeno, com tabaco de rezo e cinzas de árvores selecionadas. Entregue em pote com etiqueta da casa. Produto de uso cerimonial.",
    ficha: ficha("Tabaco de rezo e cinzas", "10 g"),
    estoque: 12,
    pecaUnica: false,
  },
  {
    id: "p009",
    slug: "kumbaia-defumacao",
    nome: "Kumbaia para Defumação",
    categoria: "rape-tabaco",
    precoCentavos: 4500,
    resumo: "Kumbaia em corda, para defumação e limpeza do ambiente.",
    descricao:
      "Kumbaia trançada em corda, queima lenta e perfumada para defumação e limpeza de ambientes. Embalada em papel kraft com selo.",
    ficha: ficha("Ervas e resinas", "12 cm"),
    estoque: 9,
    pecaUnica: false,
  },
  {
    id: "p010",
    slug: "cachimbo-onca-pintada",
    nome: "Cachimbo Onça Pintada",
    categoria: "exclusivas",
    precoCentavos: 98000,
    resumo: "Peça de colecionador: fornilho entalhado com a onça, animal de poder.",
    descricao:
      "Uma peça de presença rara. O fornilho traz a onça pintada entalhada em alto relevo — o animal de poder da floresta — e o corpo recebe grafismos a fogo. Madeira nobre de demolição, curada por anos. Acompanha estojo de couro e certificado da casa. Única, não se repete.",
    ficha: ficha("Madeira nobre de demolição", "28 cm · 210 g", "Peça única de colecionador"),
    estoque: 1,
    pecaUnica: true,
  },
  {
    id: "p011",
    slug: "conjunto-cerimonial-roda",
    nome: "Conjunto Cerimonial da Roda",
    categoria: "exclusivas",
    precoCentavos: 132000,
    resumo: "Kit completo para conduzir a roda: cachimbo, kuripe, tipí e rapé.",
    descricao:
      "Reúne em um só estojo as peças que conduzem uma roda inteira: um cachimbo cerimonial, um kuripe, um tipí e um pote de rapé de rezo, todos da mesma safra de madeira e com o mesmo grafismo. Pensado para quem conduz cerimônias. Edição limitada, montado sob pedido.",
    ficha: ficha("Madeiras nobres, jarina, bambu", "Estojo 34 cm", "Edição limitada · montado sob pedido"),
    estoque: 2,
    pecaUnica: true,
  },
];

/* -------------------- helpers de leitura -------------------- */

export function listarProdutos(categoria?: string): Produto[] {
  if (!categoria || categoria === "todos") return PRODUTOS;
  return PRODUTOS.filter((p) => p.categoria === categoria);
}

export function buscarProdutoPorSlug(slug: string): Produto | undefined {
  return PRODUTOS.find((p) => p.slug === slug);
}

export function nomeCategoria(slug: string): string {
  return CATEGORIAS.find((c) => c.slug === slug)?.nome ?? slug;
}

export function iconeCategoria(slug: string) {
  return CATEGORIAS.find((c) => c.slug === slug)?.icone ?? "caboclo";
}

export function formatarPreco(centavos: number): string {
  return (centavos / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
