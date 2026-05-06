/**
 * CONSTANTS FILE
 * Berisi konstanta global yang digunakan di seluruh aplikasi
 */

// ========================================
// API CONFIGURATION
// ========================================
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
export const API_TIMEOUT = 10000; // 10 seconds

// ========================================
// USER ROLES
// ========================================
export const USER_ROLES = {
    TENANT_OWNER: 'tenant_owner',
    STORE_MANAGER: 'store_manager',
    STAFF: 'staff',
    ADMIN: 'admin'
};

export const USER_ROLES_LABEL = {
    [USER_ROLES.TENANT_OWNER]: 'Tenant Owner',
    [USER_ROLES.STORE_MANAGER]: 'Store Manager',
    [USER_ROLES.STAFF]: 'Staff',
    [USER_ROLES.ADMIN]: 'Administrator'
};

// ========================================
// TRANSFER STATUS
// ========================================
export const TRANSFER_STATUS = {
    PENDING: 'pending',
    APPROVED: 'approved',
    IN_TRANSIT: 'in_transit',
    COMPLETED: 'completed',
    REJECTED: 'rejected',
    CANCELLED: 'cancelled'
};

export const TRANSFER_STATUS_LABEL = {
    [TRANSFER_STATUS.PENDING]: 'Pending',
    [TRANSFER_STATUS.APPROVED]: 'Approved',
    [TRANSFER_STATUS.IN_TRANSIT]: 'In Transit',
    [TRANSFER_STATUS.COMPLETED]: 'Completed',
    [TRANSFER_STATUS.REJECTED]: 'Rejected',
    [TRANSFER_STATUS.CANCELLED]: 'Cancelled'
};

export const TRANSFER_STATUS_COLOR = {
    [TRANSFER_STATUS.PENDING]: 'text-yellow-600 bg-yellow-100',
    [TRANSFER_STATUS.APPROVED]: 'text-green-600 bg-green-100',
    [TRANSFER_STATUS.IN_TRANSIT]: 'text-blue-600 bg-blue-100',
    [TRANSFER_STATUS.COMPLETED]: 'text-green-600 bg-green-100',
    [TRANSFER_STATUS.REJECTED]: 'text-red-600 bg-red-100',
    [TRANSFER_STATUS.CANCELLED]: 'text-gray-600 bg-gray-100'
};

// ========================================
// PRODUCT STATUS
// ========================================
export const PRODUCT_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive'
};

export const STOCK_STATUS = {
    IN_STOCK: 'in_stock',
    LOW_STOCK: 'low_stock',
    OUT_OF_STOCK: 'out_of_stock'
};

export const STOCK_STATUS_LABEL = {
    [STOCK_STATUS.IN_STOCK]: 'In Stock',
    [STOCK_STATUS.LOW_STOCK]: 'Low Stock',
    [STOCK_STATUS.OUT_OF_STOCK]: 'Out of Stock'
};

export const STOCK_STATUS_COLOR = {
    [STOCK_STATUS.IN_STOCK]: 'text-green-600 bg-green-100',
    [STOCK_STATUS.LOW_STOCK]: 'text-yellow-600 bg-yellow-100',
    [STOCK_STATUS.OUT_OF_STOCK]: 'text-red-600 bg-red-100'
};

// ========================================
// UNIT TYPES
// ========================================
export const UNIT_TYPES = [
    { value: 'pcs', label: 'Pieces (pcs)' },
    { value: 'kg', label: 'Kilogram (kg)' },
    { value: 'gram', label: 'Gram (g)' },
    { value: 'liter', label: 'Liter (L)' },
    { value: 'ml', label: 'Milliliter (ml)' },
    { value: 'box', label: 'Box' },
    { value: 'pack', label: 'Pack' },
    { value: 'dozen', label: 'Dozen' }
];

// ========================================
// PAGINATION
// ========================================
export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

// ========================================
// DATE FORMATS
// ========================================
export const DATE_FORMAT = {
    DATE: 'DD/MM/YYYY',
    TIME: 'HH:mm',
    DATE_TIME: 'DD/MM/YYYY HH:mm',
    API_DATE: 'YYYY-MM-DD',
    API_DATE_TIME: 'YYYY-MM-DD HH:mm:ss'
};

// ========================================
// FILE UPLOAD
// ========================================
export const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
export const ALLOWED_FILE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

// ========================================
// LOCAL STORAGE KEYS
// ========================================
export const STORAGE_KEYS = {
    TOKEN: 'token',
    USER: 'user',
    THEME: 'theme',
    LANGUAGE: 'language',
    TENANT_ID: 'tenant_id'
};

// ========================================
// THEME
// ========================================
export const THEMES = {
    LIGHT: 'light',
    DARK: 'dark'
};

// ========================================
// LANGUAGE
// ========================================
export const LANGUAGES = {
    ID: 'id',
    EN: 'en'
};

export const LANGUAGE_LABEL = {
    [LANGUAGES.ID]: 'Bahasa Indonesia',
    [LANGUAGES.EN]: 'English'
};

// ========================================
// NOTIFICATION TYPES
// ========================================
export const NOTIFICATION_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info'
};

// ========================================
// REGEX PATTERNS
// ========================================
export const REGEX_PATTERNS = {
    EMAIL: /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/,
    PHONE: /^[0-9]{10,13}$/,
    SKU: /^[A-Z0-9\-_]{3,20}$/,
    PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
    SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/
};

// ========================================
// EXPORT DEFAULT
// ========================================
const constants = {
    API_BASE_URL,
    API_TIMEOUT,
    USER_ROLES,
    USER_ROLES_LABEL,
    TRANSFER_STATUS,
    TRANSFER_STATUS_LABEL,
    TRANSFER_STATUS_COLOR,
    PRODUCT_STATUS,
    STOCK_STATUS,
    STOCK_STATUS_LABEL,
    STOCK_STATUS_COLOR,
    UNIT_TYPES,
    DEFAULT_PAGE,
    DEFAULT_LIMIT,
    PAGE_SIZE_OPTIONS,
    DATE_FORMAT,
    MAX_FILE_SIZE,
    ALLOWED_FILE_TYPES,
    ALLOWED_FILE_EXTENSIONS,
    STORAGE_KEYS,
    THEMES,
    LANGUAGES,
    LANGUAGE_LABEL,
    NOTIFICATION_TYPES,
    REGEX_PATTERNS
};

export default constants;