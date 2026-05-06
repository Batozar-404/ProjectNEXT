import { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister } from '../services/authService';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    setUser(JSON.parse(storedUser));
                } catch (e) {
                    console.error('Failed to parse user:', e);
                }
            }
        }
        setLoading(false);
    }, [token]);

    const login = async (email, password) => {
        try {
            const response = await apiLogin(email, password);
            const { token: newToken, user: userData } = response.data;

            localStorage.setItem('token', newToken);
            localStorage.setItem('user', JSON.stringify(userData));

            setToken(newToken);
            setUser(userData);

            toast.success('Login berhasil!');
            return true;
        } catch (error) {
            console.error('Login error:', error);
            const message = error.response?.data?.message || error.response?.data?.error || 'Login gagal';
            toast.error(message);
            return false;
        }
    };

    const register = async (data) => {
        try {
            const response = await apiRegister(data);
            const { token: newToken, user: userData } = response.data;

            localStorage.setItem('token', newToken);
            localStorage.setItem('user', JSON.stringify(userData));

            setToken(newToken);
            setUser(userData);

            toast.success('Registrasi berhasil!');
            return true;
        } catch (error) {
            console.error('Register error:', error);
            const message = error.response?.data?.message || 'Registrasi gagal';
            toast.error(message);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        toast.success('Logout berhasil');
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};