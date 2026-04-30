-- ========================================
-- CREATE DATABASE
-- ========================================

USE inventori_multi;

-- ========================================
-- 1. TENANTS
-- ========================================
CREATE TABLE IF NOT EXISTS tenants (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  owner_email VARCHAR(255) NOT NULL,
  plan VARCHAR(50) NOT NULL DEFAULT 'free',
  status ENUM('active','suspended','deleted') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_slug (slug),
  UNIQUE KEY unique_owner_email (owner_email)
) ENGINE=InnoDB;

-- ========================================
-- 2. STORES
-- ========================================
CREATE TABLE IF NOT EXISTS stores (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  tenant_id BIGINT UNSIGNED NOT NULL,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(50) NOT NULL,
  address TEXT,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_tenant_code (tenant_id, code),
  FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ========================================
-- 3. USERS
-- ========================================
CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  tenant_id BIGINT UNSIGNED NOT NULL,
  store_id BIGINT UNSIGNED NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('tenant_owner','store_manager','staff') NOT NULL,
  status ENUM('active','inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_tenant_email (tenant_id, email),
  FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ========================================
-- 4. PRODUCT CATEGORIES
-- ========================================
CREATE TABLE IF NOT EXISTS product_categories (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  tenant_id BIGINT UNSIGNED NOT NULL,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_tenant_category (tenant_id, name),
  FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ========================================
-- 5. PRODUCTS
-- ========================================
CREATE TABLE IF NOT EXISTS products (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  tenant_id BIGINT UNSIGNED NOT NULL,
  category_id BIGINT UNSIGNED NULL,
  sku VARCHAR(100) NOT NULL,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  unit VARCHAR(50) DEFAULT 'pcs',
  cost_price DECIMAL(12,2) DEFAULT 0,
  sell_price DECIMAL(12,2) DEFAULT 0,
  image_url VARCHAR(500) NULL,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_tenant_sku (tenant_id, sku),
  FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (category_id) REFERENCES product_categories(id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ========================================
-- 6. INVENTORIES
-- ========================================
CREATE TABLE IF NOT EXISTS inventories (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  tenant_id BIGINT UNSIGNED NOT NULL,
  store_id BIGINT UNSIGNED NOT NULL,
  product_id BIGINT UNSIGNED NOT NULL,
  current_stock INT DEFAULT 0,
  min_stock INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_tenant_store_product (tenant_id, store_id, product_id),
  FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ========================================
-- 7. STOCK MOVEMENTS
-- ========================================
CREATE TABLE IF NOT EXISTS stock_movements (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  tenant_id BIGINT UNSIGNED NOT NULL,
  store_id BIGINT UNSIGNED NOT NULL,
  product_id BIGINT UNSIGNED NOT NULL,
  type ENUM('in','out','transfer_in','transfer_out','adjustment') NOT NULL,
  quantity INT UNSIGNED NOT NULL,
  unit_cost_snapshot DECIMAL(12,2) DEFAULT NULL,
  ref_no VARCHAR(100),
  notes TEXT,
  created_by BIGINT UNSIGNED NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ========================================
-- 8. TRANSFERS
-- ========================================
CREATE TABLE IF NOT EXISTS transfers (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  tenant_id BIGINT UNSIGNED NOT NULL,
  from_store_id BIGINT UNSIGNED NOT NULL,
  to_store_id BIGINT UNSIGNED NOT NULL,
  status ENUM('pending','approved','in_transit','completed','rejected','cancelled') DEFAULT 'pending',
  requested_by BIGINT UNSIGNED NULL,
  approved_by BIGINT UNSIGNED NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CHECK (from_store_id <> to_store_id),
  FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (from_store_id) REFERENCES stores(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (to_store_id) REFERENCES stores(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (requested_by) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ========================================
-- 9. TRANSFER ITEMS
-- ========================================
CREATE TABLE IF NOT EXISTS transfer_items (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  transfer_id BIGINT UNSIGNED NOT NULL,
  product_id BIGINT UNSIGNED NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (transfer_id) REFERENCES transfers(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ========================================
-- INDEXES FOR PERFORMANCE
-- ========================================
CREATE INDEX idx_products_search ON products(name, sku);
CREATE INDEX idx_movements_type ON stock_movements(type);
CREATE INDEX idx_movements_created ON stock_movements(created_at);
CREATE INDEX idx_transfers_status ON transfers(status);
CREATE INDEX idx_inventory_stock ON inventories(current_stock, min_stock);

-- ========================================
-- SAMPLE DATA (Optional untuk testing)
-- ========================================
INSERT INTO tenants (name, slug, owner_email, plan) VALUES
('Toko Makmur', 'toko-makmur', 'owner@tokomakmur.com', 'premium'),
('Warung Jaya', 'warung-jaya', 'owner@warungjaya.com', 'free');

INSERT INTO stores (tenant_id, name, code, address) VALUES
(1, 'Toko Makmur Pusat', 'TMP01', 'Jl. Raya No. 1 Jakarta'),
(1, 'Toko Makmur Cabang', 'TMC01', 'Jl. Raya No. 2 Bogor'),
(2, 'Warung Jaya Utama', 'WJU01', 'Jl. Merdeka No. 5 Bandung');

INSERT INTO product_categories (tenant_id, name) VALUES
(1, 'Elektronik'),
(1, 'Perabotan'),
(2, 'Makanan'),
(2, 'Minuman');

INSERT INTO products (tenant_id, category_id, sku, name, description, unit, cost_price, sell_price) VALUES
(1, 1, 'SKU001', 'Kipas Angin', 'Kipas angin 16 inch', 'pcs', 150000, 200000),
(1, 2, 'SKU002', 'Meja Kayu', 'Meja makan kayu jati', 'pcs', 500000, 750000),
(2, 3, 'SKU003', 'Indomie Goreng', 'Mie instan rasa goreng', 'dus', 90000, 120000);

INSERT INTO inventories (tenant_id, store_id, product_id, current_stock, min_stock) VALUES
(1, 1, 1, 50, 10),
(1, 2, 1, 20, 5),
(2, 3, 3, 100, 20);

SET FOREIGN_KEY_CHECKS = 1;