const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { authenticate } = require('../middlewares/auth');

// Validation rules
const registerValidation = [
    body('tenant_name').notEmpty().withMessage('Tenant name is required'),
    body('slug').notEmpty().withMessage('Slug is required'),
    body('owner_name').notEmpty().withMessage('Owner name is required'),
    body('owner_email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const loginValidation = [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
];

router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);
router.get('/me', authenticate, authController.getMe);

module.exports = router;