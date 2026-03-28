require('dotenv').config({ path: '../.env' });

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const chatRouter = require('./routes/chat');

const app = express();
const PORT = process.env.PORT || 3001;
const isProd = process.env.NODE_ENV === 'production';

app.use(helmet({ contentSecurityPolicy: false }));

if (!isProd) {
  app.use(cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  }));
}

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { error: 'Too many requests. Please try again later.' },
});
app.use('/api/', limiter);

app.use('/api/chat', chatRouter);

// In production, serve the React build
if (isProd) {
  const clientBuild = path.join(__dirname, '../client/dist');
  app.use(express.static(clientBuild));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuild, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Maverick AI running on http://localhost:${PORT}`);
});
