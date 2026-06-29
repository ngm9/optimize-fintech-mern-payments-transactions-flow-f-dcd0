const mongoose = require('mongoose');

const merchantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String },
  active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Merchant', merchantSchema);
