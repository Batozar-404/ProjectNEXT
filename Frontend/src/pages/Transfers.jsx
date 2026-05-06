import { useState } from 'react';
import { Plus, Check, X, Eye, Clock, CheckCircle, XCircle } from 'lucide-react';
import Modal from '../components/Common/Modal';
import Card from '../components/Common/Card';
import toast from 'react-hot-toast';

// Mock data untuk sementara (karena backend belum konek)
const mockTransfers = [
    { id: 1, from_store_name: 'Toko Pusat', to_store_name: 'Toko Cabang', status: 'pending', items: [{ product_id: 1, quantity: 10 }], created_at: new Date(), requested_by_name: 'Admin' },
    { id: 2, from_store_name: 'Toko Cabang', to_store_name: 'Toko Pusat', status: 'approved', items: [{ product_id: 2, quantity: 5 }], created_at: new Date(Date.now() - 86400000), requested_by_name: 'Manager' },
    { id: 3, from_store_name: 'Toko Pusat', to_store_name: 'Toko Cabang', status: 'rejected', items: [{ product_id: 1, quantity: 3 }], created_at: new Date(Date.now() - 172800000), requested_by_name: 'Admin' },
];

const Transfers = () => {
    const [transfers, setTransfers] = useState(mockTransfers);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        from_store_id: '',
        to_store_id: '',
        product_id: '',
        quantity: 1,
        notes: ''
    });

    const getStatusConfig = (status) => {
        const configs = {
            pending: { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Pending' },
            approved: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', label: 'Approved' },
            completed: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', label: 'Completed' },
            rejected: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100', label: 'Rejected' },
        };
        return configs[status] || configs.pending;
    };

    const handleApprove = (id) => {
        setTransfers(prev => prev.map(t =>
            t.id === id ? { ...t, status: 'approved' } : t
        ));
        toast.success('Transfer approved successfully');
    };

    const handleReject = (id) => {
        setTransfers(prev => prev.map(t =>
            t.id === id ? { ...t, status: 'rejected' } : t
        ));
        toast.success('Transfer rejected');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTransfer = {
            id: transfers.length + 1,
            from_store_name: formData.from_store_id === '1' ? 'Toko Pusat' : 'Toko Cabang',
            to_store_name: formData.to_store_id === '1' ? 'Toko Pusat' : 'Toko Cabang',
            status: 'pending',
            items: [{ product_id: parseInt(formData.product_id), quantity: formData.quantity }],
            created_at: new Date(),
            requested_by_name: 'Current User'
        };
        setTransfers(prev => [newTransfer, ...prev]);
        toast.success('Transfer request created successfully');
        setShowModal(false);
        setFormData({ from_store_id: '', to_store_id: '', product_id: '', quantity: 1, notes: '' });
    };

    const stats = {
        total: transfers.length,
        pending: transfers.filter(t => t.status === 'pending').length,
        completed: transfers.filter(t => t.status === 'approved' || t.status === 'completed').length
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Stock Transfers</h1>
                    <p className="text-gray-500 mt-1">Manage transfers between stores</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Create Transfer
                </button>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <p className="text-sm text-gray-500">Total Transfers</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <p className="text-sm text-gray-500">Pending Approval</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <p className="text-sm text-gray-500">Completed</p>
                    <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                </div>
            </div>

            {/* Transfers List */}
            <div className="space-y-4">
                {loading ? (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent mx-auto"></div>
                        <p className="text-gray-500 mt-2">Loading transfers...</p>
                    </div>
                ) : transfers.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Clock className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500">No transfer requests found</p>
                        <p className="text-sm text-gray-400 mt-1">Click "Create Transfer" to start</p>
                    </div>
                ) : (
                    transfers.map((transfer) => {
                        const statusConfig = getStatusConfig(transfer.status);
                        const StatusIcon = statusConfig.icon;

                        return (
                            <Card key={transfer.id} className="hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="font-mono text-sm text-gray-500">#{transfer.id}</span>
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${statusConfig.bg} ${statusConfig.color}`}>
                                                <StatusIcon className="w-3 h-3" />
                                                {statusConfig.label}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="text-gray-600">{transfer.from_store_name}</span>
                                            <span className="text-gray-400">→</span>
                                            <span className="text-gray-600">{transfer.to_store_name}</span>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {transfer.items?.length || 0} item(s) • Requested by {transfer.requested_by_name}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {new Date(transfer.created_at).toLocaleDateString()} {new Date(transfer.created_at).toLocaleTimeString()}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        {transfer.status === 'pending' && (
                                            <>
                                                <button
                                                    onClick={() => handleApprove(transfer.id)}
                                                    className="px-3 py-1.5 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors flex items-center gap-1"
                                                >
                                                    <Check className="w-4 h-4" /> Approve
                                                </button>
                                                <button
                                                    onClick={() => handleReject(transfer.id)}
                                                    className="px-3 py-1.5 text-sm bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-1"
                                                >
                                                    <X className="w-4 h-4" /> Reject
                                                </button>
                                            </>
                                        )}
                                        <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        );
                    })
                )}
            </div>

            {/* Create Transfer Modal */}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create Stock Transfer" size="lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">From Store *</label>
                            <select
                                value={formData.from_store_id}
                                onChange={(e) => setFormData({ ...formData, from_store_id: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Store</option>
                                <option value="1">Toko Pusat</option>
                                <option value="2">Toko Cabang</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">To Store *</label>
                            <select
                                value={formData.to_store_id}
                                onChange={(e) => setFormData({ ...formData, to_store_id: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Store</option>
                                <option value="1">Toko Pusat</option>
                                <option value="2">Toko Cabang</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product *</label>
                        <select
                            value={formData.product_id}
                            onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Product</option>
                            <option value="1">Kipas Angin (Stock: 50)</option>
                            <option value="2">Meja Kayu (Stock: 25)</option>
                            <option value="3">Indomie Goreng (Stock: 100)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                        <input
                            type="number"
                            value={formData.quantity}
                            onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            min="1"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                        <textarea
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            rows="2"
                            placeholder="Additional notes..."
                        />
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Create Transfer Request
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Transfers;