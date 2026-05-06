import { Package, TrendingUp, ShoppingCart, Eye, Edit2 } from 'lucide-react';
import { formatCurrency } from '../../utils/format';

const ProductCard = ({ product, onView, onEdit }) => {
    const stockStatus = product.current_stock <= product.min_stock ? 'low' : 'good';
    const stockColor = stockStatus === 'low' ? 'text-red-600 bg-red-50' : 'text-green-600 bg-green-50';

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200">
            <div className="aspect-square bg-gray-50 relative">
                {product.image_url ? (
                    <img
                        src={`${import.meta.env.VITE_API_URL}${product.image_url}`}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-12 h-12 text-gray-300" />
                    </div>
                )}
                <div className="absolute top-2 right-2">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full${stockColor}`}>
                        {stockStatus === 'low' ? 'Low Stock' : 'In Stock'}
                    </span>
                </div>
            </div>

            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
                        <p className="text-xs text-gray-400 font-mono mt-0.5">{product.sku}</p>
                    </div>
                    <div className="flex gap-1">
                        <button onClick={() => onView(product)} className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors">
                            <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => onEdit(product)} className="p-1.5 text-gray-400 hover:text-green-600 transition-colors">
                            <Edit2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                    <div>
                        <p className="text-xs text-gray-500">Price</p>
                        <p className="font-bold text-gray-800">{formatCurrency(product.sell_price)}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500">Stock</p>
                        <p className="flex items-center gap-1 font-medium text-gray-700">
                            <ShoppingCart className="w-3 h-3" />
                            {product.current_stock || 0}{product.unit}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;