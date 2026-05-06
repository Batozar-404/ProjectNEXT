import { useState, useEffect } from 'react';
import { Shield, User, Mail, Lock, Briefcase } from 'lucide-react';

const AdminForm = ({ initialData, onSubmit, onCancel, loading }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'staff',
        status: 'active',
        password: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                email: initialData.email || '',
                role: initialData.role || 'staff',
                status: initialData.status || 'active',
                password: ''
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <span className="flex items-center gap-1">
                        <User className="w-4 h-4" /> Full Name *
                    </span>
                </label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="e.g., John Doe"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" /> Email Address *
                    </span>
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="admin@example.com"
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" /> Role
                        </span>
                    </label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="input-field"
                    >
                        <option value="admin">Super Admin</option>
                        <option value="manager">Manager</option>
                        <option value="staff">Staff</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="input-field"
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            {!initialData && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        <span className="flex items-center gap-1">
                            <Lock className="w-4 h-4" /> Temporary Password
                        </span>
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Enter temporary password"
                    />
                    <p className="text-xs text-gray-400 mt-1">User will be prompted to change password on first login</p>
                </div>
            )}

            <div className="flex gap-3 pt-4">
                <button type="submit" disabled={loading} className="flex-1 btn-primary">
                    {loading ? 'Saving...' : (initialData ? 'Update Admin' : 'Create Admin')}
                </button>
                <button type="button" onClick={onCancel} className="flex-1 btn-secondary">
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default AdminForm;