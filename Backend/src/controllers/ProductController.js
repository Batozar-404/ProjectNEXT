const ProductModel = require('../models/ProductModel');

module.exports = {
  index: async (req, res) => {
    try {
      const products = await ProductModel.getAll(req.user.tenantId, req.query.search);
      res.json({ success: true, data: products });
    } catch (err) {
      err.statusCode = 500;
      throw err;
    }
  },

  store: async (req, res) => {
    try {
      const product = await ProductModel.create(req.user.tenantId, req.body);
      res.status(201).json({ success: true, data: product });
    } catch (err) {
      err.statusCode = 500;
      throw err;
    }
  },

  update: async (req, res) => {
    try {
      const updated = await ProductModel.update(req.user.tenantId, req.params.id, req.body);
      if (!updated) return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Produk tidak ditemukan" } });
      res.json({ success: true, data: updated });
    } catch (err) {
      err.statusCode = 500;
      throw err;
    }
  },

  destroy: async (req, res) => {
    try {
      const deleted = await ProductModel.delete(req.user.tenantId, req.params.id);
      if (!deleted) return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Produk tidak ditemukan" } });
      res.json({ success: true, message: "Produk berhasil dihapus" });
    } catch (err) {
      err.statusCode = 500;
      throw err;
    }
  }
};