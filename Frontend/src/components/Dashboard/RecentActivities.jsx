import { Package, TrendingUp, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const RecentActivities = ({ activities }) => {
    const getActivityIcon = (type) => {
        switch (type) {
            case 'stock_in':
                return { icon: Package, color: 'text-green-600', bg: 'bg-green-100' };
            case 'stock_out':
                return { icon: TrendingUp, color: 'text-red-600', bg: 'bg-red-100' };
            case 'transfer':
                return { icon: Clock, color: 'text-blue-600', bg: 'bg-blue-100' };
            case 'approved':
                return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' };
            case 'rejected':
                return { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100' };
            default:
                return { icon: AlertTriangle, color: 'text-gray-600', bg: 'bg-gray-100' };
        }
    };

    const activitiesData = activities && activities.length > 0 ? activities : [
        { id: 1, type: 'stock_in', title: 'Stock Added', description: 'Added 50 units to Product A', time: new Date(), user: 'Admin' },
        { id: 2, type: 'transfer', title: 'Transfer Request', description: 'Transfer 20 units to Store B', time: new Date(Date.now() - 3600000), user: 'Manager' },
        { id: 3, type: 'approved', title: 'Transfer Approved', description: 'Transfer #123 approved', time: new Date(Date.now() - 7200000), user: 'Admin' },
    ];

    const displayActivities = activitiesData.slice(0, 5);

    return (
        <div className="space-y-3">
            {displayActivities.map((activity) => {
                const { icon: Icon, color, bg } = getActivityIcon(activity.type);
                return (
                    <div key={activity.id} className="flex items-start gap-3 py-2 border-b border-gray-50 hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors">
                        <div className={`${bg} p-2 rounded-lg`}>
                            <Icon className={`w-4 h-4${color}`} />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-800">{activity.title}</p>
                                <span className="text-xs text-gray-400">
                                    {formatDistanceToNow(activity.time, { addSuffix: true })}
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5">{activity.description}</p>
                            <p className="text-xs text-gray-400 mt-1">by {activity.user}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default RecentActivities;