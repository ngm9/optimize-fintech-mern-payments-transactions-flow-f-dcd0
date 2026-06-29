const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  merchantName: { type: String },
  currency: { type: String, required: true },
  amount: { type: Number, required: true },
  method: { type: String, required: true },
  status: { type: String, required: true, default: 'PENDING' },
  processorId: { type: String },
  errorMessage: { type: String },
  createdAt: { type: Date, default: Date.now }
});

paymentSchema.index({ accountId: 1, createdAt: -1 });
paymentSchema.index({ userId: 1, createdAt: -1 });
paymentSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Payment', paymentSchema);
