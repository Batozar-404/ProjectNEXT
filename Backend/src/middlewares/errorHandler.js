// Error handler untuk menangani 404 (Route not found)
const notFound = (req, res, next) => {
    const error = new Error(`Route not found - ${req.originalUrl}`);
    error.status = 404;
    next(error);
};

// Error handler utama (global error handler)
const errorHandler = (err, req, res, next) => {
    // Log error ke console untuk debugging
    console.error('❌ Error:', {
        message: err.message,
        stack: err.stack,
        url: req.originalUrl,
        method: req.method,
        ip: req.ip,
        timestamp: new Date().toISOString()
    });

    // Status code default = 500 (Internal Server Error)
    let statusCode = err.status || 500;
    let message = err.message || 'Terjadi kesalahan pada server';

    // Handle specific error types
    switch (err.name) {
        // 1. Validation Error (dari express-validator atau Joi)
        case 'ValidationError':
            statusCode = 400;
            message = 'Validasi gagal';
            break;

        // 2. JWT Error (Token tidak valid)
        case 'JsonWebTokenError':
            statusCode = 401;
            message = 'Token tidak valid';
            break;

        // 3. JWT Expired Error (Token kadaluarsa)
        case 'TokenExpiredError':
            statusCode = 401;
            message = 'Token sudah kadaluarsa, silakan login ulang';
            break;

        // 4. Database Error (MySQL)
        case 'ER_DUP_ENTRY':
            statusCode = 400;
            message = 'Data sudah ada di database';
            break;

        case 'ER_NO_REFERENCED_ROW_2':
            statusCode = 400;
            message = 'Data referensi tidak ditemukan';
            break;

        // 5. Multer Error (Upload file)
        case 'MulterError':
            statusCode = 400;
            if (err.code === 'LIMIT_FILE_SIZE') {
                message = 'Ukuran file terlalu besar (maksimal 2MB)';
            } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                message = 'File tidak sesuai';
            } else {
                message = 'Error saat upload file';
            }
            break;

        // 6. Syntax Error (JSON parsing)
        case 'SyntaxError':
            if (err.type === 'entity.parse.failed') {
                statusCode = 400;
                message = 'Format JSON tidak valid';
            }
            break;

        // 7. Default untuk error lain
        default:
            // Jika error memiliki status code 4xx, tetap gunakan pesan asli
            if (statusCode >= 400 && statusCode < 500) {
                message = err.message;
            }
            break;
    }

    // Response error ke client
    res.status(statusCode).json({
        success: false,
        message: message,
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
        method: req.method
    });
};

// Middleware untuk menangani async error (agar tidak perlu try-catch di setiap controller)
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

module.exports = {
    notFound,
    errorHandler,
    asyncHandler
};