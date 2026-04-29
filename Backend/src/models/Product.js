const { pool } = require('../config/database');

class Product {
    static async findAll(tenantId, filters = {}) {
        let query = `
      SELECT p.*, pc.name as category_name
      FROM products p
      LEFT JOIN product_categories pc ON p.category_id = pc.id
      WHERE p.tenant_id = ? AND p.is_active = 1
    `;
        const params = [tenantId];

        if (filters.category_id) {
            query += ' AND p.category_id = ?';
            params.push(filters.category_id);
        }

        if (filters.search) {
            query += ' AND (p.name LIKE ? OR p.sku LIKE ?)';
            params.push(`%${filters.search}%`, `%${filters.search}%`);
        }

        query += ' ORDER BY p.created_at DESC';

        const [rows] = await pool.query(query, params);
        return rows;
    }

    static async findById(tenantId, id) {
        const [rows] = await pool.query(
            `SELECT p.*, pc.name as category_name
       FROM products p
       LEFT JOIN product_categories pc ON p.category_id = pc.id
       WHERE p.tenant_id = ? AND p.id = ? AND p.is_active = 1`,
            [tenantId, id]
        );
        return rows[0];
    }

    static async findBySku(tenantId, sku) {
        const [rows] = await pool.query(
            'SELECT * FROM products WHERE tenant_id = ? AND sku = ?',
            [tenantId, sku]
        );
        return rows[0];
    }

    static async create(tenantId, data) {
        const { category_id, sku, name, description, unit, cost_price, sell_price } = data;
        const [result] = await pool.query(
            `INSERT INTO products (tenant_id, category_id, sku, name, description, unit, cost_price, sell_price)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [tenantId, category_id, sku, name, description, unit, cost_price || 0, sell_price || 0]
        );
        return this.findById(tenantId, result.insertId);
    }

    static async update(tenantId, id, data) {
        const { category_id, name, description, unit, cost_price, sell_price, is_active } = data;
        const [result] = await pool.query(
            `UPDATE products SET
        category_id = COALESCE(?, category_id),
        name = COALESCE(?, name),
        description = COALESCE(?, description),
        unit = COALESCE(?, unit),
        cost_price = COALESCE(?, cost_price),
        sell_price = COALESCE(?, sell_price),
        is_active = COALESCE(?, is_active)
      WHERE tenant_id = ? AND id = ?`,
            [category_id, name, description, unit, cost_price, sell_price, is_active, tenantId, id]
        );
        return result.affectedRows > 0 ? this.findById(tenantId, id) : null;
    }

    static async delete(tenantId, id) {
        const [result] = await pool.query(
            'UPDATE products SET is_active = 0 WHERE tenant_id = ? AND id = ?',
            [tenantId, id]
        );
        return result.affectedRows > 0;
    }
}

module.exports = Product;