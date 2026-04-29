const { pool } = require('../config/database');

class Transfer {
    static async findAll(tenantId, filters = {}) {
        let query = `
      SELECT t.*,
             fs.name as from_store_name,
             ts.name as to_store_name,
             u.name as requested_by_name
      FROM transfers t
      JOIN stores fs ON t.from_store_id = fs.id
      JOIN stores ts ON t.to_store_id = ts.id
      LEFT JOIN users u ON t.requested_by = u.id
      WHERE t.tenant_id = ?
    `;
        const params = [tenantId];

        if (filters.status) {
            query += ' AND t.status = ?';
            params.push(filters.status);
        }

        query += ' ORDER BY t.created_at DESC';

        const [rows] = await pool.query(query, params);
        return rows;
    }

    static async findById(tenantId, id) {
        const [rows] = await pool.query(
            `SELECT t.*,
              fs.name as from_store_name,
              ts.name as to_store_name,
              u.name as requested_by_name,
              u2.name as approved_by_name
       FROM transfers t
       JOIN stores fs ON t.from_store_id = fs.id
       JOIN stores ts ON t.to_store_id = ts.id
       LEFT JOIN users u ON t.requested_by = u.id
       LEFT JOIN users u2 ON t.approved_by = u2.id
       WHERE t.tenant_id = ? AND t.id = ?`,
            [tenantId, id]
        );
        return rows[0];
    }

    static async create(tenantId, data) {
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            const { from_store_id, to_store_id, requested_by, notes, items } = data;

            // Create transfer header
            const [result] = await connection.query(
                `INSERT INTO transfers (tenant_id, from_store_id, to_store_id, requested_by, notes, status)
         VALUES (?, ?, ?, ?, ?, 'pending')`,
                [tenantId, from_store_id, to_store_id, requested_by, notes]
            );

            const transferId = result.insertId;

            // Create transfer items
            for (const item of items) {
                await connection.query(
                    'INSERT INTO transfer_items (transfer_id, product_id, quantity) VALUES (?, ?, ?)',
                    [transferId, item.product_id, item.quantity]
                );
            }

            await connection.commit();
            return this.findById(tenantId, transferId);
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    static async approve(tenantId, id, approved_by) {
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            // Get transfer details
            const [transferRows] = await connection.query(
                `SELECT * FROM transfers WHERE tenant_id = ? AND id = ? AND status = 'pending'`,
                [tenantId, id]
            );

            if (transferRows.length === 0) {
                throw new Error('Transfer not found or already processed');
            }

            const transfer = transferRows[0];

            // Get transfer items
            const [items] = await connection.query(
                'SELECT * FROM transfer_items WHERE transfer_id = ?',
                [id]
            );

            // Check stock availability in source store
            for (const item of items) {
                const [inventory] = await connection.query(
                    `SELECT current_stock FROM inventories
           WHERE tenant_id = ? AND store_id = ? AND product_id = ?`,
                    [tenantId, transfer.from_store_id, item.product_id]
                );

                if (!inventory[0] || inventory[0].current_stock < item.quantity) {
                    throw new Error(`Insufficient stock for product ID${item.product_id}`);
                }
            }

            // Update transfer status
            await connection.query(
                `UPDATE transfers SET status = 'approved', approved_by = ?
         WHERE tenant_id = ? AND id = ?`,
                [approved_by, tenantId, id]
            );

            // Create stock movements (transfer_out from source)
            for (const item of items) {
                await connection.query(
                    `INSERT INTO stock_movements
           (tenant_id, store_id, product_id, type, quantity, ref_no, created_by)
           VALUES (?, ?, ?, 'transfer_out', ?, ?, ?)`,
                    [tenantId, transfer.from_store_id, item.product_id, item.quantity, `TRF-${id}`, approved_by]
                );

                // Update inventory - decrease from source
                await connection.query(
                    `UPDATE inventories SET current_stock = current_stock - ?
           WHERE tenant_id = ? AND store_id = ? AND product_id = ?`,
                    [item.quantity, tenantId, transfer.from_store_id, item.product_id]
                );

                // Create transfer_in movement for destination
                await connection.query(
                    `INSERT INTO stock_movements
           (tenant_id, store_id, product_id, type, quantity, ref_no, created_by)
           VALUES (?, ?, ?, 'transfer_in', ?, ?, ?)`,
                    [tenantId, transfer.to_store_id, item.product_id, item.quantity, `TRF-${id}`, approved_by]
                );

                // Update inventory - increase in destination
                const [destInventory] = await connection.query(
                    `SELECT id FROM inventories
           WHERE tenant_id = ? AND store_id = ? AND product_id = ?`,
                    [tenantId, transfer.to_store_id, item.product_id]
                );

                if (destInventory.length > 0) {
                    await connection.query(
                        `UPDATE inventories SET current_stock = current_stock + ?
             WHERE tenant_id = ? AND store_id = ? AND product_id = ?`,
                        [item.quantity, tenantId, transfer.to_store_id, item.product_id]
                    );
                } else {
                    // Create inventory record if not exists
                    await connection.query(
                        `INSERT INTO inventories (tenant_id, store_id, product_id, current_stock)
             VALUES (?, ?, ?, ?)`,
                        [tenantId, transfer.to_store_id, item.product_id, item.quantity]
                    );
                }
            }

            await connection.commit();
            return this.findById(tenantId, id);
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    static async reject(tenantId, id, notes) {
        const [result] = await pool.query(
            `UPDATE transfers SET status = 'rejected', notes = CONCAT(notes, ' - Rejected: ', ?)
        WHERE tenant_id = ? AND id = ? AND status = 'pending'`,
            [notes, tenantId, id]
        );
        return result.affectedRows > 0;
    }
}

module.exports = Transfer;