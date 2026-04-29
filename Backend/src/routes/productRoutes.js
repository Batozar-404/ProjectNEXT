const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { upload } = require('../middlewares/upload');
const { authenticate } = require('../middlewares/auth');

// --- Public Routes ---
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// --- Protected Routes ---
router.post('/', authenticate, productController.createProduct);
router.put('/:id', authenticate, productController.updateProduct);
router.delete('/:id', authenticate, productController.deleteProduct);

// Image Upload Route
router.post(
    '/:id/upload-image', 
    authenticate, 
    upload.single('image'),
    productController.uploadProductImage
);

module.exports = router;