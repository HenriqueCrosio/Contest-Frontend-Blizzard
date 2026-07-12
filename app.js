/* Contest Frontend — Blizzard reimaginada
   O hero é um teatro: um vídeo ativo por vez, crossfade entre duas camadas,
   trilho lateral como controle remoto. Nada além do vídeo ativo é baixado. */

document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
    const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const SAVE_DATA = navigator.connection && navigator.connection.saveData;
    const SLIDE_MS = 9000;

    const GAMES = [
        { franchise: 'Diablo', title: 'Diablo IV', genre: 'RPG de Ação', video: 'videos/card_1.mp4', platforms: ['battlenet', 'xbox', 'playstation', 'steam'] },
        { franchise: 'World of Warcraft', title: 'The War Within', genre: 'MMORPG', video: 'videos/card_2.mp4', platforms: ['battlenet'] },
        { franchise: 'World of Warcraft', title: 'Cataclysm Classic', genre: 'MMORPG', video: 'videos/card_3.mp4', platforms: ['battlenet'] },
        { franchise: 'Warcraft', title: 'Warcraft Rumble', genre: 'Estratégia de Ação', video: 'videos/card_4.mp4', platforms: ['apple', 'android'] },
        { franchise: 'Overwatch', title: 'Overwatch 2', genre: 'Ação em Equipe', video: 'videos/card_5.mp4', platforms: ['battlenet', 'xbox', 'playstation', 'steam', 'switch'] },
        { franchise: 'Hearthstone', title: 'Hearthstone', genre: 'Cards Estratégico', video: 'videos/card_6.mp4', platforms: ['apple', 'android', 'battlenet'] },
        { franchise: 'Warcraft III', title: 'Reforged', genre: 'Estratégia em Tempo Real', video: 'videos/card_7.mp4', platforms: ['battlenet'] },
        { franchise: 'Heroes of the Storm', title: 'Heroes of the Storm', genre: 'MOBA', video: 'videos/card_8.mp4', platforms: ['battlenet'] }
    ];

    const PLATFORM_LABELS = {
        battlenet: 'Battle.net', xbox: 'Xbox', playstation: 'PlayStation',
        steam: 'Steam', switch: 'Nintendo Switch', apple: 'Apple', android: 'Android'
    };

    // ----- Topbar -----
    const topbar = document.querySelector('[data-topbar]');
    const onScroll = () => topbar.classList.toggle('is-scrolled', window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const menuToggle = document.querySelector('[data-menu-toggle]');
    const menu = document.getElementById('menu-principal');
    menuToggle.addEventListener('click', () => {
        const open = menu.classList.toggle('is-open');
        menuToggle.setAttribute('aria-expanded', String(open));
        menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    menu.addEventListener('click', e => {
        if (e.target.closest('a')) {
            menu.classList.remove('is-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // ----- Teatro de universos -----
    const hero = document.querySelector('[data-universe]');
    const layers = hero.querySelectorAll('[data-layer]');
    const rail = hero.querySelector('[data-rail]');
    const elTitle = hero.querySelector('[data-hero-title]');
    const elFranchise = hero.querySelector('[data-hero-franchise]');
    const elGenre = hero.querySelector('[data-hero-genre]');
    const elPlatforms = hero.querySelector('[data-hero-platforms]');
    const elIndex = hero.querySelector('[data-hero-index]');

    let current = -1;
    let activeLayer = 0;
    let timer = null;

    GAMES.forEach((game, i) => {
        const item = document.createElement('button');
        item.className = 'rail-item';
        item.innerHTML =
            '<span class="rail-num">' + String(i + 1).padStart(2, '0') + '</span>' +
            '<span class="rail-name">' + game.title + '</span>' +
            '<i class="rail-progress" aria-hidden="true"></i>';
        item.addEventListener('click', () => select(i, { user: true }));
        rail.appendChild(item);
    });
    const railItems = rail.querySelectorAll('.rail-item');

    function renderTitle(text) {
        elTitle.textContent = '';
        text.split(' ').forEach((word, i, arr) => {
            const outer = document.createElement('span');
            outer.className = 'word';
            const inner = document.createElement('span');
            inner.textContent = word;
            inner.style.animationDelay = (i * 70) + 'ms';
            outer.appendChild(inner);
            elTitle.appendChild(outer);
            if (i < arr.length - 1) elTitle.appendChild(document.createTextNode(' '));
        });
    }

    function showVideo(src) {
        if (SAVE_DATA) return;
        const next = layers[1 - activeLayer];
        const prev = layers[activeLayer];
        next.src = src;
        next.preload = 'auto';
        next.load();
        const onReady = () => {
            next.removeEventListener('canplay', onReady);
            if (REDUCED) {
                next.currentTime = 0.1; // primeiro quadro como imagem estática
            } else {
                next.play().catch(() => {});
            }
            next.classList.add('is-active');
            prev.classList.remove('is-active');
            setTimeout(() => { prev.pause(); prev.removeAttribute('src'); prev.load(); }, 1000);
        };
        next.addEventListener('canplay', onReady);
        activeLayer = 1 - activeLayer;
    }

    function select(i, opts = {}) {
        if (i === current) return;
        current = i;
        const game = GAMES[i];

        renderTitle(game.title);
        elFranchise.textContent = game.franchise;
        elGenre.textContent = game.genre;
        elIndex.textContent = String(i + 1).padStart(2, '0');
        elPlatforms.innerHTML = game.platforms.map(p =>
            '<img src="images/' + p + '.png" alt="' + PLATFORM_LABELS[p] + '" title="' + PLATFORM_LABELS[p] + '">'
        ).join('');

        railItems.forEach((item, j) => {
            item.classList.toggle('is-active', j === i);
            item.classList.remove('is-counting');
            item.setAttribute('aria-current', j === i ? 'true' : 'false');
        });

        showVideo(game.video);
        scheduleNext(opts.user ? railItems[i] : null);
    }

    function scheduleNext(clickedItem) {
        clearTimeout(timer);
        if (REDUCED || SAVE_DATA) return; // sem auto-avanço
        // reinicia a barrinha de progresso do item ativo
        const active = railItems[current];
        void active.offsetWidth; // reflow para reiniciar a animação CSS
        active.classList.add('is-counting');
        timer = setTimeout(() => select((current + 1) % GAMES.length), SLIDE_MS);
        if (clickedItem) clickedItem.blur();
    }

    // Pausa o teatro quando a aba fica oculta
    document.addEventListener('visibilitychange', () => {
        const video = layers[activeLayer];
        if (document.hidden) {
            clearTimeout(timer);
            video.pause();
        } else {
            if (!REDUCED && video.src) video.play().catch(() => {});
            scheduleNext();
        }
    });

    // Teclado: ← → trocam de universo (fora de campos de texto)
    document.addEventListener('keydown', e => {
        if (e.target.matches('input, textarea, select')) return;
        if (e.key === 'ArrowRight') select((current + 1) % GAMES.length, { user: true });
        if (e.key === 'ArrowLeft') select((current - 1 + GAMES.length) % GAMES.length, { user: true });
    });

    select(0);

    // ----- Estante: filtros + controle remoto -----
    const posters = document.querySelectorAll('.poster');
    document.querySelectorAll('[data-filters] .chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const filter = chip.dataset.filter;
            document.querySelectorAll('[data-filters] .chip').forEach(c => {
                c.classList.toggle('is-active', c === chip);
                c.setAttribute('aria-pressed', String(c === chip));
            });
            posters.forEach(p => {
                const cats = p.dataset.categories.split(' ');
                p.classList.toggle('is-hidden', filter !== 'all' && !cats.includes(filter));
            });
        });
    });

    posters.forEach(poster => {
        poster.addEventListener('click', () => {
            select(Number(poster.dataset.index), { user: true });
            document.getElementById('inicio').scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth' });
        });
    });

    // ----- Revelações no scroll -----
    // Regra de resiliência: nunca esconder o que já está (ou pode estar) na
    // tela. Só elementos claramente abaixo da dobra entram no efeito, e um
    // temporizador garante que nada fica invisível se o observer falhar.
    const revealables = document.querySelectorAll('.library-head, .library-note, .poster, .battlenet-panel, .blizzcon-inner');
    if ('IntersectionObserver' in window && !REDUCED) {
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
        revealables.forEach(el => {
            if (el.getBoundingClientRect().top > window.innerHeight * 1.1) {
                el.classList.add('reveal');
                io.observe(el);
                setTimeout(() => el.classList.add('in'), 6000);
            }
        });
    }
});
