import api from './api';

// Get all products
export const getProducts = (params = {}) => {
    return api.get('/products', { params });
};

// Get single product by ID
export const getProduct = (id) => {
    return api.get(`/products/${id}`);
};

// Create new product
export const createProduct = (data) => {
    return api.post('/products', data);
};

// Update product
export const updateProduct = (id, data) => {
    return api.put(`/products/${id}`, data);
};

// Delete product
export const deleteProduct = (id) => {
    return api.delete(`/products/${id}`);
};

// Upload product image
export const uploadProductImage = (id, file) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post(`/products/${id}/upload-image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};

// Export default untuk kemudahan import
const productService = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadProductImage
};

export default productService;