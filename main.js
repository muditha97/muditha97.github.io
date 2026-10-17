/* Renders the data in data.js into index.html and wires up the menu and case-study dialog. */
(function () {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const map = (list, fn) => list.map(fn).join('');
  const pad = (n) => String(n).padStart(2, '0');

  const linkedinUrl = (SITE.linkedinUrl || '').trim();
  const email = (SITE.email || '').trim();
  const cvUrl = (SITE.cvUrl || '').trim();
  const showNotes = SITE.showEditorNotes !== false;

  /* ---------- Contact links ---------- */
  $$('[data-github]').forEach((a) => { a.href = SITE.githubUrl; });
  $$('[data-linkedin]').forEach((a) => { a.href = linkedinUrl; a.hidden = !linkedinUrl; });
  $$('[data-cv]').forEach((a) => { a.href = cvUrl; a.hidden = !cvUrl; });
  $$('[data-email]').forEach((a) => { a.href = 'mailto:' + email; a.textContent = email; a.hidden = !email; });

  $('[data-note="links"]').hidden = !(showNotes && (!linkedinUrl || !cvUrl));
  $('[data-note="experience"]').hidden = !(showNotes && EXPERIENCE.some((e) => e.dates.includes('YYYY')));
  $('[data-note="contact"]').hidden = !(showNotes && (!email || !linkedinUrl || !cvUrl));

  /* ---------- Navigation ---------- */
  const navLinks = $('[data-nav-links]');
  navLinks.insertAdjacentHTML('afterbegin', map(NAV, (l) => `<a href="${esc(l.href)}">${esc(l.label)}</a>`));

  const menu = $('[data-mobile-menu]');
  const menuBtn = $('[data-menu-toggle]');
  menu.innerHTML = map(NAV, (l) => `<a href="${esc(l.href)}">${esc(l.label)}</a>`);
  const setMenu = (open) => {
    menu.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.textContent = open ? 'Close' : 'Menu';
  };
  menuBtn.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  window.matchMedia('(min-width: 860px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

  /* ---------- Layer diagrams ---------- */
  const nodes = (list) => `<div class="nodes">${map(list, (n) => `<span class="node">${esc(n)}</span>`)}</div>`;

  $('[data-hero-layers]').innerHTML = map(HERO, (layer) => `
    <div>
      <div class="layer-row"><span class="layer-label">${esc(layer.label)}</span>${nodes(layer.nodes)}</div>
      ${layer.connector ? '<div class="connector" aria-hidden="true"></div>' : ''}
    </div>`);

  /* ---------- Projects ---------- */
  const statusPill = (p, cls) => `<span class="${cls}"><span class="status-dot" aria-hidden="true" style="background:${STATUS[p.kind]}"></span>${esc(p.status)}</span>`;
  const tags = (list) => `<div class="tags">${map(list, (s) => `<span class="tag">${esc(s)}</span>`)}</div>`;

  $('[data-projects]').innerHTML = map(PROJECTS, (p, i) => `
    <li>
      <button type="button" class="card" aria-haspopup="dialog" data-open="${i}">
        <div class="card-top">
          <span class="card-num">${pad(i + 1)}</span>
          ${statusPill(p, 'status')}
        </div>
        <div class="card-heading">
          <span class="card-category">${esc(p.category)}</span>
          <h3 class="card-title">${esc(p.title)}</h3>
          <span class="card-subtitle">${esc(p.subtitle)}</span>
        </div>
        <p class="card-body">${esc(p.oneLiner)}</p>
        ${tags(p.stack.slice(0, 4))}
        <span class="card-cta">Read case study →</span>
      </button>
    </li>`);

  /* ---------- Skills, experience, steps, beyond ---------- */
  $('[data-skills]').innerHTML = map(SKILLS, (g) => `
    <div class="skill">
      <h3>${esc(g.title)}</h3>
      <ul class="plain-list">${map(g.items, (it) => `<li>${esc(it)}</li>`)}</ul>
    </div>`);

  $('[data-experience]').innerHTML = map(EXPERIENCE, (e) => `
    <li class="exp-item">
      <span class="exp-dates">${esc(e.dates)}</span>
      <div class="exp-body">
        <h3>${esc(e.org)}</h3>
        <span class="exp-role">${esc(e.role)}</span>
        <p class="exp-focus">${esc(e.focus)}</p>
      </div>
    </li>`);

  $('[data-steps]').innerHTML = map(STEPS, (s) => `
    <li class="step">
      <span class="step-n">${esc(s.n)}</span>
      <h3>${esc(s.t)}</h3>
      <p>${esc(s.b)}</p>
    </li>`);

  $('[data-beyond]').innerHTML = map(BEYOND, (b) => `
    <li class="beyond-item">
      <span class="beyond-n">${esc(b.n)}</span>
      <h3>${esc(b.t)}</h3>
      <p>${esc(b.b)}</p>
      <span class="beyond-ref">${esc(b.ref)}</span>
    </li>`);

  /* ---------- Case study dialog ---------- */
  const backdrop = $('[data-cs-backdrop]');
  const panel = $('[data-cs-panel]');
  const content = $('[data-cs-content]');
  const counter = $('[data-cs-counter]');
  let active = null;
  let lastFocus = null;

  const caseStudy = (p) => {
    const arch = p.arch.map((l, j) => ({ ...l, hasEdge: j < p.arch.length - 1 && !!l.edge }));
    return `
      <header class="cs-header">
        <span class="cs-category">${esc(p.category)}</span>
        <h2 id="cs-title" class="cs-title">${esc(p.title)}</h2>
        <p class="cs-summary">${esc(p.summary)}</p>
        <div class="cs-meta">
          ${statusPill(p, 'pill')}
          ${map(p.links, (l) => `<a class="pill" href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`)}
        </div>
      </header>

      ${p.images.length ? `
      <div class="cs-images">
        ${map(p.images, (img) => `
          <figure>
            <img src="${esc(img.src)}" alt="${esc(img.alt)}" loading="lazy">
            <figcaption>${esc(img.caption || '')}</figcaption>
          </figure>`)}
      </div>` : ''}

      <div class="cs-two">
        <div><h3 class="cs-label">THE PROBLEM</h3><p class="cs-text">${esc(p.problem)}</p></div>
        <div><h3 class="cs-label">MY ROLE</h3><p class="cs-text">${esc(p.role)}</p></div>
      </div>

      ${p.mine.length ? `
      <div class="cs-team">
        <div><h3>What I worked on</h3><ul>${map(p.mine, (m) => `<li>${esc(m)}</li>`)}</ul></div>
        <div class="is-muted"><h3>Owned by the wider team</h3><ul>${map(p.team, (m) => `<li>${esc(m)}</li>`)}</ul></div>
      </div>` : ''}

      <div class="cs-block">
        <h3 class="cs-label">${esc(p.highlightsTitle)}</h3>
        <ul class="plain-list highlights">${map(p.highlights, (h) => `<li><span>${esc(h)}</span></li>`)}</ul>
      </div>

      <div class="cs-block">
        <h3 class="cs-label">ARCHITECTURE</h3>
        <figure class="layers layers--arch" aria-label="${esc(p.archLabel)}">
          ${map(arch, (layer) => `
            <div>
              <div class="layer-row"><span class="layer-label">${esc(layer.label)}</span>${nodes(layer.nodes)}</div>
              ${layer.hasEdge ? `<div class="edge">${esc(layer.edge)}</div>` : ''}
            </div>`)}
        </figure>
      </div>

      <div class="cs-block">
        <h3 class="cs-label">KEY DECISIONS</h3>
        <div class="decisions">
          ${map(p.decisions, (d) => `<div class="decision"><h4>${esc(d.t)}</h4><p>${esc(d.b)}</p></div>`)}
        </div>
      </div>

      ${p.planned.length ? `
      <div class="cs-block cs-block--tight">
        <h3 class="cs-label">IN PROGRESS / PLANNED</h3>
        <ul class="cs-planned">${map(p.planned, (x) => `<li>${esc(x)}</li>`)}</ul>
      </div>` : ''}

      <div class="cs-block cs-block--tight cs-stack">
        <h3 class="cs-label">STACK</h3>
        ${tags(p.stack)}
      </div>

      ${showNotes && p.note ? `<p class="note cs-note">Before publishing: ${esc(p.note)}</p>` : ''}`;
  };

  const render = (i) => {
    active = i;
    counter.textContent = `CASE STUDY ${pad(i + 1)} / ${pad(PROJECTS.length)}`;
    content.innerHTML = caseStudy(PROJECTS[i]);
    panel.scrollTop = 0;
    panel.focus();
  };

  const open = (i) => {
    lastFocus = document.activeElement;
    document.body.classList.add('is-locked');
    backdrop.hidden = false;
    render(i);
  };

  const close = () => {
    active = null;
    backdrop.hidden = true;
    document.body.classList.remove('is-locked');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  };

  const step = (d) => render((active + d + PROJECTS.length) % PROJECTS.length);

  $('[data-projects]').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-open]');
    if (btn) open(Number(btn.dataset.open));
  });
  $('[data-cs-close]').addEventListener('click', close);
  $('[data-cs-prev]').addEventListener('click', () => step(-1));
  $('[data-cs-next]').addEventListener('click', () => step(1));
  backdrop.addEventListener('click', (e) => { if (e.target === backdrop) close(); });

  window.addEventListener('keydown', (e) => {
    if (active === null) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'Tab') {
      // Keep focus inside the dialog while it's open.
      const focusable = $$('button, a[href], [tabindex]:not([tabindex="-1"])', panel);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panel)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
})();
