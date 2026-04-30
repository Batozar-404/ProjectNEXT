const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes (temporary for sprint 4)
const productRoutes = require('./routes/productRoutes');

app.use('/api/products', productRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Inventori.Multi API is running' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal server error' });
});
// ... setelah imports sebelumnya
const authRoutes = require('./routes/authRoutes');
const { authenticate } = require('./middlewares/auth');
const { ensureTenantScope } = require('./middlewares/tenantScope');

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes (require authentication)
app.use('/api/products', authenticate, ensureTenantScope, productRoutes);

// ... rest of the code
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const transferRoutes = require('./routes/transferRoutes');

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes (require authentication)
const { authenticate } = require('./middlewares/auth');
const { ensureTenantScope } = require('./middlewares/tenantScope');

app.use('/api/products', authenticate, ensureTenantScope, productRoutes);
app.use('/api/categories', authenticate, ensureTenantScope, categoryRoutes);
app.use('/api/transfers', authenticate, ensureTenantScope, transferRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Inventori.Multi API is running' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: err.message || 'Internal server error' });
});

module.exports = app;