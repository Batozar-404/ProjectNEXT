/**
 * VALIDATION UTILS
 * Berisi fungsi-fungsi validasi untuk form dan input
 */

import { REGEX_PATTERNS } from './constants';

// ========================================
// EMAIL VALIDATION
// ========================================
export const validateEmail = (email) => {
    if (!email) {
        return { isValid: false, message: 'Email is required' };
    }
    if (!REGEX_PATTERNS.EMAIL.test(email)) {
        return { isValid: false, message: 'Please enter a valid email address' };
    }
    return { isValid: true, message: '' };
};

// ========================================
// PASSWORD VALIDATION
// ========================================
export const validatePassword = (password) => {
    if (!password) {
        return { isValid: false, message: 'Password is required' };
    }
    if (password.length < 6) {
        return { isValid: false, message: 'Password must be at least 6 characters' };
    }
    if (!REGEX_PATTERNS.PASSWORD.test(password)) {
        return {
            isValid: false,
            message: 'Password must contain at least 1 letter and 1 number'
        };
    }
    return { isValid: true, message: '' };
};

export const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) {
        return { isValid: false, message: 'Please confirm your password' };
    }
    if (password !== confirmPassword) {
        return { isValid: false, message: 'Passwords do not match' };
    }
    return { isValid: true, message: '' };
};

// ========================================
// NAME VALIDATION
// ========================================
export const validateName = (name, fieldName = 'Name') => {
    if (!name) {
        return { isValid: false, message: `${fieldName} is required` };
    }
    if (name.length < 2) {
        return { isValid: false, message: `${fieldName} must be at least 2 characters` };
    }
    if (name.length > 100) {
        return { isValid: false, message: `${fieldName} must be less than 100 characters` };
    }
    return { isValid: true, message: '' };
};

// ========================================
// SKU VALIDATION
// ========================================
export const validateSKU = (sku) => {
    if (!sku) {
        return { isValid: false, message: 'SKU is required' };
    }
    if (!REGEX_PATTERNS.SKU.test(sku)) {
        return {
            isValid: false,
            message: 'SKU must be 3-20 characters, uppercase letters, numbers, hyphens, or underscores'
        };
    }
    return { isValid: true, message: '' };
};

// ========================================
// SLUG VALIDATION
// ========================================
export const validateSlug = (slug) => {
    if (!slug) {
        return { isValid: false, message: 'Slug is required' };
    }
    if (!REGEX_PATTERNS.SLUG.test(slug)) {
        return {
            isValid: false,
            message: 'Slug must contain only lowercase letters, numbers, and hyphens'
        };
    }
    return { isValid: true, message: '' };
};

// ========================================
// PHONE VALIDATION
// ========================================
export const validatePhone = (phone) => {
    if (!phone) {
        return { isValid: false, message: 'Phone number is required' };
    }
    if (!REGEX_PATTERNS.PHONE.test(phone)) {
        return { isValid: false, message: 'Please enter a valid phone number (10-13 digits)' };
    }
    return { isValid: true, message: '' };
};

// ========================================
// NUMBER VALIDATION
// ========================================
export const validateNumber = (value, fieldName = 'Value', min = 0, max = null) => {
    const num = Number(value);
    if (isNaN(num)) {
        return { isValid: false, message: `${fieldName} must be a valid number` };
    }
    if (num < min) {
        return { isValid: false, message: `${fieldName} must be at least ${min}` };
    }
    if (max !== null && num > max) {
        return { isValid: false, message: `${fieldName} must be less than ${max}` };
    }
    return { isValid: true, message: '' };
};

// ========================================
// PRICE VALIDATION
// ========================================
export const validatePrice = (price, fieldName = 'Price') => {
    const num = Number(price);
    if (isNaN(num)) {
        return { isValid: false, message: `${fieldName} must be a valid number` };
    }
    if (num < 0) {
        return { isValid: false, message: `${fieldName} cannot be negative` };
    }
    return { isValid: true, message: '' };
};

// ========================================
// QUANTITY VALIDATION
// ========================================
export const validateQuantity = (quantity, maxStock = null) => {
    const num = Number(quantity);
    if (isNaN(num)) {
        return { isValid: false, message: 'Quantity must be a valid number' };
    }
    if (num <= 0) {
        return { isValid: false, message: 'Quantity must be greater than 0' };
    }
    if (maxStock !== null && num > maxStock) {
        return { isValid: false, message: `Quantity cannot exceed available stock (${maxStock})` };
    }
    return { isValid: true, message: '' };
};

// ========================================
// REQUIRED FIELD VALIDATION
// ========================================
export const validateRequired = (value, fieldName = 'This field') => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
        return { isValid: false, message: `${fieldName} is required` };
    }
    return { isValid: true, message: '' };
};

// ========================================
// SELECT VALIDATION
// ========================================
export const validateSelect = (value, fieldName = 'This field') => {
    if (!value || value === '' || value === '0') {
        return { isValid: false, message: `Please select a ${fieldName.toLowerCase()}` };
    }
    return { isValid: true, message: '' };
};

// ========================================
// URL VALIDATION
// ========================================
export const validateURL = (url) => {
    if (!url) return { isValid: true, message: '' };
    try {
        new URL(url);
        return { isValid: true, message: '' };
    } catch {
        return { isValid: false, message: 'Please enter a valid URL' };
    }
};

// ========================================
// PRODUCT FORM VALIDATION
// ========================================
export const validateProductForm = (data) => {
    const errors = {};

    const skuValidation = validateSKU(data.sku);
    if (!skuValidation.isValid) errors.sku = skuValidation.message;

    const nameValidation = validateName(data.name, 'Product name');
    if (!nameValidation.isValid) errors.name = nameValidation.message;

    const priceValidation = validatePrice(data.sell_price, 'Selling price');
    if (!priceValidation.isValid) errors.sell_price = priceValidation.message;

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

// ========================================
// REGISTER FORM VALIDATION
// ========================================
export const validateRegisterForm = (data) => {
    const errors = {};

    const tenantNameValidation = validateName(data.tenant_name, 'Tenant name');
    if (!tenantNameValidation.isValid) errors.tenant_name = tenantNameValidation.message;

    const slugValidation = validateSlug(data.slug);
    if (!slugValidation.isValid) errors.slug = slugValidation.message;

    const ownerNameValidation = validateName(data.owner_name, 'Owner name');
    if (!ownerNameValidation.isValid) errors.owner_name = ownerNameValidation.message;

    const emailValidation = validateEmail(data.owner_email);
    if (!emailValidation.isValid) errors.owner_email = emailValidation.message;

    const passwordValidation = validatePassword(data.password);
    if (!passwordValidation.isValid) errors.password = passwordValidation.message;

    const confirmValidation = validateConfirmPassword(data.password, data.confirmPassword);
    if (!confirmValidation.isValid) errors.confirmPassword = confirmValidation.message;

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

// ========================================
// LOGIN FORM VALIDATION
// ========================================
export const validateLoginForm = (data) => {
    const errors = {};

    const emailValidation = validateEmail(data.email);
    if (!emailValidation.isValid) errors.email = emailValidation.message;

    const passwordValidation = validateRequired(data.password, 'Password');
    if (!passwordValidation.isValid) errors.password = passwordValidation.message;

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

// ========================================
// TRANSFER FORM VALIDATION
// ========================================
export const validateTransferForm = (data) => {
    const errors = {};

    const fromStoreValidation = validateSelect(data.from_store_id, 'From store');
    if (!fromStoreValidation.isValid) errors.from_store_id = fromStoreValidation.message;

    const toStoreValidation = validateSelect(data.to_store_id, 'To store');
    if (!toStoreValidation.isValid) errors.to_store_id = toStoreValidation.message;

    if (data.from_store_id === data.to_store_id && data.from_store_id) {
        errors.to_store_id = 'Cannot transfer to the same store';
    }

    if (!data.items || data.items.length === 0) {
        errors.items = 'At least one item is required';
    } else {
        data.items.forEach((item, index) => {
            if (!item.product_id) {
                errors[`items.${index}.product_id`] = 'Product is required';
            }
            const quantityValidation = validateQuantity(item.quantity);
            if (!quantityValidation.isValid) {
                errors[`items.${index}.quantity`] = quantityValidation.message;
            }
        });
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

// ========================================
// EXPORT DEFAULT
// ========================================
const validation = {
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    validateName,
    validateSKU,
    validateSlug,
    validatePhone,
    validateNumber,
    validatePrice,
    validateQuantity,
    validateRequired,
    validateSelect,
    validateURL,
    validateProductForm,
    validateRegisterForm,
    validateLoginForm,
    validateTransferForm
};

export default validation;