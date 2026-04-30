const { errorResponse } = require('../utils/response');

const ensureTenantScope = (req, res, next) => {
    // Pastikan user memiliki tenant_id
    if (!req.user || !req.user.tenant_id) {
        return errorResponse(res, 'Tenant context missing', null, 400);
    }

    // Inject tenant_id ke req untuk digunakan di controller
    req.tenantId = req.user.tenant_id;

    // Untuk parameter route yang berisi ID, bisa divalidasi nanti di service layer
    next();
};

module.exports = { ensureTenantScope };