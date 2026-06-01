# Caboclo Nativo — Ícones (SVG)

8 ícones de categoria no padrão da marca: linha gravada dentro de um selo circular.

## Pastas
- **selo/** — ícone DENTRO do círculo de proteção (uso principal: destaques, categorias, avatares, cards).
- **linha/** — só o desenho, SEM o anel (uso em menus/nav, ao lado de texto).

## Arquivos
`cachimbo` · `perereca` · `jiboia` · `abanico` · `cesto` · `pantera` · `oca` · `caboclo`

| Ícone     | Categoria do portfólio          |
|-----------|---------------------------------|
| cachimbo  | Cachimbos xamânicos             |
| perereca  | Kuripes · cura do Kambo         |
| jiboia    | Tipís personalizados            |
| abanico   | Abanilhos xamânicos             |
| cesto     | Maracás e apitos                |
| pantera   | Peças exclusivas                |
| oca       | Rapé · tabaco de rezo           |
| caboclo   | A marca · sobre nós             |

## Como usar no site

### 1. Como imagem (mais simples)
```html
<img src="icones/selo/cachimbo.svg" alt="Cachimbos" width="64" height="64">
```
Já vem na cor barro (#9C4A2E). Bom para destaques e cards.

### 2. Inline, recolorível por CSS (recomendado para nav e ícones que mudam de cor)
Abra o arquivo `.svg`, copie a tag `<svg>...</svg>` inteira e cole no HTML.
Os traços usam `currentColor`, então herdam o `color` do elemento pai:

```html
<a class="nav-link" style="color:#D9A95B">
  <!-- cole aqui o conteúdo de linha/cachimbo.svg -->
  Cachimbos
</a>
```

Regra de cor por fundo:
- Fundo **escuro** → `color:#D9A95B` (ouro)
- Fundo **claro** → `color:#9C4A2E` (barro) ou `#241F1B` (carvão)

> Dica: ao colar inline, dê `width`/`height` no `<svg>` ou via CSS (ex.: `.nav-link svg{width:28px;height:28px}`).

## Paleta da marca
barro #9C4A2E · ocre #BC8A3C · ouro #D9A95B · carvão #241F1B · osso #ECE3D0

Mantenha sempre contraste alto entre o ícone e o fundo. Não gire, distorça nem
adicione sombra aos ícones — eles são planos e gravados, como carimbo.
