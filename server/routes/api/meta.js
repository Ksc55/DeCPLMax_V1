const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { registerMeta } = require('../../controllers/meta');


router.post(
    '/',
    [
      check('address', 'address is required').not().isEmpty(),
      check(
        'passphrase',
        'Please enter a passphrase with 6 or more characters',
      ).isLength({ min: 6 }),
    ],
    registerMeta,
  );


  module.exports = router;
