const config = require('../config');
const mongoose = require('mongoose');
//const { notify } = require('../routes/api/auth');

const MetaSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true,
  },
  passphrase: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required : true
  },
  theta: {
    type: mongoose.Types.Decimal128,
    default : 0,
  },
  category: {
    type: Number,
    default: 0,
  },
  bat: {
    type: Number,
    default: 0,
  },
  nft: {
    type: Number,
    default: 0,
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

module.exports = Meta = mongoose.model('meta', MetaSchema);