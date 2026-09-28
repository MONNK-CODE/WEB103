const express = require('express');
const pool = require('../config/database');

const router = express.Router();

function mapCareer(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    shortDescription: row.short_description,
    description: row.description,
    skills: row.skills,
    tools: row.tools,
    bestFor: row.best_for,
    starterProject: row.starter_project,
    image: row.image,
  };
}

router.get('/categories', async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT DISTINCT category FROM careers ORDER BY category ASC;'
    );
    res.json(result.rows.map((row) => row.category));
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  const search = req.query.q?.trim() || '';
  const category = req.query.category?.trim() || '';

  const values = [];
  const conditions = [];

  if (search) {
    values.push(`%${search}%`);
    const parameter = `$${values.length}`;
    conditions.push(`(
      title ILIKE ${parameter}
      OR category ILIKE ${parameter}
      OR short_description ILIKE ${parameter}
      OR EXISTS (SELECT 1 FROM unnest(skills) skill WHERE skill ILIKE ${parameter})
      OR EXISTS (SELECT 1 FROM unnest(tools) tool WHERE tool ILIKE ${parameter})
    )`);
  }

  if (category) {
    values.push(category);
    conditions.push(`category = $${values.length}`);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  try {
    const result = await pool.query(
      `SELECT * FROM careers ${whereClause} ORDER BY id ASC;`,
      values
    );
    res.json(result.rows.map(mapCareer));
  } catch (error) {
    next(error);
  }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM careers WHERE slug = $1 LIMIT 1;',
      [req.params.slug]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: 'Career not found' });
    }

    res.json(mapCareer(result.rows[0]));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
