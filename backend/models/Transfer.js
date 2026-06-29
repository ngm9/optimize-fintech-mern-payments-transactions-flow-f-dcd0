const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema({
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  toAccountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

transferSchema.index({ accountId: 1, createdAt: -1 });
transferSchema.index({ toAccountId: 1, createdAt: -1 });

module.exports = mongoose.model('Transfer', transferSchema);
