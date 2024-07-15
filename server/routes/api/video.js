const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
//const {} = require('../../validators/address');
const {validateTokenVideo} = require('../../middleware/auth');

const {  addVideo, getCurrentVideo } = require('../../controllers/video');

router.get('/', validateTokenVideo, getCurrentVideo);

router.post(
    '/',
    [
      check('owner', 'Please include the owner address').exists(),
      check('video_id', 'video_id is required').exists(),
      check('video_uri', 'Please include the video uri').exists(),
      check('nft_address', 'nft_address is required').exists(),
      check('nft_uri', 'Please include the nft uri').exists(),
    ],
    addVideo,
  );

  module.exports = router;