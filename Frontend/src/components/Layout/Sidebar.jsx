import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    ArrowRightLeft,
    FileText,
    Shield,
    Users,
    Settings,
    LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
    const { logout, user } = useAuth();

    // Menu Utama (semua user)
    const menuItems = [
        { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/products', icon: Package, label: 'Products' },
        { path: '/transfers', icon: ArrowRightLeft, label: 'Transfers' },
        { path: '/reports', icon: FileText, label: 'Reports' },
    ];

    // Menu Admin (hanya untuk admin/owner)
    const adminMenuItems = [
        { path: '/admins', icon: Shield, label: 'Admins' },
    ];

    // Menu Bawah (profile & settings)
    const bottomMenuItems = [
        { path: '/profile', icon: Users, label: 'Profile' },
        { path: '/settings', icon: Settings, label: 'Settings' },
    ];

    // Cek apakah user memiliki akses admin
    const isAdmin = user?.role === 'admin' || user?.role === 'tenant_owner';

    return (
        <div className="w-64 bg-gray-900 text-white flex flex-col flex-shrink-0 h-screen sticky top-0">
            {/* ===== LOGO SECTION ===== */}
            <div className="p-5 border-b border-gray-800">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                    Inventori.Multi
                </h1>
                <p className="text-[10px] text-gray-500 mt-0.5">Multi-Tenant Inventory</p>
            </div>

            {/* ===== NAVIGATION MENU ===== */}
            <nav className="flex-1 mt-6 px-3">
                {/* Main Menu */}
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center px-3 py-2.5 my-1 rounded-lg transition-all duration-200 ${isActive
                                ? 'bg-gray-800 text-white'
                                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                            }`
                        }
                    >
                        <item.icon className="w-5 h-5 mr-3" />
                        <span className="text-sm">{item.label}</span>
                    </NavLink>
                ))}

                {/* Divider */}
                <div className="h-px bg-gray-800 my-3"></div>

                {/* Admin Menu (conditional) */}
                {isAdmin && (
                    <>
                        {adminMenuItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center px-3 py-2.5 my-1 rounded-lg transition-all duration-200 ${isActive
                                        ? 'bg-gray-800 text-white'
                                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                    }`
                                }
                            >
                                <item.icon className="w-5 h-5 mr-3" />
                                <span className="text-sm">{item.label}</span>
                            </NavLink>
                        ))}
                        <div className="h-px bg-gray-800 my-3"></div>
                    </>
                )}

                {/* Bottom Menu */}
                {bottomMenuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center px-3 py-2.5 my-1 rounded-lg transition-all duration-200 ${isActive
                                ? 'bg-gray-800 text-white'
                                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                            }`
                        }
                    >
                        <item.icon className="w-5 h-5 mr-3" />
                        <span className="text-sm">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* ===== LOGOUT BUTTON ===== */}
            <div className="p-4 border-t border-gray-800">
                <button
                    onClick={logout}
                    className="flex items-center w-full px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200"
                >
                    <LogOut className="w-5 h-5 mr-3" />
                    <span className="text-sm">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;