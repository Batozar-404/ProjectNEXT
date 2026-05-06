import { AlertTriangle, Package } from 'lucide-react';

const LowStockAlert = ({ products }) => {
    const lowStockProducts = products && products.length > 0 ? products : [
        { id: 1, name: 'Product A', sku: 'SKU001', current_stock: 5, min_stock: 10 },
        { id: 2, name: 'Product B', sku: 'SKU002', current_stock: 3, min_stock: 8 },
        { id: 3, name: 'Product C', sku: 'SKU003', current_stock: 8, min_stock: 15 },
    ];

    if (lowStockProducts.length === 0) {
        return (
            <div className="text-center py-8">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Package className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-gray-500">All stock levels are healthy!</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {lowStockProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between py-2 border-b border-gray-50 hover:bg-yellow-50 -mx-2 px-2 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-800">{product.name}</p>
                            <p className="text-xs text-gray-400">SKU:{product.sku}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-semibold text-red-600">{product.current_stock} left</p>
                        <p className="text-xs text-gray-400">Min:{product.min_stock}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LowStockAlert;