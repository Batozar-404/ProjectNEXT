const { pool } = require('../lib/db');

module.exports = {
  async getAll(tenantId, search = '') {
    const query = search 
      ? 'SELECT p.*, c.name as category_name FROM products p LEFT JOIN product_categories c ON p.category_id = c.id WHERE p.tenant_id = ? AND p.name LIKE ? ORDER BY p.created_at DESC'
      : 'SELECT p.*, c.name as category_name FROM products p LEFT JOIN product_categories c ON p.category_id = c.id WHERE p.tenant_id = ? ORDER BY p.created_at DESC';
    const params = search ? [tenantId, `%${search}%`] : [tenantId];
    const [rows] = await pool.execute(query, params);
    return rows;
  },

  async getById(tenantId, id) {
    const [rows] = await pool.execute(
      'SELECT * FROM products WHERE id = ? AND tenant_id = ?',
      [id, tenantId]
    );
    return rows[0] || null;
  },

  async create(tenantId, data) {
    const [result] = await pool.execute(
      'INSERT INTO products (tenant_id, category_id, sku, name, price) VALUES (?, ?, ?, ?, ?)',
      [tenantId, data.category_id || null, data.sku, data.name, data.price || 0]
    );
    return { id: result.insertId, ...data };
  },

  async update(tenantId, id, data) {
    await pool.execute(
      'UPDATE products SET name = ?, sku = ?, price = ?, category_id = ? WHERE id = ? AND tenant_id = ?',
      [data.name, data.sku, data.price, data.category_id || null, id, tenantId]
    );
    return this.getById(tenantId, id);
  },

  async delete(tenantId, id) {
    const [result] = await pool.execute(
      'DELETE FROM products WHERE id = ? AND tenant_id = ?',
      [id, tenantId]
    );
    return result.affectedRows > 0;
  }
};