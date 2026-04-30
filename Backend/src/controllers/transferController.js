const Transfer = require('../models/Transfer');
const { successResponse, errorResponse } = require('../utils/response');

const getAllTransfers = async (req, res) => {
    try {
        const transfers = await Transfer.findAll(req.tenantId, req.query);
        successResponse(res, 'Transfers retrieved successfully', transfers);
    } catch (error) {
        errorResponse(res, 'Error retrieving transfers', error);
    }
};

const getTransferById = async (req, res) => {
    try {
        const transfer = await Transfer.findById(req.tenantId, req.params.id);
        if (!transfer) {
            return errorResponse(res, 'Transfer not found', null, 404);
        }
        successResponse(res, 'Transfer retrieved successfully', transfer);
    } catch (error) {
        errorResponse(res, 'Error retrieving transfer', error);
    }
};

const createTransfer = async (req, res) => {
    try {
        const transferData = {
            ...req.body,
            requested_by: req.user.id
        };
        const transfer = await Transfer.create(req.tenantId, transferData);
        successResponse(res, 'Transfer request created successfully', transfer, 201);
    } catch (error) {
        errorResponse(res, 'Error creating transfer', error);
    }
};

const approveTransfer = async (req, res) => {
    try {
        const transfer = await Transfer.approve(req.tenantId, req.params.id, req.user.id);
        if (!transfer) {
            return errorResponse(res, 'Transfer not found', null, 404);
        }
        successResponse(res, 'Transfer approved and stock updated successfully', transfer);
    } catch (error) {
        errorResponse(res, 'Error approving transfer', error);
    }
};

const rejectTransfer = async (req, res) => {
    try {
        const { notes } = req.body;
        const rejected = await Transfer.reject(req.tenantId, req.params.id, notes);
        if (!rejected) {
            return errorResponse(res, 'Transfer not found or cannot be rejected', null, 404);
        }
        successResponse(res, 'Transfer rejected successfully');
    } catch (error) {
        errorResponse(res, 'Error rejecting transfer', error);
    }
};

module.exports = {
    getAllTransfers,
    getTransferById,
    createTransfer,
    approveTransfer,
    rejectTransfer
};