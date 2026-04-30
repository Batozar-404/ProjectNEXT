const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Tenant = require('../models/Tenant');
const { successResponse, errorResponse } = require('../utils/response');
const { validationResult } = require('express-validator');

const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return errorResponse(res, 'Validation failed', errors.array(), 400);
        }

        const { tenant_name, slug, owner_name, owner_email, password } = req.body;

        // Check if tenant already exists
        const existingTenant = await Tenant.findBySlug(slug);
        if (existingTenant) {
            return errorResponse(res, 'Tenant slug already exists', null, 400);
        }

        // Check if owner email already used
        const existingUser = await User.findByEmail(null, owner_email);
        if (existingUser) {
            return errorResponse(res, 'Email already registered', null, 400);
        }

        // Create tenant
        const tenant = await Tenant.create({
            name: tenant_name,
            slug: slug,
            owner_email: owner_email,
            plan: 'free'
        });

        // Create owner user
        const user = await User.create(tenant.id, {
            name: owner_name,
            email: owner_email,
            password: password,
            role: 'tenant_owner'
        });

        // Generate token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role,
                tenant_id: tenant.id,
                tenant_slug: tenant.slug
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );

        successResponse(res, 'Registration successful', { token, user, tenant }, 201);
    } catch (error) {
        errorResponse(res, 'Registration failed', error);
    }
};

const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return errorResponse(res, 'Validation failed', errors.array(), 400);
        }

        const { email, password } = req.body;

        // Simplified login - ini akan di-improve dengan tenant context nanti
        // Untuk sprint ini, kita coba cari user di semua tenant

        // Query ambil user dengan join ke tenant
        const { pool } = require('../config/database');
        const [rows] = await pool.query(
            `SELECT u.*, t.slug as tenant_slug, t.name as tenant_name
       FROM users u
       JOIN tenants t ON u.tenant_id = t.id
       WHERE u.email = ? AND u.status = 'active'`,
            [email]
        );

        const user = rows[0];

        if (!user) {
            return errorResponse(res, 'Invalid email or password', null, 401);
        }

        const isValidPassword = await User.verifyPassword(user, password);

        if (!isValidPassword) {
            return errorResponse(res, 'Invalid email or password', null, 401);
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role,
                tenant_id: user.tenant_id,
                tenant_slug: user.tenant_slug,
                store_id: user.store_id
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );

        successResponse(res, 'Login successful', {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                tenant_id: user.tenant_id,
                tenant_name: user.tenant_name,
                store_id: user.store_id
            }
        });
    } catch (error) {
        errorResponse(res, 'Login failed', error);
    }
};

const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.tenant_id, req.user.id);
        if (!user) {
            return errorResponse(res, 'User not found', null, 404);
        }
        successResponse(res, 'User profile retrieved', user);
    } catch (error) {
        errorResponse(res, 'Error retrieving user profile', error);
    }
};

module.exports = { register, login, getMe };