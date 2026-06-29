const accountService = require('../services/accountService');

exports.getAccountSummary = async (req, res, next) => {
  try {
    const { accountId } = req.params;
    const summary = await accountService.getAccountSummary(accountId);

    if (!summary) {
      return res.status(404).json({ message: 'Account not found' });
    }

    res.json(summary);
  } catch (err) {
    next(err);
  }
};

// This implementation intentionally performs separate queries and in-memory processing.
// It is functional but not optimized for large datasets.
exports.getAccountTransactions = async (req, res, next) => {
  try {
    const { accountId } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;

    const result = await accountService.getAccountTransactions({ accountId, page, limit });
    if (!result) {
      return res.status(404).json({ message: 'Account not found' });
    }

    res.json(result);
  } catch (err) {
    next(err);
  }
};
