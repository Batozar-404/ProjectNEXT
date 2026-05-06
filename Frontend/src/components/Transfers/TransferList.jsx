import { Clock, CheckCircle, XCircle, Truck, Eye, Check, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale'; // Untuk format Bahasa Indonesia

const TransferList = ({ transfers, loading, onView, onApprove, onReject, userRole }) => {
    const getStatusConfig = (status) => {
        const configs = {
            pending: { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Pending' },
            approved: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', label: 'Approved' },
            in_transit: { icon: Truck, color: 'text-blue-600', bg: 'bg-blue-100', label: 'In Transit' },
            completed: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', label: 'Completed' },
            rejected: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100', label: 'Rejected' },
            cancelled: { icon: XCircle, color: 'text-gray-600', bg: 'bg-gray-100', label: 'Cancelled' },
        };
        return configs[status] || configs.pending;
    };

    if (loading) {
        return (
            <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                <p className="text-gray-500 mt-2">Loading transfers...</p>
            </div>
        );
    }

    // Pastikan transfers adalah array
    const transfersArray = Array.isArray(transfers) ? transfers : [];

    if (transfersArray.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">No transfer requests found</p>
                <p className="text-sm text-gray-400 mt-1">Click "Create Transfer" to start</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From Store</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To Store</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested At</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {transfersArray.map((transfer) => {
                        const StatusIcon = getStatusConfig(transfer.status).icon;
                        const statusConfig = getStatusConfig(transfer.status);
                        // Hitung jumlah items dengan aman
                        const itemCount = transfer.items?.length || 0;

                        return (
                            <tr key={transfer.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm font-mono text-xs">#{transfer.id}</td>
                                <td className="px-6 py-4 text-sm">{transfer.from_store_name || '-'}</td>
                                <td className="px-6 py-4 text-sm">{transfer.to_store_name || '-'}</td>
                                <td className="px-6 py-4 text-sm">
                                    <span className="text-sm text-gray-600">
                                        {itemCount} items
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    {/* ✅ FIX: tambah spasi sebelum ${statusConfig.bg} dan ${statusConfig.color} */}
                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${statusConfig.bg} ${statusConfig.color}`}>
                                        <StatusIcon className="w-3 h-3" />
                                        {statusConfig.label}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-xs text-gray-500">
                                    {transfer.created_at ? formatDistanceToNow(new Date(transfer.created_at), { addSuffix: true, locale: id }) : '-'}
                                </td>
                                <td className="px-6 py-4 text-sm text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => onView(transfer)}
                                            className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
                                            title="View Details"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        {transfer.status === 'pending' && (userRole === 'admin' || userRole === 'tenant_owner') && (
                                            <>
                                                <button
                                                    onClick={() => onApprove(transfer.id)}
                                                    className="p-1.5 text-gray-400 hover:text-green-600 transition-colors"
                                                    title="Approve"
                                                >
                                                    <Check className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => onReject(transfer.id)}
                                                    className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                                                    title="Reject"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TransferList;