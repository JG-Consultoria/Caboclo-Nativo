# Caboclo Nativo · Objetos de Poder

Loja artesanal — front-end completo em **Next.js (App Router) + TypeScript**, fiel ao manual de marca (cores de barro/ocre/carvão/osso, fontes Marcellus / EB Garamond / Amatic SC, o emblema do cachimbo e o grão de papel).

Todas as telas estão navegáveis com **dados de exemplo** e rodando em **modo demo** — nenhuma chave é necessária para ver tudo funcionando. As integrações reais (Mercado Pago, frete, banco) já estão isoladas em adaptadores; basta preencher o `.env.local` e descomentar os blocos marcados.

---

## Como rodar

```bash
npm install
npm run dev
# abre em http://localhost:3000
```

Para build de produção:

```bash
npm run build && npm start
```

---

## Telas

| Rota | O que é |
|------|---------|
| `/` | Apresentação: hero, manifesto, categorias, peças em destaque, chamada para personalizados. |
| `/catalogo` | Catálogo com filtro por categoria (`?categoria=cachimbos`). |
| `/produto/[slug]` | Página da peça, ficha técnica e "adicionar ao carrinho". |
| `/personalizado` | Produtos sob encomenda + **agendamento** de conversa. |
| `/carrinho` | Carrinho (persiste no navegador). |
| `/checkout` | Dados, **cálculo de frete** e **pagamento** Pix/cartão. |
| `/checkout/sucesso` | Confirmação — Pix copia-e-cola ou aviso de cartão. |
| `/admin` | Painel da casa: **métricas financeiras** + **controle de estoque**. |

---

## Estrutura

```
src/
  app/
    layout.tsx            fontes, grão, header, footer, carrinho global
    page.tsx              apresentação (home)
    catalogo/             catálogo por categoria
    produto/[slug]/       página de produto
    personalizado/        encomenda + agendamento
    carrinho/  checkout/  fluxo de venda
    admin/                métricas + estoque
    api/                  back-end (rotas)
      produtos/  metricas/  estoque/
      frete/  pagamento/  pagamento/webhook/  agendamento/
  components/             Emblema, Header, Footer, ProductCard, AddToCart, Grafismos
  lib/
    types.ts              contrato de dados (front ↔ back)
    products.ts           catálogo de exemplo + helpers
    cart.tsx              carrinho (Context + localStorage)
    mercadopago.ts        adaptador de pagamento (Pix/cartão)
    frete.ts              adaptador de frete
```

---

## Ligando o back-end de verdade

Tudo que toca serviço externo está concentrado em poucos arquivos. O modo demo é controlado por `NEXT_PUBLIC_DEMO_MODE` (deixe `true` enquanto integra).

### 1. Pagamento — Mercado Pago (Pix + cartão)
- Arquivo: `src/lib/mercadopago.ts` e `src/app/api/pagamento/`.
- Crie a aplicação no [painel do Mercado Pago](https://www.mercadopago.com.br/developers/panel/app) e preencha `MP_ACCESS_TOKEN` e `NEXT_PUBLIC_MP_PUBLIC_KEY`.
- Instale o SDK: `npm i mercadopago`.
- Descomente o bloco "Integração real" em `mercadopago.ts`.
- O fechamento automático da venda acontece em `api/pagamento/webhook/route.ts` (confirma pagamento → baixa estoque → gera etiqueta de envio).

### 2. Frete — Melhor Envio (Correios, Jadlog etc.)
- Arquivo: `src/lib/frete.ts`.
- Preencha `MELHOR_ENVIO_TOKEN` e `ORIGEM_CEP`, descomente o bloco real e ajuste peso/dimensões por produto.

### 3. Estoque automático
- Hoje os dados vêm de `src/lib/products.ts`. Troque os helpers (`listarProdutos`, `buscarProdutoPorSlug`) por consultas ao banco.
- A baixa automática acontece no webhook de pagamento (passo 1).
- `PATCH /api/estoque` já existe para ajuste manual no painel.

### 4. Agendamento
- Arquivo: `src/app/api/agendamento/route.ts`.
- Plugue criação de evento (ex.: Google Calendar) e notificação (e-mail/WhatsApp).

### 5. Banco de dados
- Defina `DATABASE_URL`. Sugestão: Prisma + Postgres. Os tipos em `src/lib/types.ts` já servem de modelo.

### 6. Métricas
- `src/app/api/metricas/route.ts` devolve números de exemplo. Em produção, agregue pedidos do banco e o status de pagamento do Mercado Pago.

---

## Notas de marca

- Cores e fontes vivem como variáveis CSS em `src/app/globals.css` (tokens do manual).
- O emblema é SVG inline em `src/components/Emblema.tsx` — a cor vem de `color` (ouro em fundo escuro, barro/carvão em fundo claro).
- Os espaços de imagem mostram o emblema como placeholder; troque por fotos reais das peças (campo `imagem` em cada produto).

*Caboclo Nativo · Objetos de Poder — feito à mão, com as mãos e com a reza.*
