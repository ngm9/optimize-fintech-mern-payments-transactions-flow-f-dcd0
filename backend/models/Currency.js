const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  decimals: { type: Number, default: 2 }
});

module.exports = mongoose.model('Currency', currencySchema);
