import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Building2, MapPin, Check, X } from 'lucide-react';
import Card from '../components/Common/Card';
import Modal from '../components/Common/Modal';
import Loading from '../components/Common/Loading';
import toast from 'react-hot-toast';

const Stores = () => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingStore, setEditingStore] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        address: '',
        is_active: true
    });

    useEffect(() => {
        fetchStores();
    }, []);

    const fetchStores = async () => {
        try {
            // Simulasi data - ganti dengan API call ke backend
            setStores([
                { id: 1, name: 'Toko Pusat', code: 'TP01', address: 'Jl. Raya No. 1', is_active: true },
                { id: 2, name: 'Toko Cabang', code: 'TC01', address: 'Jl. Raya No. 2', is_active: true },
            ]);
        } catch (error) {
            toast.error('Failed to load stores');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingStore) {
                toast.success('Store updated successfully');
            } else {
                toast.success('Store created successfully');
            }
            setShowModal(false);
            resetForm();
            fetchStores();
        } catch (error) {
            toast.error('Operation failed');
        }
    };

    const resetForm = () => {
        setFormData({ name: '', code: '', address: '', is_active: true });
        setEditingStore(null);
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this store?')) {
            try {
                toast.success('Store deleted successfully');
                fetchStores();
            } catch (error) {
                toast.error('Failed to delete store');
            }
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Stores Management</h1>
                    <p className="text-gray-500 mt-1">Manage your store locations</p>
                </div>
                <button
                    onClick={() => {
                        resetForm();
                        setShowModal(true);
                    }}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Store
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full flex justify-center py-12">
                        <Loading />
                    </div>
                ) : (
                    stores.map((store) => (
                        <Card key={store.id} className="hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Building2 className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => {
                                        setEditingStore(store);
                                        setFormData(store);
                                        setShowModal(true);
                                    }} className="text-gray-400 hover:text-blue-600">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => handleDelete(store.id)} className="text-gray-400 hover:text-red-600">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <h3 className="font-semibold text-gray-800">{store.name}</h3>
                            <p className="text-sm text-gray-500 font-mono mt-0.5">{store.code}</p>
                            <div className="flex items-start gap-2 mt-3">
                                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                                <p className="text-sm text-gray-600">{store.address}</p>
                            </div>
                            <div className="mt-4 pt-3 border-t border-gray-100">
                                <span className={`inline-flex items-center gap-1 text-xs font-medium ${store.is_active ? 'text-green-600' : 'text-red-600'}`}>
                                    {store.is_active ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                                    {store.is_active ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        </Card>
                    ))
                )}
            </div>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingStore ? 'Edit Store' : 'Add New Store'} size="md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="input-field"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Store Code</label>
                        <input
                            type="text"
                            value={formData.code}
                            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                            className="input-field"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <textarea
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="input-field"
                            rows="3"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={formData.is_active}
                            onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                            className="w-4 h-4 text-blue-600"
                        />
                        <label className="text-sm text-gray-700">Active</label>
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button type="submit" className="flex-1 btn-primary">
                            {editingStore ? 'Update' : 'Create'}
                        </button>
                        <button type="button" onClick={() => setShowModal(false)} className="flex-1 btn-secondary">
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Stores;