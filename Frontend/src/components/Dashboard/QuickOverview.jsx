import { Users, Building2, TrendingUp, Calendar, CheckCircle, Clock } from 'lucide-react';

const QuickOverview = ({ data }) => {
    const overviewData = data || {
        totalTenants: 5,
        activeStores: 12,
        monthlyGrowth: 23,
        completedTransfers: 45,
        pendingTasks: 3
    };

    const items = [
        { label: 'Total Tenants', value: overviewData.totalTenants, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
        { label: 'Active Stores', value: overviewData.activeStores, icon: Building2, color: 'text-green-600', bg: 'bg-green-100' },
        { label: 'Monthly Growth', value: `+${overviewData.monthlyGrowth}%`, icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100' },
        { label: 'Completed Transfers', value: overviewData.completedTransfers, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
        { label: 'Pending Tasks', value: overviewData.pendingTasks, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
    ];

    return (
        <div className="space-y-4">
            {items.map((item, index) => (
                <div key={index} className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <div className={`${item.bg} p-1.5 rounded-lg`}>
                            <item.icon className={`w-4 h-4${item.color}`} />
                        </div>
                        <span className="text-sm text-gray-600">{item.label}</span>
                    </div>
                    <span className="text-lg font-bold text-gray-800">{item.value}</span>
                </div>
            ))}
        </div>
    );
};

export default QuickOverview;