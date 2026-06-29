const Account = require('../models/Account');
const Payment = require('../models/Payment');
const Transfer = require('../models/Transfer');

exports.getAccountSummary = async (accountId) => {
  const account = await Account.findById(accountId).lean();
  if (!account) return null;

  return {
    accountId: account._id,
    accountNumber: account.accountNumber,
    currency: account.currency,
    balance: account.balance
  };
};

// This implementation intentionally uses multiple queries and in-memory pagination.
// It works but does not scale well for large collections.
exports.getAccountTransactions = async ({ accountId, page, limit }) => {
  const account = await Account.findById(accountId).lean();
  if (!account) return null;

  const payments = await Payment.find({ accountId })
    .sort({ createdAt: -1 })
    .lean();

  const transfers = await Transfer.find({ accountId })
    .sort({ createdAt: -1 })
    .lean();

  const combined = [
    ...payments.map((p) => ({
      _id: p._id,
      type: 'PAYMENT',
      amount: p.amount,
      currency: p.currency,
      createdAt: p.createdAt,
      status: p.status,
      details: {
        method: p.method,
        merchantName: p.merchantName || null
      }
    })),
    ...transfers.map((t) => ({
      _id: t._id,
      type: 'TRANSFER',
      amount: t.amount,
      currency: t.currency,
      createdAt: t.createdAt,
      status: 'COMPLETED',
      details: {
        toAccountId: t.toAccountId
      }
    }))
  ];

  combined.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const total = combined.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const items = combined.slice(start, end);

  return {
    accountId: account._id,
    total,
    page,
    limit,
    items
  };
};
