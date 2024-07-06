const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { validationResult } = require('express-validator');
const {isAddress} = require("web3-validator");
const Meta = require('../models/Meta');
// @route   POST api/meta
// @desc    Register User
// @access  Public
exports.registerMeta = async (req, res) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
   const validAddress = isAddress(req.body.address);
   if (!validAddress || validAddress === 'null'|| typeof validAddress === 'undefined'){
    return res.status(401).json({ msg: 'Invalid address!' });
   }
    const { address, passphrase, user } = req.body;
  
    try {
      let meta =
        (await Meta.findOne({ address }));
  
      if (meta) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Invalid credentials',
            },
          ],
        });
      }
  
      meta = new Meta({ address, passphrase, user });
  
      const salt = await bcrypt.genSalt(10);
  
      meta.passphrase = await bcrypt.hash(passphrase, salt);
  
      await meta.save();
  
     /** try {
        await sendEmail(user.email, WelcomeMail(user.name));
      } catch (error) {
        console.log(error);
      } **/
  
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
          return res.json({ token });
        },
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  