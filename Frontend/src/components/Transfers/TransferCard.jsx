import { Clock, CheckCircle, XCircle, Truck, MapPin, Package, Calendar, User } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';

const TransferCard = ({ transfer, onView, onApprove, onReject, userRole }) => {
    const getStatusConfig = (status) => {
        const configs = {
            pending: { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Pending' },
            approved: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', label: 'Approved' },
            in_transit: { icon: Truck, color: 'text-blue-600', bg: 'bg-blue-100', label: 'In Transit' },
            completed: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', label: 'Completed' },
            rejected: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100', label: 'Rejected' },
        };
        return configs[status] || configs.pending;
    };

    const statusConfig = getStatusConfig(transfer.status);
    const StatusIcon = statusConfig.icon;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-200">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-gray-500">#{transfer.id}</span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full${statusConfig.bg}${statusConfig.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {statusConfig.label}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1 text-sm">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{transfer.from_store_name}</span>
                        </div>
                        <span className="text-gray-400">→</span>
                        <div className="flex items-center gap-1 text-sm">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{transfer.to_store_name}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{transfer.items?.length || 0} items</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                        {format(new Date(transfer.created_at), 'dd MMM yyyy')}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{transfer.requested_by_name || 'N/A'}</span>
                </div>
            </div>

            {(transfer.status === 'pending' && (userRole === 'admin' || userRole === 'tenant_owner')) && (
                <div className="flex gap-2 pt-3 border-t border-gray-100">
                    <button
                        onClick={() => onApprove(transfer.id)}
                        className="flex-1 px-3 py-1.5 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                    >
                        Approve
                    </button>
                    <button
                        onClick={() => onReject(transfer.id)}
                        className="flex-1 px-3 py-1.5 text-sm bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                    >
                        Reject
                    </button>
                </div>
            )}
        </div>
    );
};

export default TransferCard;