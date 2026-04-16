const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { pool } = require('./lib/db');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: ['http://localhost:3000'] }));
app.use(express.json());

app.get('/api/health', async (req, res) => {
  try {
    await pool.execute('SELECT 1');
    res.json({ status: 'OK', message: 'Backend connected to MySQL' });
  } catch {
    res.status(500).json({ status: 'ERROR', message: 'DB connection failed' });
  }
});

app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));