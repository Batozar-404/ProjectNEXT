import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout/Layout';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Transfers from './pages/Transfers';
import Admins from './pages/Admins';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Stores from './pages/Stores';
import Notifications from './pages/Notifications';
import HelpCenter from './pages/HelpCenter';

// Loading Component
const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
    </div>
);

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { token, loading } = useAuth();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!token) return <Navigate to="/login" />;
    return children;
};

// Public Route Component (redirect to dashboard if already logged in)
const PublicRoute = ({ children }) => {
    const { token, loading } = useAuth();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (token) return <Navigate to="/" />;
    return children;
};

// Main App Routes
function AppRoutes() {
    const { token } = useAuth();

    return (
        <Routes>
            {/* Public Routes */}
            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />
            <Route
                path="/register"
                element={
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                }
            />

            {/* Protected Routes (with Layout) */}
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Layout />
                    </ProtectedRoute>
                }
            >
                {/* Dashboard */}
                <Route index element={<Dashboard />} />

                {/* Product Management */}
                <Route path="products" element={<Products />} />
                <Route path="products/:id" element={<ProductDetail />} />

                {/* Transfer Management */}
                <Route path="transfers" element={<Transfers />} />

                {/* Reports */}
                <Route path="reports" element={<Reports />} />

                {/* Admin Only Routes */}
                <Route path="admins" element={<Admins />} />
                <Route path="stores" element={<Stores />} />
                <Route path="notifications" element={<Notifications />} />

                {/* User Settings */}
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
                <Route path="help" element={<HelpCenter />} />

                {/* 404 Catch All */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
}

// Main App Component
function App() {
    return (
        <Router>
            <AuthProvider>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: '#363636',
                            color: '#fff',
                            borderRadius: '12px',
                            padding: '12px 16px',
                        },
                        success: {
                            duration: 3000,
                            iconTheme: {
                                primary: '#10b981',
                                secondary: '#fff',
                            },
                            style: {
                                background: '#059669',
                                color: '#fff',
                            },
                        },
                        error: {
                            duration: 4000,
                            iconTheme: {
                                primary: '#ef4444',
                                secondary: '#fff',
                            },
                            style: {
                                background: '#dc2626',
                                color: '#fff',
                            },
                        },
                        loading: {
                            style: {
                                background: '#3b82f6',
                                color: '#fff',
                            },
                        },
                    }}
                />
                <AppRoutes />
            </AuthProvider>
        </Router>
    );
}

export default App;