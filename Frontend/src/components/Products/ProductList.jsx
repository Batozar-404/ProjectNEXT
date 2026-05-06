import { Edit2, Trash2, Eye, Package, TrendingUp, ShoppingCart } from 'lucide-react';
import { formatCurrency } from '../../utils/format';
import { useNavigate } from 'react-router-dom';

const ProductList = ({ products, loading, onEdit, onDelete }) => {
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                <p className="text-gray-500 mt-2">Loading products...</p>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">No products found</p>
                <p className="text-sm text-gray-400 mt-1">Click "Add Product" to create your first product</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                        <th className="table-header">Image</th>
                        <th className="table-header">SKU</th>
                        <th className="table-header">Product Name</th>
                        <th className="table-header">Category</th>
                        <th className="table-header">Stock</th>
                        <th className="table-header">Price</th>
                        <th className="table-header text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                            <td className="table-cell">
                                {product.image_url ? (
                                    <img
                                        src={`${import.meta.env.VITE_API_URL}${product.image_url}`}
                                        alt={product.name}
                                        className="w-10 h-10 object-cover rounded-lg"
                                    />
                                ) : (
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <Package className="w-5 h-5 text-gray-400" />
                                    </div>
                                )}
                            </td>
                            <td className="table-cell font-mono text-xs">{product.sku}</td>
                            <td className="table-cell">
                                <button
                                    onClick={() => navigate(`/products/${product.id}`)}
                                    className="font-medium text-gray-800 hover:text-blue-600 transition-colors"
                                >
                                    {product.name}
                                </button>
                            </td>
                            <td className="table-cell">
                                <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
                                    {product.category_name || 'Uncategorized'}
                                </span>
                            </td>
                            <td className="table-cell">
                                <span className={`inline-flex items-center gap-1${product.current_stock <= product.min_stock ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                                    <ShoppingCart className="w-3 h-3" />
                                    {product.current_stock || 0}{product.unit}
                                </span>
                            </td>
                            <td className="table-cell font-medium text-gray-800">
                                {formatCurrency(product.sell_price)}
                            </td>
                            <td className="table-cell text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <button
                                        onClick={() => navigate(`/products/${product.id}`)}
                                        className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
                                        title="View Details"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => onEdit(product)}
                                        className="p-1.5 text-gray-400 hover:text-green-600 transition-colors"
                                        title="Edit Product"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => onDelete(product.id)}
                                        className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                                        title="Delete Product"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;