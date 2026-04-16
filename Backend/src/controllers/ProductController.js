const ProductModel = require('../models/ProductModel');

module.exports = {
  index: async (req, res) => {
    try {
      const products = await ProductModel.getAll(req.user.tenantId, req.query.search);
      res.json({ success: true, data: products });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  store: async (req, res) => {
    try {
      const product = await ProductModel.create(req.user.tenantId, req.body);
      res.status(201).json({ success: true, data: product });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  // update & delete bisa dilanjutkan dengan pola serupa...
};