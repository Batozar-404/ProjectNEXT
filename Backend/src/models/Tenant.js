const { pool } = require('../config/database');

class Tenant {
    static async findAll() {
        const [rows] = await pool.query('SELECT * FROM tenants WHERE status != "deleted" ORDER BY created_at DESC');
        return rows;
    }

    static async findById(id) {
        const [rows] = await pool.query('SELECT * FROM tenants WHERE id = ? AND status != "deleted"', [id]);
        return rows[0];
    }

    static async findBySlug(slug) {
        const [rows] = await pool.query('SELECT * FROM tenants WHERE slug = ?', [slug]);
        return rows[0];
    }

    static async create(data) {
        const { name, slug, owner_email, plan = 'free' } = data;
        const [result] = await pool.query(
            'INSERT INTO tenants (name, slug, owner_email, plan) VALUES (?, ?, ?, ?)',
            [name, slug, owner_email, plan]
        );
        return this.findById(result.insertId);
    }

    static async update(id, data) {
        const { name, plan, status } = data;
        const [result] = await pool.query(
            'UPDATE tenants SET name = COALESCE(?, name), plan = COALESCE(?, plan), status = COALESCE(?, status) WHERE id = ?',
            [name, plan, status, id]
        );
        return result.affectedRows > 0 ? this.findById(id) : null;
    }

    static async delete(id) {
        const [result] = await pool.query('UPDATE tenants SET status = "deleted" WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = Tenant;