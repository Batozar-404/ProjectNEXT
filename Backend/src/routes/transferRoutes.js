const express = require('express');
const router = express.Router();
const transferController = require('../controllers/transferController');
const { authenticate } = require('../middlewares/auth');
const { ensureTenantScope } = require('../middlewares/tenantScope');

router.use(authenticate);
router.use(ensureTenantScope);

router.get('/', transferController.getAllTransfers);
router.get('/:id', transferController.getTransferById);
router.post('/', transferController.createTransfer);
router.put('/:id/approve', transferController.approveTransfer);
router.put('/:id/reject', transferController.rejectTransfer);

module.exports = router;