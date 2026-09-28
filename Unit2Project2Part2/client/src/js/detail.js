const detailContainer = document.querySelector('#career-detail');

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function renderList(items) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
}

function getSlugFromPath() {
  return window.location.pathname.split('/').filter(Boolean).pop();
}

async function loadCareer() {
  const slug = getSlugFromPath();

  try {
    const response = await fetch(`/api/careers/${encodeURIComponent(slug)}`);

    if (response.status === 404) {
      window.location.href = '/404.html';
      return;
    }

    if (!response.ok) throw new Error('Unable to load this career from PostgreSQL.');

    const career = await response.json();
    document.title = `${career.title} | Career Compass`;

    detailContainer.innerHTML = `
      <div class="detail-hero">
        <div>
          <span class="category-pill">${escapeHtml(career.category)}</span>
          <h1>${escapeHtml(career.title)}</h1>
          <p class="lead">${escapeHtml(career.shortDescription)}</p>
        </div>
        <img src="${escapeHtml(career.image)}" alt="${escapeHtml(career.title)} illustration" />
      </div>

      <section>
        <h2>What the role is</h2>
        <p>${escapeHtml(career.description)}</p>
      </section>

      <div class="detail-grid">
        <section>
          <h2>Core skills</h2>
          <ul>${renderList(career.skills)}</ul>
        </section>
        <section>
          <h2>Common tools</h2>
          <ul>${renderList(career.tools)}</ul>
        </section>
      </div>

      <section>
        <h2>Who might enjoy it</h2>
        <p>${escapeHtml(career.bestFor)}</p>
      </section>

      <section>
        <h2>Starter project idea</h2>
        <p>${escapeHtml(career.starterProject)}</p>
      </section>

      <details>
        <summary>All database fields</summary>
        <dl class="database-fields">
          <div><dt>id</dt><dd>${career.id}</dd></div>
          <div><dt>slug</dt><dd>${escapeHtml(career.slug)}</dd></div>
          <div><dt>title</dt><dd>${escapeHtml(career.title)}</dd></div>
          <div><dt>category</dt><dd>${escapeHtml(career.category)}</dd></div>
          <div><dt>short_description</dt><dd>${escapeHtml(career.shortDescription)}</dd></div>
          <div><dt>description</dt><dd>${escapeHtml(career.description)}</dd></div>
          <div><dt>skills</dt><dd>${career.skills.map(escapeHtml).join(', ')}</dd></div>
          <div><dt>tools</dt><dd>${career.tools.map(escapeHtml).join(', ')}</dd></div>
          <div><dt>best_for</dt><dd>${escapeHtml(career.bestFor)}</dd></div>
          <div><dt>starter_project</dt><dd>${escapeHtml(career.starterProject)}</dd></div>
          <div><dt>image</dt><dd>${escapeHtml(career.image)}</dd></div>
        </dl>
      </details>
    `;
  } catch (error) {
    detailContainer.innerHTML = `
      <h1>Unable to load this career.</h1>
      <p>${escapeHtml(error.message)}</p>
      <a href="/" role="button">Return home</a>
    `;
  }
}

loadCareer();
