const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// ========================================
// MIDDLEWARE GLOBAL
// ========================================
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files untuk uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ========================================
// ROUTES
// ========================================
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const transferRoutes = require('./routes/transferRoutes');

// Public routes (tanpa authentication)
app.use('/api/auth', authRoutes);

// Protected routes (wajib authentication)
const { authenticate } = require('./middlewares/auth');
const { ensureTenantScope } = require('./middlewares/tenantScope');

app.use('/api/products', authenticate, ensureTenantScope, productRoutes);
app.use('/api/categories', authenticate, ensureTenantScope, categoryRoutes);
app.use('/api/transfers', authenticate, ensureTenantScope, transferRoutes);

// ========================================
// HEALTH CHECK
// ========================================
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Inventori.Multi API is running',
        timestamp: new Date().toISOString()
    });
});

// ========================================
// ERROR HANDLERS (menggunakan middleware terpisah)
// ========================================
const { notFound, errorHandler } = require('./middlewares/errorHandler');

// Handler untuk route yang tidak ditemukan (404)
app.use(notFound);

// Handler untuk semua error (global error handler)
app.use(errorHandler);

module.exports = app;