import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Tag, DollarSign, Box, Edit, Trash2, AlertTriangle } from 'lucide-react';
import Loading from '../components/Common/Loading';
import { formatCurrency, formatNumber, getStockStatus } from '../utils/format';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock data untuk sementara (backend belum konek)
        setTimeout(() => {
            setProduct({
                id: parseInt(id),
                sku: 'PRD001',
                name: 'Kipas Angin',
                description: 'Kipas angin 16 inch dengan 3 kecepatan. Hemat energi dan sangat cocok untuk ruangan sedang hingga besar.',
                category_name: 'Elektronik',
                unit: 'pcs',
                cost_price: 150000,
                sell_price: 200000,
                current_stock: 50,
                min_stock: 10,
                image_url: null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            });
            setLoading(false);
        }, 500);
    }, [id]);

    if (loading) return <Loading />;
    if (!product) return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Product not found</p>
                <button
                    onClick={() => navigate('/products')}
                    className="mt-4 text-blue-600 hover:text-blue-700"
                >
                    Back to Products
                </button>
            </div>
        </div>
    );

    const stockStatus = getStockStatus(product.current_stock, product.min_stock);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <button
                onClick={() => navigate('/products')}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" /> Back to Products
            </button>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="md:w-1/3 bg-gray-50 p-6 flex items-center justify-center border-r border-gray-100">
                        {product.image_url ? (
                            <img
                                src={`http://localhost:3000${product.image_url}`}
                                alt={product.name}
                                className="w-full max-w-[200px] h-auto object-cover rounded-lg"
                            />
                        ) : (
                            <div className="w-32 h-32 bg-gray-200 rounded-xl flex items-center justify-center">
                                <Package className="w-12 h-12 text-gray-400" />
                            </div>
                        )}
                    </div>

                    {/* Info Section */}
                    <div className="flex-1 p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
                                <p className="text-sm text-gray-500 font-mono mt-1">SKU: {product.sku}</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50">
                                    <Edit className="w-5 h-5" />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Stock Status */}
                        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                            <span className={stockStatus.className.replace('bg-', 'text-')}>
                                {stockStatus.text}
                            </span>
                            <span className="text-gray-400">•</span>
                            <span>{formatNumber(product.current_stock)} {product.unit}</span>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <Tag className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="text-xs text-gray-500">Category</p>
                                    <p className="text-sm font-medium text-gray-700">{product.category_name || '-'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <Box className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="text-xs text-gray-500">Unit</p>
                                    <p className="text-sm font-medium text-gray-700">{product.unit}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <DollarSign className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="text-xs text-gray-500">Cost Price</p>
                                    <p className="text-sm font-medium text-gray-700">{formatCurrency(product.cost_price)}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <DollarSign className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="text-xs text-gray-500">Selling Price</p>
                                    <p className="text-sm font-medium text-gray-700">{formatCurrency(product.sell_price)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        {product.description && (
                            <div className="mt-6 pt-4 border-t border-gray-100">
                                <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <Package className="w-4 h-4" /> Description
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
                            </div>
                        )}

                        {/* Low Stock Alert */}
                        {product.current_stock <= product.min_stock && product.current_stock > 0 && (
                            <div className="mt-4 p-3 bg-yellow-50 rounded-lg flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                                <p className="text-sm text-yellow-700">
                                    Low stock alert! Current stock ({product.current_stock} {product.unit}) is below minimum stock ({product.min_stock} {product.unit})
                                </p>
                            </div>
                        )}

                        {/* Out of Stock Alert */}
                        {product.current_stock === 0 && (
                            <div className="mt-4 p-3 bg-red-50 rounded-lg flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-red-600" />
                                <p className="text-sm text-red-700">
                                    Out of stock! Please restock this product immediately.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;