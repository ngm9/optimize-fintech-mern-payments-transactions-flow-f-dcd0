const paymentService = require('../services/paymentService');

// This controller currently performs minimal validation and a naive processing flow.
// The task expects you to strengthen validation, status transitions, and error handling.

exports.processPayment = async (req, res, next) => {
  try {
    const payload = req.body || {};

    // Very basic validation (intentionally minimal)
    if (!payload.userId || !payload.accountId || !payload.amount) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const result = await paymentService.processPayment(payload);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.listPayments = async (req, res, next) => {
  try {
    const { accountId, limit = 20 } = req.query;
    const data = await paymentService.listPayments({ accountId, limit: Number(limit) });
    res.json(data);
  } catch (err) {
    next(err);
  }
};
