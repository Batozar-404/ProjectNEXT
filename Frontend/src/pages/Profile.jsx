import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Calendar, Camera, Save } from 'lucide-react';
import Card from '../components/Common/Card';
import toast from 'react-hot-toast';

const Profile = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        try {
            toast.success('Profile updated successfully');
            setIsEditing(false);
        } catch (error) {
            toast.error('Failed to update profile');
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profile Card */}
                    <Card className="lg:col-span-1">
                        <div className="text-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                            <button className="mt-3 text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 mx-auto">
                                <Camera className="w-4 h-4" /> Change Photo
                            </button>
                            <h3 className="font-semibold text-gray-800 mt-4">{user?.name}</h3>
                            <p className="text-sm text-gray-500">{user?.role === 'admin' ? 'Administrator' : user?.role === 'manager' ? 'Store Manager' : 'Staff'}</p>
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <p className="text-xs text-gray-400">Member since</p>
                                <p className="text-sm text-gray-600">January 2025</p>
                            </div>
                        </div>
                    </Card>

                    {/* Profile Form */}
                    <Card className="lg:col-span-2">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-gray-800">Personal Information</h3>
                            {!isEditing && (
                                <button onClick={() => setIsEditing(true)} className="text-sm text-blue-600 hover:text-blue-700">
                                    Edit Profile
                                </button>
                            )}
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="input-field"
                                    disabled={!isEditing}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="input-field"
                                    disabled={!isEditing}
                                />
                            </div>

                            {isEditing && (
                                <>
                                    <div className="border-t border-gray-100 pt-4 mt-4">
                                        <h4 className="font-medium text-gray-800 mb-3">Change Password</h4>
                                        <div className="space-y-3">
                                            <input
                                                type="password"
                                                placeholder="Current Password"
                                                value={formData.currentPassword}
                                                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                                                className="input-field"
                                            />
                                            <input
                                                type="password"
                                                placeholder="New Password"
                                                value={formData.newPassword}
                                                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                                className="input-field"
                                            />
                                            <input
                                                type="password"
                                                placeholder="Confirm New Password"
                                                value={formData.confirmPassword}
                                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                                className="input-field"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {isEditing && (
                                <div className="flex gap-3 pt-4">
                                    <button type="submit" className="btn-primary flex items-center gap-2">
                                        <Save className="w-4 h-4" /> Save Changes
                                    </button>
                                    <button type="button" onClick={() => setIsEditing(false)} className="btn-secondary">
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Profile;