import api from './api';

export const getDashboardSummary = () => {
    return api.get('/dashboard/summary');
};

export const getInventoryTrends = (params = {}) => {
    return api.get('/dashboard/trends', { params });
};

export const getLowStockProducts = () => {
    return api.get('/dashboard/low-stock');
};

export const getRecentActivities = () => {
    return api.get('/dashboard/activities');
};