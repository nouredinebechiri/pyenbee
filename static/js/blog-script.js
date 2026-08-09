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

  /* ---------- newsletter (démo, sans backend) ---------- */
  document.querySelectorAll('.newsletter-box form, .input-line').forEach((el) => {
    const form = el.tagName === 'FORM' ? el : el.closest('form');
    const line = el.classList.contains('input-line') ? el : el.querySelector('.input-line');
    const button = line ? line.querySelector('button') : null;
    const input = line ? line.querySelector('input') : null;
    if (!button || !input) return;

    const submit = (e) => {
      e.preventDefault();
      if (!input.value.trim()) { input.focus(); return; }
      line.classList.add('done');
      button.textContent = 'OK ✓';
      button.disabled = true;
    };

    if (form) form.addEventListener('submit', submit);
    button.addEventListener('click', submit);
  });

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

  /* ---------- formulaire de commentaire (démo) ---------- */
  const commentForm = document.querySelector('.comment-form');
  if (commentForm) {
    commentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = commentForm.querySelector('button');
      const original = btn.textContent;
      btn.textContent = 'envoyé !';
      commentForm.querySelector('textarea').value = '';
      setTimeout(() => { btn.textContent = original; }, 1800);
    });
  }

});
