const careerGrid = document.querySelector('#career-grid');
const careerCount = document.querySelector('#career-count');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const categorySelect = document.querySelector('#category-select');
const clearSearchButton = document.querySelector('#clear-search');

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function createCareerCard(career) {
  const article = document.createElement('article');
  article.className = 'career-card';

  article.innerHTML = `
    <img src="${escapeHtml(career.image)}" alt="${escapeHtml(career.title)} illustration" />
    <div class="card-content">
      <span class="category-pill">${escapeHtml(career.category)}</span>
      <h3>${escapeHtml(career.title)}</h3>
      <p>${escapeHtml(career.shortDescription)}</p>
      <p class="tool-preview"><strong>Tools:</strong> ${career.tools.slice(0, 3).map(escapeHtml).join(', ')}</p>
      <a href="/careers/${encodeURIComponent(career.slug)}" class="card-link" aria-label="View details about ${escapeHtml(career.title)}">
        View career details →
      </a>
    </div>
  `;

  return article;
}

async function loadCategories() {
  const response = await fetch('/api/careers/categories');
  if (!response.ok) throw new Error('Unable to load categories.');

  const categories = await response.json();
  categories.forEach((category) => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
}

async function loadCareers() {
  const params = new URLSearchParams();
  const search = searchInput.value.trim();
  const category = categorySelect.value;

  if (search) params.set('q', search);
  if (category) params.set('category', category);

  const query = params.toString();

  try {
    careerCount.textContent = 'Loading careers…';
    const response = await fetch(`/api/careers${query ? `?${query}` : ''}`);

    if (!response.ok) throw new Error('Unable to load careers from the database.');

    const careers = await response.json();
    careerGrid.innerHTML = '';
    careerCount.textContent = `${careers.length} ${careers.length === 1 ? 'career' : 'careers'}`;

    if (!careers.length) {
      careerGrid.innerHTML = `
        <article class="empty-state">
          <h3>No careers matched your search.</h3>
          <p>Try another title, skill, tool, or category.</p>
        </article>
      `;
      return;
    }

    careers.forEach((career) => careerGrid.appendChild(createCareerCard(career)));
  } catch (error) {
    careerCount.textContent = '';
    careerGrid.innerHTML = `
      <article class="empty-state">
        <h3>Something went wrong</h3>
        <p>${escapeHtml(error.message)} Check the PostgreSQL connection and try again.</p>
      </article>
    `;
  }
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  loadCareers();
});

clearSearchButton.addEventListener('click', () => {
  searchInput.value = '';
  categorySelect.value = '';
  loadCareers();
});

Promise.all([loadCategories(), loadCareers()]).catch((error) => {
  careerGrid.innerHTML = `<article class="empty-state"><h3>${escapeHtml(error.message)}</h3></article>`;
});
