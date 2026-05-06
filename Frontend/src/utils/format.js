/**
 * Format currency ke Rupiah
 * @param {number} amount - Nilai yang akan diformat
 * @returns {string} Format Rupiah (contoh: Rp 150.000)
 */
export const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return 'Rp 0';
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};

/**
 * Format angka dengan pemisah ribuan
 * @param {number} number - Nilai yang akan diformat
 * @returns {string} Format angka (contoh: 1.500.000)
 */
export const formatNumber = (number) => {
    if (number === null || number === undefined) return '0';
    return new Intl.NumberFormat('id-ID').format(number);
};

/**
 * Format tanggal ke format Indonesia
 * @param {string|Date} dateString - Tanggal yang akan diformat
 * @returns {string} Format tanggal (contoh: 15 Jan 2025)
 */
export const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '-';
    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }).format(date);
};

/**
 * Format tanggal lengkap dengan waktu
 * @param {string|Date} dateString - Tanggal yang akan diformat
 * @returns {string} Format tanggal lengkap (contoh: 15 Jan 2025, 14:30)
 */
export const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '-';
    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
};

/**
 * Format persentase
 * @param {number} value - Nilai persentase
 * @returns {string} Format persentase (contoh: 25%)
 */
export const formatPercentage = (value) => {
    if (value === null || value === undefined) return '0%';
    return `${Math.round(value)}%`;
};

/**
 * Format status stok
 * @param {number} currentStock - Stok saat ini
 * @param {number} minStock - Stok minimum
 * @returns {object} { text, className }
 */
export const getStockStatus = (currentStock, minStock) => {
    if (currentStock <= 0) {
        return { text: 'Out of Stock', className: 'bg-red-100 text-red-700' };
    }
    if (currentStock <= minStock) {
        return { text: 'Low Stock', className: 'bg-yellow-100 text-yellow-700' };
    }
    return { text: 'In Stock', className: 'bg-green-100 text-green-700' };
};

// Export default untuk kemudahan import (opsional)
const formatUtils = {
    formatCurrency,
    formatNumber,
    formatDate,
    formatDateTime,
    formatPercentage,
    getStockStatus
};

export default formatUtils;