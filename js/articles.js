// Gemeinsame Helfer für die öffentlichen Artikelseiten.
// Die Seite ist statisch (GitHub Pages) und liest fertige JSON-Dateien:
//   <base>data/articles/index.json     – Liste aller Artikel (vom Editor gepflegt)
//   <base>data/articles/<slug>.json    – einzelner Artikel
//
// BASE wird aus dem Ort dieses Skripts abgeleitet, damit die Seite sowohl unter der
// Domain-Wurzel (nadinegartner.com/) als auch unter einem GitHub-Pages-Unterpfad
// (tillg.github.io/nadinegartner.com/) und lokal im Editor funktioniert.
const BASE = (() => {
  const src = document.currentScript && document.currentScript.src;
  if (src) return src.replace(/js\/articles\.js(?:\?.*)?$/, '');
  return new URL('.', location.href).href;
})();

function formatDate(value) {
  if (!value) return '';
  const m = /^(\d{4})-(\d{2})/.exec(value);
  if (!m) return value;
  return new Date(Number(m[1]), Number(m[2]) - 1, 1)
    .toLocaleDateString('de-DE', { month: 'long', year: 'numeric' });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

async function fetchArticles(topic) {
  try {
    const res = await fetch(`${BASE}data/articles/index.json`, { cache: 'no-cache' });
    if (!res.ok) return [];
    const list = await res.json();
    return topic ? list.filter(a => a.topic === topic) : list;
  } catch { return []; }
}

async function fetchArticle(slug) {
  try {
    const res = await fetch(`${BASE}data/articles/${encodeURIComponent(slug)}.json`, { cache: 'no-cache' });
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

function articleUrl(slug) {
  return `${BASE}artikel-detail.html?slug=${encodeURIComponent(slug)}`;
}

// Karte für die Übersicht — Titel im Vordergrund, Datum klein/dezent.
function articleCardHTML(a) {
  const topic = a.topic ? `<span class="tag">${escapeHtml(a.topic)}</span>` : '';
  const date = a.date ? `<span class="article-date">${escapeHtml(formatDate(a.date))}</span>` : '';
  return `
    <a class="article-card" href="${articleUrl(a.slug)}">
      <h3>${escapeHtml(a.title)}</h3>
      <div class="article-meta">${topic}${date}</div>
    </a>`;
}
