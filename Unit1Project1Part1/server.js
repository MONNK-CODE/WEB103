const express = require('express');
const path = require('path');
const careers = require('./data/careers.json');

const app = express();
const PORT = process.env.PORT || 3000;
const publicDirectory = path.join(__dirname, 'public');

app.use(express.static(publicDirectory));

app.get('/api/careers', (req, res) => {
  res.json(careers);
});

app.get('/api/careers/:slug', (req, res) => {
  const career = careers.find((item) => item.slug === req.params.slug);

  if (!career) {
    return res.status(404).json({ error: 'Career not found' });
  }

  res.json(career);
});

app.get('/careers/:slug', (req, res, next) => {
  const careerExists = careers.some((item) => item.slug === req.params.slug);

  if (!careerExists) {
    return next();
  }

  res.sendFile(path.join(publicDirectory, 'detail.html'));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(publicDirectory, '404.html'));
});

app.listen(PORT, () => {
  console.log(`Career Compass is running at http://localhost:${PORT}`);
});
