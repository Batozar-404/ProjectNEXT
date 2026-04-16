// src/routes/products.js
const express = require('express');
const ProductController = require('../controllers/ProductController');
const { authGuard } = require('../middleware/authGuard');
const router = express.Router();

router.get('/products', authGuard, ProductController.index);
router.post('/products', authGuard, ProductController.store);

module.exports = router;

// src/index.js (tambahkan setelah auth routes)
app.use('/api', require('./routes/products'));