const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
//const {} = require('../../validators/address');
const {validateTokenMeta, validateBearerToken} = require('../../middleware/auth');

const { getCurrentUserMeta, loginMeta } = require('../../controllers/auth_meta');

router.get('/', validateTokenMeta, getCurrentUserMeta);

router.post(
    '/',
    [
      check('address', 'Please include an address').exists(),
      check('passphrase', 'Passphrase is required').exists(),
    ],
    loginMeta,
  );

  module.exports = router;
