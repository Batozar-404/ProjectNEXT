const { pool } = require('../config/database');
const bcrypt = require('bcrypt');

class User {
    static async findAll(tenantId) {
        const [rows] = await pool.query(
            `SELECT u.id, u.name, u.email, u.role, u.status, s.name as store_name
       FROM users u
       LEFT JOIN stores s ON u.store_id = s.id
       WHERE u.tenant_id = ?
       ORDER BY u.created_at DESC`,
            [tenantId]
        );
        return rows;
    }

    static async findById(tenantId, id) {
        const [rows] = await pool.query(
            `SELECT u.id, u.name, u.email, u.role, u.status, u.store_id, s.name as store_name
       FROM users u
       LEFT JOIN stores s ON u.store_id = s.id
       WHERE u.tenant_id = ? AND u.id = ?`,
            [tenantId, id]
        );
        return rows[0];
    }

    static async findByEmail(tenantId, email) {
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE tenant_id = ? AND email = ?',
            [tenantId, email]
        );
        return rows[0];
    }

    static async create(tenantId, data) {
        const { name, email, password, role, store_id } = data;
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            `INSERT INTO users (tenant_id, store_id, name, email, password_hash, role)
       VALUES (?, ?, ?, ?, ?, ?)`,
            [tenantId, store_id || null, name, email, hashedPassword, role]
        );

        return this.findById(tenantId, result.insertId);
    }

    static async update(tenantId, id, data) {
        const { name, role, status, store_id } = data;
        const [result] = await pool.query(
            `UPDATE users SET
        name = COALESCE(?, name),
        role = COALESCE(?, role),
        status = COALESCE(?, status),
        store_id = COALESCE(?, store_id)
      WHERE tenant_id = ? AND id = ?`,
            [name, role, status, store_id, tenantId, id]
        );
        return result.affectedRows > 0 ? this.findById(tenantId, id) : null;
    }

    static async verifyPassword(user, password) {
        return bcrypt.compare(password, user.password_hash);
    }
}

module.exports = User;