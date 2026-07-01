import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Bell, Search, User, ChevronDown, LogOut, Settings, UserCircle } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth(); // ✅ Ambil logout dari context
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const avatarUrl = user?.avatar
        ? `${import.meta.env.VITE_API_URL}${user.avatar}`
        : null;

    return (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-40 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between px-6 py-3">
                {/* Search Bar */}
                <div className="flex items-center flex-1">
                    <div className="hidden md:flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2 w-96">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent ml-2 text-sm text-gray-600 dark:text-gray-300 placeholder-gray-400 focus:outline-none flex-1"
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    {/* Notifications */}
                    <button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {/* Profile Menu */}
                    <div className="relative">
                        <button
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                                {avatarUrl ? (
                                    <img src={avatarUrl} alt={user?.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-white text-sm font-semibold">
                                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                                    </span>
                                )}
                            </div>
                            <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">
                                {user?.name || 'User'}
                            </span>
                            <ChevronDown className="hidden md:block w-4 h-4 text-gray-500" />
                        </button>

                        {showProfileMenu && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)}></div>
                                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 py-1 z-50">
                                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                                                {avatarUrl ? (
                                                    <img src={avatarUrl} alt={user?.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-white text-sm font-semibold">
                                                        {user?.name?.charAt(0).toUpperCase()}
                                                    </span>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{user?.name}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <Link
                                        to="/profile"
                                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                        onClick={() => setShowProfileMenu(false)}
                                    >
                                        <UserCircle className="w-4 h-4" />
                                        Your Profile
                                    </Link>
                                    <Link
                                        to="/settings"
                                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                        onClick={() => setShowProfileMenu(false)}
                                    >
                                        <Settings className="w-4 h-4" />
                                        Settings
                                    </Link>
                                    <hr className="my-1 border-gray-100 dark:border-gray-700" />
                                    <button
                                        onClick={() => {
                                            setShowProfileMenu(false);
                                            logout(); // ✅ Panggil logout
                                        }}
                                        className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Sign out
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;