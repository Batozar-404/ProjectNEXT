import { useState } from 'react';
import { Bell, Lock, Globe, Palette, Sun, Moon, Save, Check } from 'lucide-react';
import Card from '../components/Common/Card';
import toast from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const Settings = () => {
    const { theme, toggleTheme } = useTheme();
    const { language, setLanguage, t } = useLanguage();

    const [settings, setSettings] = useState({
        notifications: true,
        emailAlerts: true,
        twoFactorAuth: false,
        language: language,
        theme: theme
    });

    const handleChange = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));

        // Apply changes immediately
        if (key === 'language') {
            setLanguage(value);
        }
        if (key === 'theme') {
            toggleTheme();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            toast.success(t('saveSettings') + ' berhasil!');
        } catch (error) {
            toast.error('Gagal menyimpan pengaturan');
        }
    };

    return (
        <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                    {t('settingsTitle')}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Notification Settings */}
                    <Card title={t('notifications')} icon={<Bell className="w-5 h-5" />}>
                        <div className="space-y-3">
                            <label className="flex items-center justify-between cursor-pointer">
                                <div>
                                    <p className="font-medium text-gray-700 dark:text-gray-300">{t('pushNotifications')}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('pushNotificationsDesc')}</p>
                                </div>
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={settings.notifications}
                                        onChange={(e) => handleChange('notifications', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                </div>
                            </label>
                            <label className="flex items-center justify-between cursor-pointer">
                                <div>
                                    <p className="font-medium text-gray-700 dark:text-gray-300">{t('emailAlerts')}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('emailAlertsDesc')}</p>
                                </div>
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={settings.emailAlerts}
                                        onChange={(e) => handleChange('emailAlerts', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                </div>
                            </label>
                        </div>
                    </Card>

                    {/* Security Settings */}
                    <Card title={t('security')} icon={<Lock className="w-5 h-5" />}>
                        <label className="flex items-center justify-between cursor-pointer">
                            <div>
                                <p className="font-medium text-gray-700 dark:text-gray-300">{t('twoFactorAuth')}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{t('twoFactorAuthDesc')}</p>
                            </div>
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    checked={settings.twoFactorAuth}
                                    onChange={(e) => handleChange('twoFactorAuth', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                            </div>
                        </label>
                    </Card>

                    {/* Preferences Settings */}
                    <Card title={t('preferences')} icon={<Globe className="w-5 h-5" />}>
                        <div className="space-y-4">
                            {/* Language */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    {t('language')}
                                </label>
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => handleChange('language', 'id')}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${settings.language === 'id'
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                                : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                                            }`}
                                    >
                                        {settings.language === 'id' && <Check className="w-4 h-4" />}
                                        Indonesia
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleChange('language', 'en')}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${settings.language === 'en'
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                                : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                                            }`}
                                    >
                                        {settings.language === 'en' && <Check className="w-4 h-4" />}
                                        English
                                    </button>
                                </div>
                            </div>

                            {/* Theme */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    {t('theme')}
                                </label>
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => handleChange('theme', 'light')}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${settings.theme === 'light'
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                                : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                                            }`}
                                    >
                                        <Sun className="w-4 h-4" /> {t('light')}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleChange('theme', 'dark')}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${settings.theme === 'dark'
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                                : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                                            }`}
                                    >
                                        <Moon className="w-4 h-4" /> {t('dark')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <div className="flex justify-end">
                        <button type="submit" className="btn-primary flex items-center gap-2">
                            <Save className="w-4 h-4" /> {t('saveSettings')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Settings;