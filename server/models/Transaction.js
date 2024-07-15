const config = require('../config');
const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    address: {
      type: String,
      required: true,
    },
    tx_hash: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ['nft', 'bat', 'theta', 'swap'],
      required : true,
    },
    to: {
        type: String,
        required : true,
      },
    status: {
        type: String,
        enum: ['pending', 'complete', 'error'],
        default: 'pending',
      },
    value: {
      type: Number,
      required : true,
    },
    created_at : {
      type: Date,
      default: Date.now,
    },
    updated_at : {
      type: Date,
      default: Date.now,
    },
  });
  
  module.exports = Transaction = mongoose.model('transactions', TransactionSchema);