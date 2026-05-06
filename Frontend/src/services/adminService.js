import api from './api';

// Get all admins
export const getAdmins = () => {
    return api.get('/admins');
};

// Get admin by ID
export const getAdmin = (id) => {
    return api.get(`/admins/${id}`);
};

// Create new admin
export const createAdmin = (data) => {
    return api.post('/admins', data);
};

// Update admin
export const updateAdmin = (id, data) => {
    return api.put(`/admins/${id}`, data);
};

// Delete admin
export const deleteAdmin = (id) => {
    return api.delete(`/admins/${id}`);
};

// Change admin status (active/inactive)
export const toggleAdminStatus = (id, status) => {
    return api.patch(`/admins/${id}/status`, { status });
};

// Export default untuk kemudahan import
const adminService = {
    getAdmins,
    getAdmin,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    toggleAdminStatus
};

export default adminService;