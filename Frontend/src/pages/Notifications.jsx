import { Bell, Package, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import Card from '../components/Common/Card';

const Notifications = () => {
    const notifications = [
        { id: 1, type: 'stock', title: 'Low Stock Alert', message: 'Product "Kipas Angin" is running low (5 units left)', time: '2 minutes ago', icon: Package, read: false },
        { id: 2, type: 'transfer', title: 'Transfer Request', message: 'Transfer #123 requires your approval', time: '1 hour ago', icon: TrendingUp, read: false },
        { id: 3, type: 'approved', title: 'Transfer Approved', message: 'Transfer #122 has been approved', time: '3 hours ago', icon: CheckCircle, read: true },
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
                    <button className="text-sm text-blue-600 hover:text-blue-700">Mark all as read</button>
                </div>

                <div className="space-y-3">
                    {notifications.map((notif) => (
                        <Card key={notif.id} className={`${!notif.read ? 'border-l-4 border-l-blue-500' : ''}`}>
                            <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-lg ${!notif.read ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                    <notif.icon className={`w-5 h-5 ${!notif.read ? 'text-blue-600' : 'text-gray-400'}`} />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800">{notif.title}</p>
                                    <p className="text-sm text-gray-600 mt-0.5">{notif.message}</p>
                                    <p className="text-xs text-gray-400 mt-2">{notif.time}</p>
                                </div>
                                {!notif.read && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Notifications;