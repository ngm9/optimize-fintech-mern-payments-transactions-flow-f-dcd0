const Payment = require('../models/Payment');
const Account = require('../models/Account');

// Simulated external processor. For now this just randomly succeeds or fails after a delay.
async function mockExternalProcessor(payment) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const success = Math.random() > 0.1;
      resolve({
        success,
        processorId: 'PROC-' + payment._id.toString().slice(-6),
        errorMessage: success ? null : 'External processor error'
      });
    }, 100);
  });
}

exports.processPayment = async (payload) => {
  // Create payment as SUCCESS immediately (intentionally simplistic)
  const account = await Account.findById(payload.accountId).lean();
  if (!account) {
    const error = new Error('Account not found');
    error.statusCode = 404;
    throw error;
  }

  const payment = await Payment.create({
    accountId: payload.accountId,
    userId: payload.userId,
    currency: payload.currency || 'USD',
    amount: payload.amount,
    method: payload.method || 'CARD',
    status: 'PENDING',
    createdAt: new Date()
  });

  // Fire external processor and update status, but still return immediately
  mockExternalProcessor(payment)
    .then(async (result) => {
      const update = { status: result.success ? 'SUCCESS' : 'FAILED' };
      if (result.processorId) {
        update.processorId = result.processorId;
      }
      if (!result.success && result.errorMessage) {
        update.errorMessage = result.errorMessage;
      }
      await Payment.updateOne({ _id: payment._id }, { $set: update });
    })
    .catch(() => {
      // Swallow errors for now (intentionally simplistic)
    });

  return { paymentId: payment._id, status: payment.status };
};

exports.listPayments = async ({ accountId, limit }) => {
  const query = {};
  if (accountId) {
    query.accountId = accountId;
  }

  const items = await Payment.find(query)
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  return { items };
};
