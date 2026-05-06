import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Bell, Search, User, ChevronDown } from 'lucide-react';

const Navbar = () => {
    const { user } = useAuth();
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    return (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
            <div className="flex items-center justify-between px-6 py-3">
                <div className="flex items-center flex-1">
                    <div className="hidden md:flex items-center bg-gray-50 rounded-lg px-3 py-2 w-96">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent ml-2 text-sm text-gray-600 placeholder-gray-400 focus:outline-none flex-1"
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    <div className="relative">
                        <button
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                {user?.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <span className="hidden md:block text-sm font-medium text-gray-700">
                                {user?.name || 'User'}
                            </span>
                            <ChevronDown className="hidden md:block w-4 h-4 text-gray-500" />
                        </button>

                        {showProfileMenu && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)}></div>
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                        Your Profile
                                    </Link>
                                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                        Settings
                                    </Link>
                                    <hr className="my-1" />
                                    <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">
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