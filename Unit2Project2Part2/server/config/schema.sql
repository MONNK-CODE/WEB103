DROP TABLE IF EXISTS careers;

CREATE TABLE careers (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(80) UNIQUE NOT NULL,
  title VARCHAR(120) NOT NULL,
  category VARCHAR(80) NOT NULL,
  short_description TEXT NOT NULL,
  description TEXT NOT NULL,
  skills TEXT[] NOT NULL DEFAULT '{}',
  tools TEXT[] NOT NULL DEFAULT '{}',
  best_for TEXT NOT NULL,
  starter_project TEXT NOT NULL,
  image VARCHAR(255) NOT NULL
);

CREATE INDEX careers_category_idx ON careers (category);
CREATE INDEX careers_title_idx ON careers (title);
