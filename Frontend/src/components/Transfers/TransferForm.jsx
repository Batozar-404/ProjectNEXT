import { useState } from 'react';
import { Plus, Trash2, Truck, Package } from 'lucide-react';

const TransferForm = ({ stores, products, onSubmit, onCancel, loading }) => {
    const [formData, setFormData] = useState({
        from_store_id: '',
        to_store_id: '',
        items: [{ product_id: '', quantity: 1 }],
        notes: ''
    });

    const addItem = () => {
        setFormData({
            ...formData,
            items: [...formData.items, { product_id: '', quantity: 1 }]
        });
    };

    const removeItem = (index) => {
        setFormData({
            ...formData,
            items: formData.items.filter((_, i) => i !== index)
        });
    };

    const updateItem = (index, field, value) => {
        const newItems = [...formData.items];
        newItems[index][field] = value;
        setFormData({ ...formData, items: newItems });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">From Store *</label>
                    <select
                        value={formData.from_store_id}
                        onChange={(e) => setFormData({ ...formData, from_store_id: e.target.value })}
                        className="input-field"
                        required
                    >
                        <option value="">Select Source Store</option>
                        {stores.map(store => (
                            <option key={store.id} value={store.id}>{store.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">To Store *</label>
                    <select
                        value={formData.to_store_id}
                        onChange={(e) => setFormData({ ...formData, to_store_id: e.target.value })}
                        className="input-field"
                        required
                    >
                        <option value="">Select Destination Store</option>
                        {stores.map(store => (
                            <option key={store.id} value={store.id}>{store.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-medium text-gray-700">Transfer Items *</label>
                    <button
                        type="button"
                        onClick={addItem}
                        className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                        <Plus className="w-4 h-4" /> Add Item
                    </button>
                </div>

                <div className="space-y-3">
                    {formData.items.map((item, index) => (
                        <div key={index} className="flex gap-3 items-end">
                            <div className="flex-1">
                                <select
                                    value={item.product_id}
                                    onChange={(e) => updateItem(index, 'product_id', e.target.value)}
                                    className="input-field"
                                    required
                                >
                                    <option value="">Select Product</option>
                                    {products.map(product => (
                                        <option key={product.id} value={product.id}>
                                            {product.name} ({product.sku}) - Stock:{product.current_stock || 0}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-32">
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                                    className="input-field"
                                    min="1"
                                    placeholder="Qty"
                                    required
                                />
                            </div>
                            {formData.items.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeItem(index)}
                                    className="p-2 text-red-500 hover:text-red-700 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes</label>
                <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="input-field"
                    rows="3"
                    placeholder="Additional notes for this transfer..."
                />
            </div>

            <div className="flex gap-3 pt-4">
                <button type="submit" disabled={loading} className="flex-1 btn-primary">
                    {loading ? 'Creating...' : 'Create Transfer Request'}
                </button>
                <button type="button" onClick={onCancel} className="flex-1 btn-secondary">
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default TransferForm;