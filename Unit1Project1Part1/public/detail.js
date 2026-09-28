const detailContainer = document.querySelector('#career-detail');

function renderList(items) {
  return items.map((item) => `<li>${item}</li>`).join('');
}

function getSlugFromPath() {
  return window.location.pathname.split('/').filter(Boolean).pop();
}

async function loadCareer() {
  const slug = getSlugFromPath();

  try {
    const response = await fetch(`/api/careers/${slug}`);

    if (!response.ok) {
      window.location.href = '/404.html';
      return;
    }

    const career = await response.json();
    document.title = `${career.title} | Career Compass`;

    detailContainer.innerHTML = `
      <div class="detail-hero">
        <div>
          <span class="category-pill">${career.category}</span>
          <h1>${career.title}</h1>
          <p class="lead">${career.shortDescription}</p>
        </div>
        <img src="${career.image}" alt="${career.title} illustration" />
      </div>

      <section>
        <h2>What the role is</h2>
        <p>${career.description}</p>
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
        <p>${career.bestFor}</p>
      </section>

      <section>
        <h2>Starter project idea</h2>
        <p>${career.starterProject}</p>
      </section>

      <details>
        <summary>All database fields</summary>
        <dl class="database-fields">
          <div><dt>slug</dt><dd>${career.slug}</dd></div>
          <div><dt>title</dt><dd>${career.title}</dd></div>
          <div><dt>category</dt><dd>${career.category}</dd></div>
          <div><dt>shortDescription</dt><dd>${career.shortDescription}</dd></div>
          <div><dt>description</dt><dd>${career.description}</dd></div>
          <div><dt>skills</dt><dd>${career.skills.join(', ')}</dd></div>
          <div><dt>tools</dt><dd>${career.tools.join(', ')}</dd></div>
          <div><dt>bestFor</dt><dd>${career.bestFor}</dd></div>
          <div><dt>starterProject</dt><dd>${career.starterProject}</dd></div>
          <div><dt>image</dt><dd>${career.image}</dd></div>
        </dl>
      </details>
    `;
  } catch (error) {
    detailContainer.innerHTML = `
      <h1>Unable to load this career.</h1>
      <p>${error.message}</p>
      <a href="/" role="button">Return home</a>
    `;
  }
}

loadCareer();
