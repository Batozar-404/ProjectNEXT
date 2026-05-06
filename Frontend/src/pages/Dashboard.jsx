import { useState, useEffect } from 'react';
import { Package, Box, AlertTriangle, TrendingUp, Building2, DollarSign } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalStock: 0,
        lowStock: 0,
        pendingTransfers: 0,
        totalStores: 0,
        totalValue: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulasi loading data
        setTimeout(() => {
            setStats({
                totalProducts: 124,
                totalStock: 3450,
                lowStock: 8,
                pendingTransfers: 3,
                totalStores: 2,
                totalValue: 125000000
            });
            setLoading(false);
        }, 500);
    }, []);

    const statCards = [
        { title: 'Total Products', value: stats.totalProducts, icon: Package, color: 'bg-blue-500', bgLight: 'bg-blue-50', textColor: 'text-blue-600' },
        { title: 'Total Stock', value: stats.totalStock.toLocaleString(), icon: Box, color: 'bg-green-500', bgLight: 'bg-green-50', textColor: 'text-green-600' },
        { title: 'Inventory Value', value: `Rp ${stats.totalValue.toLocaleString()}`, icon: DollarSign, color: 'bg-purple-500', bgLight: 'bg-purple-50', textColor: 'text-purple-600' },
        { title: 'Low Stock Items', value: stats.lowStock, icon: AlertTriangle, color: 'bg-yellow-500', bgLight: 'bg-yellow-50', textColor: 'text-yellow-600' },
        { title: 'Pending Transfers', value: stats.pendingTransfers, icon: TrendingUp, color: 'bg-orange-500', bgLight: 'bg-orange-50', textColor: 'text-orange-600' },
        { title: 'Active Stores', value: stats.totalStores, icon: Building2, color: 'bg-cyan-500', bgLight: 'bg-cyan-50', textColor: 'text-cyan-600' },
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-500 mt-1">Welcome back! Here's your inventory overview</p>
            </div>

            {/* Stat Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 mb-8">
                {statCards.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <div className={`${stat.bgLight} p-2 rounded-lg`}>
                                <stat.icon className={`w-5 h-5 ${stat.textColor}`} />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                        <p className="text-xs text-gray-500 mt-1">{stat.title}</p>
                    </div>
                ))}
            </div>

            {/* Welcome Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Welcome to Inventori.Multi!</h2>
                <p className="text-gray-600">
                    Your multi-tenant inventory management system is ready.
                    Start by adding products, managing stock, and creating transfer requests.
                </p>
                <div className="mt-4 flex gap-3">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Add Product
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                        Create Transfer
                    </button>
                </div>
            </div>
        </div>
    );
};

// ✅ INI YANG PALING PENTING - EKSPOR DEFAULT
export default Dashboard;