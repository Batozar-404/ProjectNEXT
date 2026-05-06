import api from './api';

// Get all transfers
export const getTransfers = (params = {}) => {
    return api.get('/transfers', { params });
};

// Get single transfer by ID
export const getTransfer = (id) => {
    return api.get(`/transfers/${id}`);
};

// Create new transfer request
export const createTransfer = (data) => {
    return api.post('/transfers', data);
};

// Approve transfer
export const approveTransfer = (id) => {
    return api.put(`/transfers/${id}/approve`);
};

// Reject transfer
export const rejectTransfer = (id, notes) => {
    return api.put(`/transfers/${id}/reject`, { notes });
};

// Cancel transfer
export const cancelTransfer = (id) => {
    return api.put(`/transfers/${id}/cancel`);
};

// Get transfers by status (pending, approved, completed, rejected)
export const getTransfersByStatus = (status) => {
    return api.get('/transfers', { params: { status } });
};

// Get transfers by store
export const getTransfersByStore = (storeId) => {
    return api.get(`/stores/${storeId}/transfers`);
};

// Export default untuk kemudahan import
const transferService = {
    getTransfers,
    getTransfer,
    createTransfer,
    approveTransfer,
    rejectTransfer,
    cancelTransfer,
    getTransfersByStatus,
    getTransfersByStore
};

export default transferService;