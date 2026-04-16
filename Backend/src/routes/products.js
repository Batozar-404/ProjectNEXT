const express = require('express');
const { z } = require('zod');
const { validate } = require('../middleware/validate');
const { authGuard } = require('../middleware/authGuard');
const ProductController = require('../controllers/ProductController');

const router = express.Router();

// Schema validasi create/update produk
const productSchema = z.object({
  name: z.string().min(3, "Nama produk minimal 3 karakter").max(100),
  sku: z.string().min(3, "SKU minimal 3 karakter").regex(/^[A-Z0-9-]+$/i, "SKU hanya boleh huruf, angka, dan strip"),
  price: z.number().positive("Harga harus lebih dari 0").optional(),
  category_id: z.number().int().positive().optional().nullable()
});

router.get('/products', authGuard, ProductController.index);
router.post('/products', authGuard, validate(productSchema), ProductController.store);
router.put('/products/:id', authGuard, validate(productSchema), ProductController.update);
router.delete('/products/:id', authGuard, ProductController.destroy);

module.exports = router;