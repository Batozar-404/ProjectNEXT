import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Eye } from 'lucide-react';
import Modal from '../components/Common/Modal';
import Loading from '../components/Common/Loading';
import toast from 'react-hot-toast';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/productService';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        sku: '',
        name: '',
        description: '',
        unit: 'pcs',
        cost_price: 0,
        sell_price: 0
    });

    // ✅ 1. Ambil data produk dari API
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await getProducts();
            setProducts(response.data.data || []);
        } catch (error) {
            console.error('Error fetching products:', error);
            toast.error('Gagal memuat produk');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // ✅ 2. Handle Submit (Create/Update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                // Update produk
                await updateProduct(editingProduct.id, formData);
                toast.success('Produk berhasil diupdate');
            } else {
                // ✅ CREATE produk baru
                await createProduct(formData);
                toast.success('Produk berhasil ditambahkan');
            }
            setShowModal(false);
            resetForm();
            // ✅ 3. FETCH ULANG data produk setelah tambah/update
            await fetchProducts();
        } catch (error) {
            console.error('Error saving product:', error);
            toast.error(error.response?.data?.message || 'Gagal menyimpan produk');
        }
    };

    // ✅ 4. Handle Delete
    const handleDelete = async (id) => {
        if (confirm('Yakin ingin menghapus produk ini?')) {
            try {
                await deleteProduct(id);
                toast.success('Produk berhasil dihapus');
                // ✅ 5. FETCH ULANG data setelah hapus
                await fetchProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
                toast.error('Gagal menghapus produk');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            sku: '',
            name: '',
            description: '',
            unit: 'pcs',
            cost_price: 0,
            sell_price: 0
        });
        setEditingProduct(null);
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setFormData({
            sku: product.sku,
            name: product.name,
            description: product.description || '',
            unit: product.unit,
            cost_price: product.cost_price,
            sell_price: product.sell_price
        });
        setShowModal(true);
    };

    const filteredProducts = products.filter(p =>
        p.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.sku?.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <Loading />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Products</h1>
                    <p className="text-gray-500 mt-1">Manage your product catalog</p>
                </div>
                <button
                    onClick={() => {
                        resetForm();
                        setShowModal(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Product
                </button>
            </div>

            {/* Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search products by name or SKU..."
                        className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Tabel Produk */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-8 text-gray-500">
                                        No products found
                                    </td>
                                </tr>
                            ) : (
                                filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-mono text-gray-600">{product.sku}</td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-medium text-gray-800">{product.name}</p>
                                                <p className="text-xs text-gray-400">{product.description?.substring(0, 50)}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                                                {product.category_name || 'Uncategorized'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-sm ${product.current_stock <= product.min_stock ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                                                {product.current_stock} {product.unit}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-800">
                                            Rp {product.sell_price?.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => openEditModal(product)} className="p-1.5 text-gray-400 hover:text-green-600 transition-colors">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDelete(product.id)} className="p-1.5 text-gray-400 hover:text-red-600 transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Form */}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingProduct ? 'Edit Product' : 'Add New Product'} size="lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">SKU *</label>
                            <input
                                type="text"
                                value={formData.sku}
                                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            rows="3"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                            <select
                                value={formData.unit}
                                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="pcs">Pieces (pcs)</option>
                                <option value="kg">Kilogram (kg)</option>
                                <option value="liter">Liter (L)</option>
                                <option value="box">Box</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                            <input
                                type="number"
                                value={formData.stock_quantity}
                                onChange={(e) => setFormData({ ...formData, stock_quantity: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cost Price</label>
                            <input
                                type="number"
                                value={formData.cost_price}
                                onChange={(e) => setFormData({ ...formData, cost_price: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price</label>
                            <input
                                type="number"
                                value={formData.sell_price}
                                onChange={(e) => setFormData({ ...formData, sell_price: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            {editingProduct ? 'Update Product' : 'Create Product'}
                        </button>
                        <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Products;