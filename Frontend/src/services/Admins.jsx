import { useState } from 'react';
import { Shield, UserPlus, Edit2, Trash2, Mail } from 'lucide-react';

const Admins = () => {
    const [admins, setAdmins] = useState([
        { id: 1, name: 'Admin Utama', email: 'admin@example.com', role: 'admin', status: 'active' },
        { id: 2, name: 'Staff Gudang', email: 'staff@example.com', role: 'staff', status: 'active' },
    ]);
    const [loading, setLoading] = useState(false);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Manajemen Admin</h1>
                    <p className="text-gray-500 mt-1">Kelola administrator dan hak akses mereka</p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
                    <UserPlus className="w-4 h-4" />
                    Tambah Admin
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <Shield className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800">{admins.length}</p>
                            <p className="text-sm text-gray-500">Total Admin</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-3 rounded-lg">
                            <Shield className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800">{admins.filter(a => a.status === 'active').length}</p>
                            <p className="text-sm text-gray-500">Aktif</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-purple-100 p-3 rounded-lg">
                            <Shield className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800">{admins.filter(a => a.role === 'admin').length}</p>
                            <p className="text-sm text-gray-500">Super Admin</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Admin Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Admin</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {admins.map((admin) => (
                                <tr key={admin.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                                                {admin.name.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-medium text-gray-800">{admin.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1">
                                            <Mail className="w-3 h-3 text-gray-400" />
                                            <span className="text-sm text-gray-600">{admin.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${admin.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                                            }`}>
                                            {admin.role === 'admin' ? 'Super Admin' : 'Staff'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${admin.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {admin.status === 'active' ? 'Aktif' : 'Nonaktif'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button className="p-1.5 text-gray-400 hover:text-red-600 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Admins;