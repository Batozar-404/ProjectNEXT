const successResponse = (res, message, data = null, statusCode = 200) => {
    res.status(statusCode).json({
        success: true,
        message,
        data,
        timestamp: new Date().toISOString()
    });
};

const errorResponse = (res, message, error = null, statusCode = 500) => {
    res.status(statusCode).json({
        success: false,
        message,
        error: error ? error.message : null,
        timestamp: new Date().toISOString()
    });
};

module.exports = { successResponse, errorResponse };