const express = require('express');
const router = express.Router();
const accountsController = require('../controllers/accountsController');

// GET /api/v1/accounts/:accountId/summary
router.get('/:accountId/summary', accountsController.getAccountSummary);

// GET /api/v1/accounts/:accountId/transactions
router.get('/:accountId/transactions', accountsController.getAccountTransactions);

module.exports = router;
