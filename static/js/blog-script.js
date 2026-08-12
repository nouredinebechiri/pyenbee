// ==========================================================================
// SYSLOG — Blog IT — script partagé
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- thème clair / sombre ---------- */
  const root = document.documentElement;
  const themeBtn = document.querySelector('.btn-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
    });
  }

  /* ---------- menu mobile ---------- */
  const burger = document.querySelector('.btn-burger');
  const nav = document.querySelector('nav.main');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  /* ---------- barre de progression de lecture (page article) ---------- */
  const progressBar = document.querySelector('.progress-bar');
  const article = document.querySelector('.prose');
  if (progressBar && article) {
    const update = () => {
      const rect = article.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      progressBar.style.width = pct + '%';
    };
    document.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ---------- copier le code des blocs ---------- */
  document.querySelectorAll('.code-block .copy-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const code = btn.closest('.code-block').querySelector('pre').innerText;
      try {
        await navigator.clipboard.writeText(code);
        const original = btn.textContent;
        btn.textContent = 'copié !';
        setTimeout(() => { btn.textContent = original; }, 1500);
      } catch (err) {
        btn.textContent = 'erreur';
      }
    });
  });

  /* ---------- sommaire (TOC) : lien actif au scroll ---------- */
  const tocLinks = document.querySelectorAll('.toc-list a');
  if (tocLinks.length) {
    const targets = Array.from(tocLinks)
      .map((a) => document.querySelector(a.getAttribute('href')))
      .filter(Boolean);

    const onScroll = () => {
      let currentId = null;
      targets.forEach((t) => {
        if (t.getBoundingClientRect().top - 110 <= 0) currentId = t.id;
      });
      tocLinks.forEach((a) => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + currentId);
      });
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- recherche inline (modale + AJAX) ---------- */
  const searchTrigger = document.getElementById('searchTrigger');
  const searchModal = document.getElementById('searchModal');
  const searchInput = document.getElementById('searchInput');
  const searchClose = document.getElementById('searchClose');
  const searchResults = document.getElementById('searchResults');

  if (searchTrigger && searchModal && searchInput && searchResults) {
    const HINT_MESSAGE = '<div class="search-hint">Tapez au moins 2 caractères…</div>';
    const searchUrl = searchModal.dataset.searchUrl || '/recherche/';
    let debounceTimer = null;
    let currentController = null;

    const openSearch = () => {
      searchModal.classList.add('open');
      searchInput.value = '';
      searchResults.innerHTML = HINT_MESSAGE;
      document.body.style.overflow = 'hidden';
      setTimeout(() => searchInput.focus(), 50);
    };

    const closeSearch = () => {
      searchModal.classList.remove('open');
      document.body.style.overflow = '';
    };

    const escapeHtml = (str) =>
      str.replace(/[&<>"']/g, (c) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
      }[c]));

    const renderResults = (results) => {
      if (!results.length) {
        searchResults.innerHTML = '<div class="search-empty">Aucun article trouvé.</div>';
        return;
      }
      searchResults.innerHTML = results.map((r) => `
        <a class="search-result-item" href="${r.url}">
          <div class="result-title">${escapeHtml(r.title)}</div>
          <div class="result-meta">
            <span>${escapeHtml(r.category)}</span><span>·</span><span>${r.date}</span>
          </div>
          ${r.excerpt ? `<div class="result-excerpt">${escapeHtml(r.excerpt)}</div>` : ''}
        </a>
      `).join('');
    };

    const runSearch = (query) => {
      if (currentController) currentController.abort();
      currentController = new AbortController();

      fetch(`${searchUrl}?q=${encodeURIComponent(query)}`, { signal: currentController.signal })
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then((data) => renderResults(data.results))
        .catch((err) => {
          if (err.name !== 'AbortError') {
            console.error('Erreur recherche SYSLOG :', err);
            searchResults.innerHTML = '<div class="search-empty">Erreur pendant la recherche.</div>';
          }
        });
    };

    searchTrigger.addEventListener('click', openSearch);
    searchClose.addEventListener('click', closeSearch);

    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearch();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchModal.classList.contains('open')) closeSearch();
      // raccourci clavier "/" pour ouvrir la recherche depuis n'importe où
      if (e.key === '/' && !searchModal.classList.contains('open') &&
          document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        openSearch();
      }
    });

    searchInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      const query = searchInput.value.trim();

      if (query.length < 2) {
        searchResults.innerHTML = HINT_MESSAGE;
        return;
      }

      searchResults.innerHTML = '<div class="search-hint">Recherche…</div>';
      debounceTimer = setTimeout(() => runSearch(query), 300);
    });
  }

});