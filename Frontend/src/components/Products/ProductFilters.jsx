import { Search, Filter, X } from 'lucide-react';

const ProductFilters = ({ filters, onFilterChange, onReset }) => {
    const categories = [
        { id: '', name: 'All Categories' },
        { id: '1', name: 'Electronics' },
        { id: '2', name: 'Furniture' },
        { id: '3', name: 'Clothing' },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
            <div className="flex flex-wrap items-center gap-4">
                {/* Search Input */}
                <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search by name or SKU..."
                            value={filters.search || ''}
                            onChange={(e) => onFilterChange('search', e.target.value)}
                            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Category Filter */}
                <div className="w-48">
                    <select
                        value={filters.category_id || ''}
                        onChange={(e) => onFilterChange('category_id', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                {/* Stock Status Filter */}
                <div className="w-40">
                    <select
                        value={filters.stock_status || ''}
                        onChange={(e) => onFilterChange('stock_status', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Stock</option>
                        <option value="low">Low Stock</option>
                        <option value="out">Out of Stock</option>
                        <option value="good">Good Stock</option>
                    </select>
                </div>

                {/* Sort By */}
                <div className="w-40">
                    <select
                        value={filters.sort_by || 'created_at'}
                        onChange={(e) => onFilterChange('sort_by', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="created_at">Latest First</option>
                        <option value="name_asc">Name A-Z</option>
                        <option value="name_desc">Name Z-A</option>
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_desc">Price: High to Low</option>
                        <option value="stock_asc">Stock: Low to High</option>
                    </select>
                </div>

                {/* Reset Button */}
                {Object.keys(filters).some(key => filters[key]) && (
                    <button
                        onClick={onReset}
                        className="flex items-center gap-1 px-3 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <X className="w-4 h-4" />
                        Reset
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductFilters;