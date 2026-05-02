const { pool } = require('../config/database');

class Transfer {
    static async findAll(tenantId, filters = {}) {
        try {
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
        } catch (error) {
            console.error('Error in Transfer.findAll:', error);
            throw error;
        }
    }

    /**
     * Get transfer by ID
     * @param {number} tenantId - Tenant ID
     * @param {number} id - Transfer ID
     * @returns {Promise<Object|null>} Transfer object or null
     */
    static async findById(tenantId, id) {
        try {
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
            return rows[0] || null;
        } catch (error) {
            console.error('Error in Transfer.findById:', error);
            throw error;
        }
    }

    /**
     * Create new transfer request
     * @param {number} tenantId - Tenant ID
     * @param {Object} data - Transfer data
     * @returns {Promise<Object>} Created transfer
     */
    static async create(tenantId, data) {
        const { from_store_id, to_store_id, requested_by, notes, items } = data;

        // Validasi input
        if (!from_store_id || !to_store_id) {
            throw new Error('from_store_id and to_store_id are required');
        }

        if (from_store_id === to_store_id) {
            throw new Error('Cannot transfer to the same store');
        }

        if (!items || !Array.isArray(items) || items.length === 0) {
            throw new Error('Transfer items cannot be empty');
        }

        for (const item of items) {
            if (!item.product_id || !item.quantity || item.quantity <= 0) {
                throw new Error('Each item must have valid product_id and positive quantity');
            }
        }

        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            // Create transfer header
            const [result] = await connection.query(
                `INSERT INTO transfers (tenant_id, from_store_id, to_store_id, requested_by, notes, status)
         VALUES (?, ?, ?, ?, ?, 'pending')`,
                [tenantId, from_store_id, to_store_id, requested_by, notes || null]
            );

            const transferId = result.insertId;

            // Create transfer items
            for (const item of items) {
                await connection.query(
                    `INSERT INTO transfer_items (transfer_id, product_id, quantity) 
           VALUES (?, ?, ?)`,
                    [transferId, item.product_id, item.quantity]
                );
            }

            await connection.commit();
            return await this.findById(tenantId, transferId);
        } catch (error) {
            await connection.rollback();
            console.error('Error in Transfer.create:', error);
            throw error;
        } finally {
            connection.release();
        }
    }

    /**
     * Approve transfer and update stock atomically
     * @param {number} tenantId - Tenant ID
     * @param {number} id - Transfer ID
     * @param {number} approved_by - User ID who approves
     * @returns {Promise<Object>} Updated transfer
     */
    static async approve(tenantId, id, approved_by) {
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            // Get transfer details
            const [transferRows] = await connection.query(
                `SELECT * FROM transfers 
         WHERE tenant_id = ? AND id = ? AND status = 'pending'`,
                [tenantId, id]
            );

            if (transferRows.length === 0) {
                throw new Error('Transfer not found or already processed');
            }

            const transfer = transferRows[0];

            // Get transfer items
            const [items] = await connection.query(
                `SELECT * FROM transfer_items WHERE transfer_id = ?`,
                [id]
            );

            if (items.length === 0) {
                throw new Error('Transfer has no items');
            }

            // Check stock availability in source store
            for (const item of items) {
                const [inventory] = await connection.query(
                    `SELECT current_stock FROM inventories
           WHERE tenant_id = ? AND store_id = ? AND product_id = ?`,
                    [tenantId, transfer.from_store_id, item.product_id]
                );

                const availableStock = inventory[0]?.current_stock || 0;
                if (availableStock < item.quantity) {
                    throw new Error(
                        `Insufficient stock for product ID ${item.product_id}. ` +
                        `Available: ${availableStock}, Required: ${item.quantity}`
                    );
                }
            }

            // Update transfer status
            await connection.query(
                `UPDATE transfers 
         SET status = 'approved', approved_by = ? 
         WHERE tenant_id = ? AND id = ?`,
                [approved_by, tenantId, id]
            );

            // Process each item
            for (const item of items) {
                const refNo = `TRF-${id}`;

                // 1. Create transfer_out movement from source store
                await connection.query(
                    `INSERT INTO stock_movements
           (tenant_id, store_id, product_id, type, quantity, ref_no, created_by)
           VALUES (?, ?, ?, 'transfer_out', ?, ?, ?)`,
                    [tenantId, transfer.from_store_id, item.product_id, item.quantity, refNo, approved_by]
                );

                // 2. Decrease stock from source store
                await connection.query(
                    `UPDATE inventories 
           SET current_stock = current_stock - ?
           WHERE tenant_id = ? AND store_id = ? AND product_id = ?`,
                    [item.quantity, tenantId, transfer.from_store_id, item.product_id]
                );

                // 3. Create transfer_in movement to destination store
                await connection.query(
                    `INSERT INTO stock_movements
           (tenant_id, store_id, product_id, type, quantity, ref_no, created_by)
           VALUES (?, ?, ?, 'transfer_in', ?, ?, ?)`,
                    [tenantId, transfer.to_store_id, item.product_id, item.quantity, refNo, approved_by]
                );

                // 4. Increase stock in destination store
                const [destInventory] = await connection.query(
                    `SELECT id FROM inventories
           WHERE tenant_id = ? AND store_id = ? AND product_id = ?`,
                    [tenantId, transfer.to_store_id, item.product_id]
                );

                if (destInventory.length > 0) {
                    await connection.query(
                        `UPDATE inventories 
             SET current_stock = current_stock + ?
             WHERE tenant_id = ? AND store_id = ? AND product_id = ?`,
                        [item.quantity, tenantId, transfer.to_store_id, item.product_id]
                    );
                } else {
                    // Create inventory record if not exists
                    await connection.query(
                        `INSERT INTO inventories (tenant_id, store_id, product_id, current_stock, min_stock)
             VALUES (?, ?, ?, ?, 0)`,
                        [tenantId, transfer.to_store_id, item.product_id, item.quantity]
                    );
                }
            }

            await connection.commit();
            return await this.findById(tenantId, id);
        } catch (error) {
            await connection.rollback();
            console.error('Error in Transfer.approve:', error);
            throw error;
        } finally {
            connection.release();
        }
    }

    /**
     * Reject transfer request
     * @param {number} tenantId - Tenant ID
     * @param {number} id - Transfer ID
     * @param {string} notes - Rejection reason
     * @returns {Promise<boolean>} True if rejected successfully
     */
    static async reject(tenantId, id, notes) {
        try {
            const [result] = await pool.query(
                `UPDATE transfers 
         SET status = 'rejected', 
             notes = CONCAT(COALESCE(notes, ''), ' - Rejected: ', ?)
         WHERE tenant_id = ? AND id = ? AND status = 'pending'`,
                [notes, tenantId, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error in Transfer.reject:', error);
            throw error;
        }
    }

    /**
     * Get transfers by store ID (either as source or destination)
     * @param {number} tenantId - Tenant ID
     * @param {number} storeId - Store ID
     * @param {Object} filters - Filter options
     * @returns {Promise<Array>} List of transfers
     */
    static async findByStore(tenantId, storeId, filters = {}) {
        try {
            let query = `
        SELECT t.*,
               fs.name as from_store_name,
               ts.name as to_store_name,
               u.name as requested_by_name
        FROM transfers t
        JOIN stores fs ON t.from_store_id = fs.id
        JOIN stores ts ON t.to_store_id = ts.id
        LEFT JOIN users u ON t.requested_by = u.id
        WHERE t.tenant_id = ? AND (t.from_store_id = ? OR t.to_store_id = ?)
      `;
            const params = [tenantId, storeId, storeId];

            if (filters.status) {
                query += ' AND t.status = ?';
                params.push(filters.status);
            }

            query += ' ORDER BY t.created_at DESC';

            const [rows] = await pool.query(query, params);
            return rows;
        } catch (error) {
            console.error('Error in Transfer.findByStore:', error);
            throw error;
        }
    }

    /**
     * Get transfers by status
     * @param {number} tenantId - Tenant ID
     * @param {string} status - Transfer status (pending, approved, completed, rejected, cancelled)
     * @returns {Promise<Array>} List of transfers
     */
    static async findByStatus(tenantId, status) {
        try {
            const [rows] = await pool.query(
                `SELECT t.*,
                fs.name as from_store_name,
                ts.name as to_store_name,
                u.name as requested_by_name
         FROM transfers t
         JOIN stores fs ON t.from_store_id = fs.id
         JOIN stores ts ON t.to_store_id = ts.id
         LEFT JOIN users u ON t.requested_by = u.id
         WHERE t.tenant_id = ? AND t.status = ?
         ORDER BY t.created_at DESC`,
                [tenantId, status]
            );
            return rows;
        } catch (error) {
            console.error('Error in Transfer.findByStatus:', error);
            throw error;
        }
    }
}

module.exports = Transfer;