# Product

## Register

brand

## Users

Jogadores (PT-BR) decidindo, geralmente à noite e em ambiente de pouca luz, qual universo Blizzard jogar. Visitantes de um contest de frontend avaliando ousadia, simplicidade e execução. O trabalho da página: fazer o visitante *sentir* cada jogo em segundos e levá-lo ao Battle.net.

## Product Purpose

Entrada de contest: reimaginar a home oficial da Blizzard (blizzard.com/pt-br). Não é um clone — é uma tese: a home de uma produtora de mundos deve ser um portal entre universos, não uma vitrine de cards. Sucesso = um jurado dizer "por que o site oficial não é assim?".

## Brand Personality

Monumental, cinematográfico, confiante. A página é a sala escura de um cinema: o chrome desaparece, a arte dos jogos é a fonte de luz. Três palavras: forjado, épico, contido.

## Anti-references

- O layout canônico de site de games: carrossel hero + grid de cards idênticos + footer (o próprio blizzard.com).
- Dark-neon gamer genérico: glows azuis, bordas chanfradas, HUD sci-fi.
- Landing page SaaS: eyebrows uppercase por seção, cards com ícone+título+texto, hero-metric.

## Design Principles

1. **A arte é a interface.** Vídeos e pôsteres dos jogos carregam 90% do peso visual; a UI é tipografia e quase nada mais.
2. **Uma interação dominante por dobra.** O hero é um seletor de universos; a estante é um controle remoto do teatro. Nada compete.
3. **Escuro por necessidade, não por estética.** O fundo é a sala escura que o vídeo exige; o azul Blizzard é o único acento.
4. **Peso tipográfico no lugar de decoração.** Ênfase vem de peso/largura da Archivo variável, nunca de gradientes, glows ou bordas.
5. **Performance é design.** 8 vídeos de ~25 MB existem; só o ativo carrega. A página nasce leve e o vídeo entra como revelação.

## Accessibility & Inclusion

Contraste AA (corpo ≥4.5:1 sobre o fundo escuro). `prefers-reduced-motion`: sem auto-avanço, transições instantâneas, vídeos pausados. Navegação por teclado no seletor (setas), foco visível, skip-link, `aria-live` no título do universo ativo. `saveData`: vídeos não carregam.
