import { useState, useEffect } from 'react';
import { Users, UserPlus, Edit2, Trash2, Shield, Mail, Phone, MoreVertical } from 'lucide-react';
import { getAdmins, createAdmin, updateAdmin, deleteAdmin } from '../services/adminService';
import Modal from '../components/Common/Modal';
import Loading from '../components/Common/Loading';
import toast from 'react-hot-toast';

const Admins = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingAdmin, setEditingAdmin] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'admin',
        status: 'active'
    });

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            const response = await getAdmins();
            setAdmins(response.data.data || []);
        } catch (error) {
            toast.error('Failed to load admins');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingAdmin) {
                await updateAdmin(editingAdmin.id, formData);
                toast.success('Admin updated successfully');
            } else {
                await createAdmin(formData);
                toast.success('Admin created successfully');
            }
            setShowModal(false);
            resetForm();
            fetchAdmins();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this admin?')) {
            try {
                await deleteAdmin(id);
                toast.success('Admin deleted successfully');
                fetchAdmins();
            } catch (error) {
                toast.error('Failed to delete admin');
            }
        }
    };

    const resetForm = () => {
        setFormData({ name: '', email: '', role: 'admin', status: 'active' });
        setEditingAdmin(null);
    };

    const openEditModal = (admin) => {
        setEditingAdmin(admin);
        setFormData({
            name: admin.name,
            email: admin.email,
            role: admin.role,
            status: admin.status
        });
        setShowModal(true);
    };

    const getRoleBadge = (role) => {
        const badges = {
            admin: 'bg-purple-100 text-purple-700',
            manager: 'bg-blue-100 text-blue-700',
            staff: 'bg-gray-100 text-gray-700'
        };
        return badges[role] || badges.staff;
    };

    const getStatusBadge = (status) => {
        const badges = {
            active: 'bg-green-100 text-green-700',
            inactive: 'bg-red-100 text-red-700'
        };
        return badges[status] || badges.inactive;
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Admin Management</h1>
                    <p className="text-gray-500 mt-1">Manage system administrators and their permissions</p>
                </div>
                <button
                    onClick={() => {
                        resetForm();
                        setShowModal(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
                >
                    <UserPlus className="w-4 h-4" />
                    Add Admin
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800">{admins.length}</p>
                            <p className="text-sm text-gray-500">Total Admins</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-3 rounded-lg">
                            <Shield className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800">{admins.filter(a => a.role === 'admin').length}</p>
                            <p className="text-sm text-gray-500">Super Admins</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-purple-100 p-3 rounded-lg">
                            <Users className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800">{admins.filter(a => a.role === 'manager').length}</p>
                            <p className="text-sm text-gray-500">Managers</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-3 rounded-lg">
                            <Mail className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800">{admins.filter(a => a.status === 'active').length}</p>
                            <p className="text-sm text-gray-500">Active Users</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Admins Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-8">
                                        <Loading />
                                    </td>
                                </tr>
                            ) : admins.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-8 text-gray-500">
                                        No admins found
                                    </td>
                                </tr>
                            ) : (
                                admins.map((admin) => (
                                    <tr key={admin.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                                                    {admin.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-800">{admin.name}</p>
                                                    <p className="text-xs text-gray-400">ID: #{admin.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{admin.email}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full${getRoleBadge(admin.role)}`}>
                                                {admin.role.charAt(0).toUpperCase() + admin.role.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full${getStatusBadge(admin.status)}`}>
                                                {admin.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(admin.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openEditModal(admin)}
                                                    className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(admin.id)}
                                                    className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add/Edit Modal */}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingAdmin ? 'Edit Admin' : 'Add New Admin'} size="md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="admin">Super Admin</option>
                            <option value="manager">Manager</option>
                            <option value="staff">Staff</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    {!editingAdmin && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Temporary Password</label>
                            <input
                                type="password"
                                value={formData.password || ''}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter temporary password"
                            />
                        </div>
                    )}
                    <div className="flex gap-3 pt-4">
                        <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            {editingAdmin ? 'Update Admin' : 'Create Admin'}
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

export default Admins;