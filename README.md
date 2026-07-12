# Contest Frontend — Blizzard

Entrada de contest: **reimaginar a home oficial da Blizzard** (blizzard.com/pt-br), não cloná-la.

**🔗 Ao vivo:** [henriquecrosio.github.io/Contest-Frontend-Blizzard](https://henriquecrosio.github.io/Contest-Frontend-Blizzard/)

## 💡 O conceito

> A home de uma produtora de mundos deve ser um portal entre universos, não uma vitrine de cards.

- **O teatro** — o hero é um seletor de universos em tela cheia: o vídeo de cada jogo roda como fundo ambiente de cinema, com tipografia monumental condensada. Um trilho lateral numerado funciona como controle remoto (clique, setas ← → do teclado, ou deixe o auto-avanço conduzir).
- **A estante** — os pôsteres verticais dos jogos viram uma estante física com scroll horizontal e filtros por plataforma. Tocar num pôster abre o universo no teatro acima.
- **Escuro por necessidade** — a página é a sala escura que o vídeo exige; o azul Blizzard é o único acento. A arte dos jogos é a fonte de luz.
- **Uma família tipográfica** — Archivo variável: largura 68 em peso 850 para display, largura 100 para corpo. Contraste comprometido em vez de decoração.

## ⚡ Performance e acessibilidade

- Só o vídeo do universo ativo é baixado (crossfade entre duas camadas `<video>`); com `Save-Data` ativo, nenhum vídeo carrega.
- `prefers-reduced-motion`: sem auto-avanço, transições instantâneas, vídeo pausado no primeiro quadro.
- Skip-link, foco visível, `aria-live` no título ativo, navegação por teclado, contraste AA.
- Sem frameworks, sem build: HTML5, CSS3 (OKLCH) e JavaScript vanilla.

## ▶️ Como rodar

Sirva a pasta com qualquer servidor estático (os vídeos precisam de HTTP):

```bash
npx serve .
# ou
python -m http.server 8080
```

## 📝 Aviso Legal

Este é um projeto educacional não comercial, criado para um contest de frontend. Todos os recursos, incluindo imagens e vídeos, pertencem à Blizzard Entertainment, Inc. e foram usados apenas para fins de estudo e demonstração, sem intenção de infringir direitos autorais ou obter ganhos comerciais.
