import { useState, useEffect } from 'react';
import { Package, Tag, DollarSign, Box, FileText } from 'lucide-react';

const ProductForm = ({ initialData, onSubmit, onCancel, loading }) => {
    const [formData, setFormData] = useState({
        sku: '',
        name: '',
        description: '',
        category_id: '',
        unit: 'pcs',
        cost_price: 0,
        sell_price: 0,
        min_stock: 0
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                sku: initialData.sku || '',
                name: initialData.name || '',
                description: initialData.description || '',
                category_id: initialData.category_id || '',
                unit: initialData.unit || 'pcs',
                cost_price: initialData.cost_price || 0,
                sell_price: initialData.sell_price || 0,
                min_stock: initialData.min_stock || 0
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        <span className="flex items-center gap-1">
                            <Tag className="w-4 h-4" /> SKU *
                        </span>
                    </label>
                    <input
                        type="text"
                        name="sku"
                        value={formData.sku}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="e.g., PRD001"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        <span className="flex items-center gap-1">
                            <Package className="w-4 h-4" /> Product Name *
                        </span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Product name"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <span className="flex items-center gap-1">
                        <FileText className="w-4 h-4" /> Description
                    </span>
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="input-field"
                    rows="3"
                    placeholder="Product description..."
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        <span className="flex items-center gap-1">
                            <Box className="w-4 h-4" /> Category
                        </span>
                    </label>
                    <select
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleChange}
                        className="input-field"
                    >
                        <option value="">Select Category</option>
                        <option value="1">Electronics</option>
                        <option value="2">Furniture</option>
                        <option value="3">Clothing</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Unit</label>
                    <select
                        name="unit"
                        value={formData.unit}
                        onChange={handleChange}
                        className="input-field"
                    >
                        <option value="pcs">Pieces (pcs)</option>
                        <option value="kg">Kilogram (kg)</option>
                        <option value="liter">Liter (L)</option>
                        <option value="box">Box</option>
                        <option value="pack">Pack</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" /> Cost Price
                        </span>
                    </label>
                    <input
                        type="number"
                        name="cost_price"
                        value={formData.cost_price}
                        onChange={handleChange}
                        className="input-field"
                        min="0"
                        step="1000"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" /> Selling Price
                        </span>
                    </label>
                    <input
                        type="number"
                        name="sell_price"
                        value={formData.sell_price}
                        onChange={handleChange}
                        className="input-field"
                        min="0"
                        step="1000"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Min Stock Alert</label>
                <input
                    type="number"
                    name="min_stock"
                    value={formData.min_stock}
                    onChange={handleChange}
                    className="input-field w-48"
                    min="0"
                    placeholder="0"
                />
            </div>

            <div className="flex gap-3 pt-4">
                <button type="submit" disabled={loading} className="flex-1 btn-primary">
                    {loading ? 'Saving...' : (initialData ? 'Update Product' : 'Create Product')}
                </button>
                <button type="button" onClick={onCancel} className="flex-1 btn-secondary">
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default ProductForm;