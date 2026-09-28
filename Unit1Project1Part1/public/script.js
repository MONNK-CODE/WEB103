const careerGrid = document.querySelector('#career-grid');
const careerCount = document.querySelector('#career-count');

function createCareerCard(career) {
  const article = document.createElement('article');
  article.className = 'career-card';

  article.innerHTML = `
    <img src="${career.image}" alt="${career.title} illustration" />
    <div class="card-content">
      <span class="category-pill">${career.category}</span>
      <h3>${career.title}</h3>
      <p>${career.shortDescription}</p>
      <p class="tool-preview"><strong>Tools:</strong> ${career.tools.slice(0, 3).join(', ')}</p>
      <a href="/careers/${career.slug}" class="card-link" aria-label="View details about ${career.title}">
        View career details →
      </a>
    </div>
  `;

  return article;
}

async function loadCareers() {
  try {
    const response = await fetch('/api/careers');

    if (!response.ok) {
      throw new Error('Unable to load careers.');
    }

    const careers = await response.json();
    careerGrid.innerHTML = '';
    careerCount.textContent = `${careers.length} careers`;

    careers.forEach((career) => {
      careerGrid.appendChild(createCareerCard(career));
    });
  } catch (error) {
    careerCount.textContent = '';
    careerGrid.innerHTML = `
      <article>
        <h3>Something went wrong</h3>
        <p>${error.message} Please refresh the page and try again.</p>
      </article>
    `;
  }
}

loadCareers();
