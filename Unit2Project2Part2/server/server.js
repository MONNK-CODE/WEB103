const express = require('express');
const path = require('path');
const pool = require('./config/database');
const careersRouter = require('./routes/careers');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const clientDirectory = path.join(__dirname, '..', 'client');
const srcDirectory = path.join(clientDirectory, 'src');

app.use(express.json());
app.use(express.static(clientDirectory));
app.use('/assets', express.static(path.join(srcDirectory, 'assets')));
app.use('/css', express.static(path.join(srcDirectory, 'css')));
app.use('/js', express.static(path.join(srcDirectory, 'js')));

app.use('/api/careers', careersRouter);

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1;');
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', database: 'disconnected' });
  }
});

app.get('/careers/:slug', async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT 1 FROM careers WHERE slug = $1 LIMIT 1;',
      [req.params.slug]
    );

    if (!result.rows.length) {
      return next();
    }

    res.sendFile(path.join(clientDirectory, 'detail.html'));
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  console.error(error);

  if (req.path.startsWith('/api/')) {
    return res.status(500).json({ error: 'Database request failed.' });
  }

  res.status(500).send(`
    <main style="font-family: system-ui; max-width: 700px; margin: 5rem auto; padding: 1rem;">
      <h1>Database connection error</h1>
      <p>Check that DATABASE_URL is set correctly, then restart the server.</p>
      <a href="/">Return home</a>
    </main>
  `);
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(clientDirectory, '404.html'));
});

app.listen(PORT, () => {
  console.log(`Career Compass is running at http://localhost:${PORT}`);
});
