const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('../config');
const {isAddress} = require("web3-validator");
const Meta = require('../models/Meta');

// @route   POST api/auth_meta
// @desc    Authenticate user & get token
// @access  Public
exports.loginMeta = async (req, res) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
   const validAddress = isAddress(req.body.address);
   if (!validAddress || validAddress === 'null'|| typeof validAddress === 'undefined'){
    return res.status(401).json({ msg: 'Invalid address!' });
   }
    const { address, passphrase } = req.body;
    
    try {
      let meta = await Meta.findOne({ address });
  
      if (!meta) {
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
      }
  
      const isMatch = await bcrypt.compare(passphrase, meta.passphrase);
  
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
      }
  
      const payload = {
        meta : {
          id: meta.id,
        },
      };
  
      jwt.sign(
        payload,
        config.JWT_SECRET,
        { expiresIn: config.JWT_TOKEN_EXPIRES_IN },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        },
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Internal server error' });
    }
  };

  
exports.getCurrentUserMeta = async (req, res) => {
    try {
      const meta = await Meta.findById(req.meta.id).select('-passphrase');
      return res.status(200).json(meta);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Internal server error');
    }
  };