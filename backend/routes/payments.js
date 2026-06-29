const express = require('express');
const router = express.Router();
const paymentsController = require('../controllers/paymentsController');

// POST /api/v1/payments/process
router.post('/process', paymentsController.processPayment);

// GET /api/v1/payments
router.get('/', paymentsController.listPayments);

module.exports = router;
