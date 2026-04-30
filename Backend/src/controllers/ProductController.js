const Product = require('../models/Product');
const { successResponse, errorResponse } = require('../utils/response');

const getAllProducts = async (req, res) => {
    try {
        const tenantId = req.user?.tenant_id || 1; // Temporary, akan diganti dengan middleware auth nanti
        const products = await Product.findAll(tenantId, req.query);
        successResponse(res, 'Products retrieved successfully', products);
    } catch (error) {
        errorResponse(res, 'Error retrieving products', error);
    }
};

const getProductById = async (req, res) => {
    try {
        const tenantId = req.user?.tenant_id || 1;
        const product = await Product.findById(tenantId, req.params.id);

        if (!product) {
            return errorResponse(res, 'Product not found', null, 404);
        }

        successResponse(res, 'Product retrieved successfully', product);
    } catch (error) {
        errorResponse(res, 'Error retrieving product', error);
    }
};

const createProduct = async (req, res) => {
    try {
        const tenantId = req.user?.tenant_id || 1;
        const { sku } = req.body;

        // Check if SKU already exists
        const existingProduct = await Product.findBySku(tenantId, sku);
        if (existingProduct) {
            return errorResponse(res, 'SKU already exists for this tenant', null, 400);
        }

        const product = await Product.create(tenantId, req.body);
        successResponse(res, 'Product created successfully', product, 201);
    } catch (error) {
        errorResponse(res, 'Error creating product', error);
    }
};

const updateProduct = async (req, res) => {
    try {
        const tenantId = req.user?.tenant_id || 1;
        const product = await Product.update(tenantId, req.params.id, req.body);

        if (!product) {
            return errorResponse(res, 'Product not found', null, 404);
        }

        successResponse(res, 'Product updated successfully', product);
    } catch (error) {
        errorResponse(res, 'Error updating product', error);
    }
};

const deleteProduct = async (req, res) => {
    try {
        const tenantId = req.user?.tenant_id || 1;
        const deleted = await Product.delete(tenantId, req.params.id);

        if (!deleted) {
            return errorResponse(res, 'Product not found', null, 404);
        }

        successResponse(res, 'Product deleted successfully');
    } catch (error) {
        errorResponse(res, 'Error deleting product', error);
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
// Tambahkan fungsi ini ke productController.js
const { pool } = require('../config/database');

const uploadProductImage = async (req, res) => {
    try {
        const tenantId = req.tenantId;
        const productId = req.params.id;

        if (!req.file) {
            return errorResponse(res, 'No image file uploaded', null, 400);
        }

        const imageUrl = `/uploads/${req.file.filename}`;

        await pool.query(
            'UPDATE products SET image_url = ? WHERE tenant_id = ? AND id = ?',
            [imageUrl, tenantId, productId]
        );

        const updatedProduct = await Product.findById(tenantId, productId);

        successResponse(res, 'Product image uploaded successfully', updatedProduct);
    } catch (error) {
        errorResponse(res, 'Error uploading image', error);
    }
};

// Export tambahan
module.exports = {
    // ... exports sebelumnya
    uploadProductImage
};