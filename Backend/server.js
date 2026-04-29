const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET = 'secret123'; // bebas (nanti bisa di .env)

let users = [];

app.post('/api/auth/register', async (req, res) => {
    const { owner_email, password, owner_name } = req.body;

    // cek user sudah ada
    const existing = users.find(u => u.owner_email === owner_email);
    if (existing) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
        id: users.length + 1,
        owner_name,
        owner_email,
        password: hashedPassword
    };

    users.push(user);

    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' });

    res.json({ token });
});

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.owner_email === email);
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Wrong password' });
    }

    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' });

    res.json({ token });
});
function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Access token required' });
    }

    const token = authHeader.split(' ')[1];

    try {
// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}
// 🔴 Data sementara
let products = [];

// ✅ Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Inventori.Multi API is running'
    });
});

// ✅ POST (CREATE + VALIDASI)
app.post('/api/products', (req, res) => {
    const { sku, name } = req.body;

    // VALIDASI
    if (!sku || !name) {
        return res.status(400).json({
            success: false,
            message: 'SKU dan name wajib diisi'
        });
    }

    // CEK DUPLIKAT
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
        name
    };

    products.push(newProduct);

    res.status(201).json({
        success: true,
        data: newProduct
    });
});

// ✅ GET
app.get('/api/products', authMiddleware, (req, res) => {
    res.json(products);
});

// ✅ PUT
app.put('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);

    if (index !== -1) {
        products[index] = { ...products[index], ...req.body };
        res.json({ success: true, data: products[index] });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// ✅ DELETE
app.delete('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    products = products.filter(p => p.id !== id);

    res.json({ success: true, message: 'Deleted' });
});

// ✅ RUN SERVER (SATU SAJA)
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

app.post('/api/auth/register', async (req, res) => {
    const { owner_name, owner_email, password } = req.body;

    // validasi
    if (!owner_email || !password) {
        return res.status(400).json({ message: 'Email dan password wajib' });
    }

    // cek email sudah ada
    const existing = users.find(u => u.owner_email === owner_email);
    if (existing) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
        id: users.length + 1,
        owner_name,
        owner_email,
        password: hashedPassword
    };

    users.push(user);

    // buat token
    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' });

    res.json({ token });
});