/* ============================================================
   Tipos de domínio — contrato único entre front e back.
   Quando o back-end real entrar, ele só precisa devolver
   estes mesmos formatos.
   ============================================================ */

export type CategoriaSlug =
  | "cachimbos"
  | "kuripes"
  | "tipis"
  | "maracas-apitos"
  | "abanilhos"
  | "rape-tabaco"
  | "exclusivas";

export type IconeNome =
  | "caboclo"
  | "cachimbo"
  | "perereca"
  | "jiboia"
  | "abanico"
  | "cesto"
  | "pantera"
  | "oca";

export interface Categoria {
  slug: CategoriaSlug;
  nome: string;
  descricao: string;
  /** motivo da marca associado à categoria */
  icone: IconeNome;
}

export interface Produto {
  id: string;
  slug: string;
  nome: string;
  categoria: CategoriaSlug;
  /** preço em centavos, para evitar erro de ponto flutuante */
  precoCentavos: number;
  resumo: string;
  descricao: string;
  /** material, dimensões, origem — pares chave/valor */
  ficha: { rotulo: string; valor: string }[];
  /** quantidade disponível; controlada pelo back de estoque */
  estoque: number;
  /** peça única feita à mão? */
  pecaUnica: boolean;
  /** caminho/URL da imagem (placeholder enquanto não há foto real) */
  imagem?: string;
}

export interface ItemCarrinho {
  produtoId: string;
  slug: string;
  nome: string;
  precoCentavos: number;
  quantidade: number;
  imagem?: string;
}

export interface OpcaoFrete {
  id: string;
  transportadora: string;
  servico: string;
  precoCentavos: number;
  prazoDias: number;
}

export interface Agendamento {
  id?: string;
  nome: string;
  contato: string;
  tipoPeca: string;
  descricao: string;
  /** ISO date escolhida para a conversa/criação */
  dataPreferida: string;
  horario: string;
}

export type FormaPagamento = "pix" | "cartao";

export interface PreferenciaPagamento {
  /** id da preferência no Mercado Pago */
  preferenceId: string;
  /** URL para redirecionar (checkout pro) ou dados do Pix */
  initPoint?: string;
  /** QR Code em base64 (fluxo Pix) */
  pixQrCodeBase64?: string;
  pixCopiaECola?: string;
  /** modo demonstração */
  demo?: boolean;
}
