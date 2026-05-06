import StatCard from '../Common/StatCard';
import { Package, TrendingUp, AlertTriangle, Building2, DollarSign, Box } from 'lucide-react';

const StatsGrid = ({ stats }) => {
    const statItems = [
        {
            title: 'Total Products',
            value: stats.totalProducts || 0,
            icon: <Package className="w-5 h-5 text-blue-600" />,
            color: 'blue',
            trend: stats.productTrend,
            trendValue: '+12%'
        },
        {
            title: 'Total Stock',
            value: stats.totalStock?.toLocaleString() || 0,
            icon: <Box className="w-5 h-5 text-green-600" />,
            color: 'green',
            trend: stats.stockTrend,
            trendValue: '+8%'
        },
        {
            title: 'Inventory Value',
            value: `Rp${(stats.totalValue || 0).toLocaleString()}`,
            icon: <DollarSign className="w-5 h-5 text-purple-600" />,
            color: 'purple',
            trend: 'up',
            trendValue: '+15%'
        },
        {
            title: 'Low Stock Items',
            value: stats.lowStock || 0,
            icon: <AlertTriangle className="w-5 h-5 text-yellow-600" />,
            color: 'yellow',
            trend: 'down',
            trendValue: '-5%'
        },
        {
            title: 'Pending Transfers',
            value: stats.pendingTransfers || 0,
            icon: <TrendingUp className="w-5 h-5 text-orange-600" />,
            color: 'orange',
            trend: 'up',
            trendValue: '+3'
        },
        {
            title: 'Active Stores',
            value: stats.totalStores || 0,
            icon: <Building2 className="w-5 h-5 text-cyan-600" />,
            color: 'cyan'
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
            {statItems.map((item, index) => (
                <StatCard key={index} {...item} />
            ))}
        </div>
    );
};

export default StatsGrid;