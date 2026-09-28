INSERT INTO careers
  (slug, title, category, short_description, description, skills, tools, best_for, starter_project, image)
VALUES
(
  'data-analyst',
  'Data Analyst',
  'Analytics',
  'Turn raw data into clear insights that help teams make better decisions.',
  'Data analysts collect, clean, explore, and visualize data to answer business questions. They often work closely with operations, marketing, finance, or product teams and communicate findings through dashboards, reports, and presentations.',
  ARRAY['SQL', 'Data visualization', 'Statistics', 'Communication'],
  ARRAY['Excel', 'SQL', 'Python', 'Tableau or Power BI'],
  'People who enjoy investigating questions, finding patterns, and explaining what the numbers mean.',
  'Build a dashboard that analyzes a public dataset and explains three actionable findings.',
  '/assets/data-analyst.svg'
),
(
  'business-intelligence-analyst',
  'Business Intelligence Analyst',
  'Business + Data',
  'Build dashboards and reporting systems that help organizations track performance.',
  'Business intelligence analysts organize company data into reports, dashboards, and key performance indicators. Their work helps leaders understand what is happening across the business and where performance is changing.',
  ARRAY['SQL', 'Dashboard design', 'Business metrics', 'Data storytelling'],
  ARRAY['Power BI', 'Tableau', 'SQL', 'Excel'],
  'People who like combining business questions with visual reporting and structured analysis.',
  'Create a sales performance dashboard with revenue, conversion, and regional trends.',
  '/assets/bi-analyst.svg'
),
(
  'product-analyst',
  'Product Analyst',
  'Product Analytics',
  'Use user behavior and product data to improve digital experiences.',
  'Product analysts study how people use apps and websites. They track metrics, investigate user behavior, evaluate experiments, and help product teams decide which features or experiences should be improved.',
  ARRAY['SQL', 'Experiment analysis', 'Product metrics', 'Communication'],
  ARRAY['SQL', 'Python', 'Amplitude or Mixpanel', 'Spreadsheets'],
  'People who are curious about why users behave the way they do and how products can improve.',
  'Analyze mock app usage data and recommend one product change based on retention or engagement.',
  '/assets/product-analyst.svg'
),
(
  'data-scientist',
  'Data Scientist',
  'Data Science',
  'Use statistics and machine learning to find patterns and build predictive models.',
  'Data scientists combine programming, statistics, and domain knowledge to solve complex problems with data. Their work may include experimentation, forecasting, classification, recommendation systems, and communicating model results.',
  ARRAY['Python', 'Statistics', 'Machine learning', 'Data cleaning'],
  ARRAY['Python', 'pandas', 'scikit-learn', 'Jupyter'],
  'People who enjoy math, coding, experimentation, and solving open-ended problems.',
  'Train and evaluate a model that predicts an outcome from a cleaned public dataset.',
  '/assets/data-scientist.svg'
),
(
  'machine-learning-engineer',
  'Machine Learning Engineer',
  'AI + Engineering',
  'Turn machine learning models into reliable software that can run at scale.',
  'Machine learning engineers focus on building, deploying, and maintaining systems that use machine learning. The role blends software engineering with model development and often includes APIs, data pipelines, testing, and production monitoring.',
  ARRAY['Python', 'Software engineering', 'Machine learning', 'APIs'],
  ARRAY['Python', 'PyTorch or TensorFlow', 'Docker', 'Cloud platforms'],
  'People who like both machine learning and building production-quality software systems.',
  'Deploy a trained model behind a small API and create a page that sends it sample inputs.',
  '/assets/ml-engineer.svg'
),
(
  'data-engineer',
  'Data Engineer',
  'Data Infrastructure',
  'Build the pipelines and systems that move, organize, and prepare data for others.',
  'Data engineers design systems that collect, transform, store, and deliver data. Their work makes reliable analysis possible by ensuring that data is available, organized, and ready for analysts, scientists, and applications.',
  ARRAY['SQL', 'Programming', 'Databases', 'Data pipelines'],
  ARRAY['SQL', 'Python', 'PostgreSQL', 'Cloud data tools'],
  'People who enjoy backend systems, organization, automation, and making data reliable.',
  'Build a small ETL pipeline that reads raw data, cleans it, and stores the result in a database.',
  '/assets/data-engineer.svg'
);
