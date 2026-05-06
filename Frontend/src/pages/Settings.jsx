import { useState } from 'react';
import { Bell, Lock, Globe, Palette, Moon, Sun, Save } from 'lucide-react';
import Card from '../components/Common/Card';
import toast from 'react-hot-toast';

const Settings = () => {
    const [settings, setSettings] = useState({
        notifications: true,
        emailAlerts: true,
        twoFactorAuth: false,
        language: 'id',
        theme: 'light',
        dateFormat: 'DD/MM/YYYY'
    });

    const handleChange = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            toast.success('Settings saved successfully');
        } catch (error) {
            toast.error('Failed to save settings');
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Notification Settings */}
                    <Card title="Notifications" icon={<Bell className="w-5 h-5" />}>
                        <div className="space-y-3">
                            <label className="flex items-center justify-between cursor-pointer">
                                <div>
                                    <p className="font-medium text-gray-700">Push Notifications</p>
                                    <p className="text-sm text-gray-500">Receive real-time updates about stock movements</p>
                                </div>
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={settings.notifications}
                                        onChange={(e) => handleChange('notifications', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                </div>
                            </label>
                            <label className="flex items-center justify-between cursor-pointer">
                                <div>
                                    <p className="font-medium text-gray-700">Email Alerts</p>
                                    <p className="text-sm text-gray-500">Receive email notifications for low stock alerts</p>
                                </div>
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={settings.emailAlerts}
                                        onChange={(e) => handleChange('emailAlerts', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                </div>
                            </label>
                        </div>
                    </Card>

                    {/* Security Settings */}
                    <Card title="Security" icon={<Lock className="w-5 h-5" />}>
                        <label className="flex items-center justify-between cursor-pointer">
                            <div>
                                <p className="font-medium text-gray-700">Two-Factor Authentication</p>
                                <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                            </div>
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    checked={settings.twoFactorAuth}
                                    onChange={(e) => handleChange('twoFactorAuth', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                            </div>
                        </label>
                    </Card>

                    {/* Preferences Settings */}
                    <Card title="Preferences" icon={<Globe className="w-5 h-5" />}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                                <select
                                    value={settings.language}
                                    onChange={(e) => handleChange('language', e.target.value)}
                                    className="input-field w-48"
                                >
                                    <option value="id">Bahasa Indonesia</option>
                                    <option value="en">English</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => handleChange('theme', 'light')}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${settings.theme === 'light' ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-200'}`}
                                    >
                                        <Sun className="w-4 h-4" /> Light
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleChange('theme', 'dark')}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${settings.theme === 'dark' ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-200'}`}
                                    >
                                        <Moon className="w-4 h-4" /> Dark
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <div className="flex justify-end">
                        <button type="submit" className="btn-primary flex items-center gap-2">
                            <Save className="w-4 h-4" /> Save Settings
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Settings;