const bcrypt = require('bcryptjs');
const { pool } = require('../lib/db');
const { generateToken } = require('../utils/jwt');

module.exports = {
  register: async (req, res) => {
    try {
      const { name, email, password, tenant_slug } = req.body;
      if (!name || !email || !password || !tenant_slug) {
        return res.status(400).json({ error: 'All fields required' });
      }

      const [tenants] = await pool.execute('SELECT id FROM tenant WHERE slug = ?', [tenant_slug]);
      if (!tenants.length) return res.status(404).json({ error: 'Tenant not found' });
      const tenantId = tenants[0].id;

      const [exist] = await pool.execute('SELECT id FROM user WHERE tenant_id = ? AND email = ?', [tenantId, email]);
      if (exist.length) return res.status(400).json({ error: 'Email already registered' });

      const hash = await bcrypt.hash(password, 10);
      const [result] = await pool.execute(
        `INSERT INTO user (tenant_id, name, email, password_hash, role, status) VALUES (?, ?, ?, ?, 'staff', 'active')`,
        [tenantId, name, email, hash]
      );

      const token = generateToken({ userId: result.insertId, tenantId, email, role: 'staff' });
      res.status(201).json({ message: 'Registered', data: { id: result.insertId, name, email, tenant_id: tenantId, token } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Registration failed' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password, tenant_slug } = req.body;
      if (!email || !password || !tenant_slug) return res.status(400).json({ error: 'All fields required' });

      const [tenants] = await pool.execute('SELECT id FROM tenant WHERE slug = ?', [tenant_slug]);
      if (!tenants.length) return res.status(404).json({ error: 'Tenant not found' });
      const tenantId = tenants[0].id;

      const [users] = await pool.execute('SELECT * FROM user WHERE tenant_id = ? AND email = ?', [tenantId, email]);
      if (!users.length) return res.status(401).json({ error: 'Invalid credentials' });

      const user = users[0];
      const valid = await bcrypt.compare(password, user.password_hash);
      if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

      const token = generateToken({ userId: user.id, tenantId, email: user.email, role: user.role });
      res.json({ message: 'Login success', data: { id: user.id, name: user.name, email: user.email, role: user.role, tenant_id: tenantId, token } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Login failed' });
    }
  }
};