import { Edit2, Trash2, Shield, User, Mail, Calendar } from 'lucide-react';
import RoleBadge from './RoleBadge';
import { formatDate } from '../../utils/format';

const AdminTable = ({ admins, loading, onEdit, onDelete, canEdit = true }) => {
    if (loading) {
        return (
            <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                <p className="text-gray-500 mt-2">Loading admins...</p>
            </div>
        );
    }

    if (admins.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">No admins found</p>
                <p className="text-sm text-gray-400 mt-1">Click "Add Admin" to create one</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                        <th className="table-header">Admin</th>
                        <th className="table-header">Role</th>
                        <th className="table-header">Status</th>
                        <th className="table-header">Joined</th>
                        <th className="table-header text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {admins.map((admin) => (
                        <tr key={admin.id} className="hover:bg-gray-50 transition-colors">
                            <td className="table-cell">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                                        {admin.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">{admin.name}</p>
                                        <div className="flex items-center gap-1 mt-0.5">
                                            <Mail className="w-3 h-3 text-gray-400" />
                                            <p className="text-xs text-gray-400">{admin.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="table-cell">
                                <RoleBadge role={admin.role} />
                            </td>
                            <td className="table-cell">
                                <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full${admin.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                    {admin.status === 'active' ? 'Active' : 'Inactive'}
                                </span>
                            </td>
                            <td className="table-cell">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3 text-gray-400" />
                                    <span className="text-sm text-gray-500">{formatDate(admin.created_at)}</span>
                                </div>
                            </td>
                            <td className="table-cell text-right">
                                {canEdit && (
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => onEdit(admin)}
                                            className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
                                            title="Edit Admin"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(admin.id)}
                                            className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                                            title="Delete Admin"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminTable;