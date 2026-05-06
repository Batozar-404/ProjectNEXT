import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, ArrowRightLeft, FileText, Shield, Users, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
    const { logout, user } = useAuth();

    const menuItems = [
        { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/products', icon: Package, label: 'Products' },
        { path: '/transfers', icon: ArrowRightLeft, label: 'Transfers' },
        { path: '/reports', icon: FileText, label: 'Reports' },
    ];

    const isAdmin = user?.role === 'admin' || user?.role === 'tenant_owner';

    return (
        <div className="w-64 bg-gray-900 text-white flex flex-col flex-shrink-0 h-screen sticky top-0">
            <div className="p-5 border-b border-gray-800">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                    Inventori.Multi
                </h1>
                <p className="text-[10px] text-gray-500 mt-0.5">Multi-Tenant Inventory</p>
            </div>

            <nav className="flex-1 mt-6 px-3">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center px-3 py-2.5 my-1 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200 ${isActive ? 'bg-gray-800 text-white' : ''
                            }`
                        }
                    >
                        <item.icon className="w-5 h-5 mr-3" />
                        <span className="text-sm">{item.label}</span>
                    </NavLink>
                ))}

                {isAdmin && (
                    <NavLink
                        to="/admins"
                        className={({ isActive }) =>
                            `flex items-center px-3 py-2.5 my-1 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200 ${isActive ? 'bg-gray-800 text-white' : ''
                            }`
                        }
                    >
                        <Shield className="w-5 h-5 mr-3" />
                        <span className="text-sm">Admins</span>
                    </NavLink>
                )}
            </nav>

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