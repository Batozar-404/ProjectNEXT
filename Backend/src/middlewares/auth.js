const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/response');

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return errorResponse(res, 'Access token required', null, 401);
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return errorResponse(res, 'Invalid token', null, 401);
        }
        if (error.name === 'TokenExpiredError') {
            return errorResponse(res, 'Token expired', null, 401);
        }
        return errorResponse(res, 'Authentication failed', error);
    }
};

const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return errorResponse(res, 'Unauthorized', null, 401);
        }

        if (!allowedRoles.includes(req.user.role)) {
            return errorResponse(res, 'Access denied. Insufficient permissions', null, 403);
        }

        next();
    };
};

module.exports = { authenticate, authorize };