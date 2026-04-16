const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { pool } = require('./lib/db');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

const express = require('express');
const ProductController = require('../controllers/ProductController');
const { authGuard } = require('../middleware/authGuard');
const router = express.Router();

router.get('/products', authGuard, ProductController.index);
router.post('/products', authGuard, ProductController.store);

module.exports = router;

// src/index.js (tambahkan setelah auth routes)
app.use('/api', require('./routes/products'));

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

// ... route registrations
app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/products'));

// ✅ WAJIB: Error handler dipaling akhir
const { errorHandler } = require('./middleware/errorHandler');
app.use(errorHandler);

app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));