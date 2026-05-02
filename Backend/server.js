const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET = 'secret123';

// ========== MIDDLEWARE (HARUS DI PALING ATAS!) ==========
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());  // ⚠️ INI YANG PENTING - HARUS SEBELUM ROUTES
app.use(express.urlencoded({ extended: true }));

// ========== STATIC FILES (buat akses gambar) ==========
app.use('/uploads', express.static('uploads'));

// ========== DATA SEMENTARA ==========
let users = [];
let products = [];
let transfers = [];

// ========== MIDDLEWARE AUTH ==========
function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Access token required' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

// ========== SETUP UPLOAD FOLDER ==========
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    console.log('📁 Folder uploads dibuat');
}

// ========== KONFIGURASI MULTER ==========
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const productId = req.params.id;
        const ext = path.extname(file.originalname);
        const filename = `product-${productId}-${Date.now()}${ext}`;
        cb(null, filename);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Hanya file gambar yang diperbolehkan (jpeg, jpg, png, gif, webp)'));
        }
    }
});

// ========== ROUTES ==========

// Health check (tanpa auth)
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Inventori.Multi API is running'
    });
});

// Register (tanpa auth)
app.post('/api/auth/register', async (req, res) => {
    console.log('Register request body:', req.body);

    const { owner_name, owner_email, password, tenant_name, slug } = req.body;

    if (!owner_email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email dan password wajib diisi'
        });
    }

    const existing = users.find(u => u.owner_email === owner_email);
    if (existing) {
        return res.status(400).json({
            success: false,
            message: 'Email already exists'
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
        id: users.length + 1,
        owner_name: owner_name || 'Unknown',
        owner_email,
        password: hashedPassword,
        tenant_name: tenant_name || 'Toko Baru',
        slug: slug || 'toko-baru'
    };

    users.push(user);

    const token = jwt.sign({ id: user.id, email: user.owner_email }, SECRET, { expiresIn: '24h' });

    res.status(201).json({
        success: true,
        token,
        user: {
            id: user.id,
            name: user.owner_name,
            email: user.owner_email
        }
    });
});

// Login (tanpa auth)
app.post('/api/auth/login', async (req, res) => {
    console.log('Login request body:', req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email dan password wajib diisi'
        });
    }

    const user = users.find(u => u.owner_email === email);
    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'User not found'
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({
            success: false,
            message: 'Wrong password'
        });
    }

    const token = jwt.sign({ id: user.id, email: user.owner_email }, SECRET, { expiresIn: '24h' });

    res.json({
        success: true,
        token,
        user: {
            id: user.id,
            name: user.owner_name,
            email: user.owner_email
        }
    });
});

// Create Product (TANPA AUTH - sesuai kode asli)
app.post('/api/products', (req, res) => {
    console.log('Create product request:', req.body);

    const { sku, name, category_id, unit, cost_price, sell_price } = req.body;

    if (!sku || !name) {
        return res.status(400).json({
            success: false,
            message: 'SKU dan name wajib diisi'
        });
    }

    const existing = products.find(p => p.sku === sku);
    if (existing) {
        return res.status(400).json({
            success: false,
            message: 'SKU already exists'
        });
    }

    const newProduct = {
        id: products.length + 1,
        sku,
        name,
        category_id: category_id || null,
        unit: unit || 'pcs',
        cost_price: cost_price || 0,
        sell_price: sell_price || 0,
        image_url: null,
        created_at: new Date()
    };

    products.push(newProduct);

    res.status(201).json({
        success: true,
        data: newProduct
    });
});

// Get All Products (TANPA AUTH - sesuai kode asli)
app.get('/api/products', (req, res) => {
    res.json({
        success: true,
        data: products,
        total: products.length
    });
});

// Get Product by ID (TAMBAHAN - biar bisa lihat detail produk)
app.get('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);

    if (product) {
        res.json({
            success: true,
            data: product
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }
});

// Update Product (TANPA AUTH - sesuai kode asli)
app.put('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);

    if (index !== -1) {
        products[index] = { ...products[index], ...req.body };
        res.json({ success: true, data: products[index] });
    } else {
        res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }
});

// Delete Product (PAKAI AUTH - sesuai kode asli)
app.delete('/api/products/:id', authMiddleware, (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);

    if (index !== -1) {
        products = products.filter(p => p.id !== id);
        res.json({ success: true, message: 'Product deleted' });
    } else {
        res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }
});

// ========== UPLOAD PRODUCT IMAGE (ROUTE BARU) ==========
app.post('/api/products/:id/upload-image', authMiddleware, upload.single('file'), (req, res) => {
    const productId = parseInt(req.params.id);

    // Cek apakah produk ada
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }

    // Cek apakah file diupload
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: 'No file uploaded'
        });
    }

    // Simpan image_url ke produk
    const imageUrl = `/uploads/${req.file.filename}`;
    products[productIndex].image_url = imageUrl;

    res.json({
        success: true,
        message: 'Image uploaded successfully',
        image_url: imageUrl
    });
});

// Create transfer request
app.post('/api/transfers', authMiddleware, (req, res) => {
    const { from_store_id, to_store_id, items, notes } = req.body;

    // Validasi
    if (!from_store_id || !to_store_id || !items || items.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'from_store_id, to_store_id, dan items wajib diisi'
        });
    }

    const newTransfer = {
        id: transfers.length + 1,
        from_store_id,
        to_store_id,
        items,
        notes: notes || '',
        status: 'pending',
        created_at: new Date(),
        created_by: req.user.id
    };

    transfers.push(newTransfer);

    res.status(201).json({
        success: true,
        data: newTransfer
    });
});

// Get all transfers
app.get('/api/transfers', authMiddleware, (req, res) => {
    res.json({
        success: true,
        data: transfers
    });
});

// Get transfer by ID
app.get('/api/transfers/:id', authMiddleware, (req, res) => {
    const id = parseInt(req.params.id);
    const transfer = transfers.find(t => t.id === id);

    if (!transfer) {
        return res.status(404).json({
            success: false,
            message: 'Transfer not found'
        });
    }

    res.json({
        success: true,
        data: transfer
    });
});

// Approve transfer
app.put('/api/transfers/:id/approve', authMiddleware, (req, res) => {
    const id = parseInt(req.params.id);
    const transfer = transfers.find(t => t.id === id);

    if (!transfer) {
        return res.status(404).json({
            success: false,
            message: 'Transfer not found'
        });
    }

    if (transfer.status !== 'pending') {
        return res.status(400).json({
            success: false,
            message: `Transfer already ${transfer.status}`
        });
    }

    transfer.status = 'approved';
    transfer.approved_at = new Date();

    res.json({
        success: true,
        message: 'Transfer approved',
        data: transfer
    });
});

// Reject transfer
app.put('/api/transfers/:id/reject', authMiddleware, (req, res) => {
    const id = parseInt(req.params.id);
    const transfer = transfers.find(t => t.id === id);

    if (!transfer) {
        return res.status(404).json({
            success: false,
            message: 'Transfer not found'
        });
    }

    if (transfer.status !== 'pending') {
        return res.status(400).json({
            success: false,
            message: `Transfer already ${transfer.status}`
        });
    }

    transfer.status = 'rejected';
    transfer.rejected_at = new Date();

    res.json({
        success: true,
        message: 'Transfer rejected',
        data: transfer
    });
});
// Error handler untuk multer
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'FILE_TOO_LARGE') {
            return res.status(400).json({
                success: false,
                message: 'File terlalu besar. Maksimal 5MB'
            });
        }
    }

    if (error.message && error.message.includes('Only image files')) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }

    next(error);
});

// ========== RUN SERVER ==========
app.listen(PORT, () => {
    console.log(`\n🚀 Server running on port ${PORT}`);
    console.log(`📋 Health check: http://localhost:${PORT}/health`);
    console.log(`📁 Upload folder: ${uploadDir}`);
    console.log(`\n✅ Available routes:`);
    console.log(`   POST   /api/auth/register`);
    console.log(`   POST   /api/auth/login`);
    console.log(`   GET    /api/products`);
    console.log(`   GET    /api/products/:id`);
    console.log(`   POST   /api/products`);
    console.log(`   PUT    /api/products/:id`);
    console.log(`   DELETE /api/products/:id (butuh auth)`);
    console.log(`   POST   /api/products/:id/upload-image (butuh auth)`);
    console.log(`   POST   /api/transfers (butuh auth)`);
    console.log(`   GET    /api/transfers (butuh auth)`);
    console.log(`   GET    /api/transfers/:id (butuh auth)`);
    console.log(`   PUT    /api/transfers/:id/approve (butuh auth)`);
    console.log(`   PUT    /api/transfers/:id/reject (butuh auth)`);
});