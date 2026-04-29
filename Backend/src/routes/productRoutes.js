const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
const { upload } = require('../middlewares/upload');
const { authenticate } = require('../middlewares/auth');

// Protected routes
router.post('/:id/upload-image', authenticate, upload.single('image'),
productController.uploadProductImage);


module.exports = router;