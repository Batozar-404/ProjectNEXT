const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

// Mengambil instance app dari folder src
const app = require('./src/app'); 
// Deklarasi testConnection CUKUP SATU KALI
const { testConnection } = require('./src/config/database');

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Inventori.Multi API is running',
        timestamp: new Date().toISOString()
    });
});

const startServer = async () => {
    // Test database connection
    const dbConnected = await testConnection();

    if (!dbConnected) {
        console.error('❌ Cannot start server without database connection');
        process.exit(1);
    }

    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`📍 API URL: http://localhost:${PORT}`);
        console.log(`📍 Health check: http://localhost:${PORT}/health`);
    });
};

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!'
    });
});

startServer();