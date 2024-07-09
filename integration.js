const express = require('express');
const router  = express.Router();
const request = require('request');
require('dotenv').config();
const {successResponse, errorResponse} = require('./libs/response');
   const logStruct = (func, error) => {
    return {'func': func, 'file': 'integration', error}
  }

  //Transcode a Video using an Upload
/** var options = {
  'method': 'POST',
  'url': 'https://api.thetavideoapi.com/video',
  'headers': {
    'x-tva-sa-id': 'srvacc_xxxxxxxxxxxxxxxxxxxxxxxxx',
    'x-tva-sa-secret': 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({"source_upload_id":"upload_zzzzzzzzzzzzzzzzzzzzzzzzz","playback_policy":"public","nft_collection":"0x5d0004fe2e0ec6d002678c7fa01026cabde9e793","metadata":{"key":"value"}})

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
}); **/
// response 

/** {
    "status": "success",
    "body": {
        "videos": [
            {
                "id": "video_vvvvvvvvvvvvvvvvvvvvvvvvvv",
                "playback_uri": null,
                "create_time": "2021-09-30T16:43:00.806Z",
                "update_time": "2021-09-30T16:43:00.806Z",
                "service_account_id": "srvacc_xxxxxxxxxxxxxxxxxxxxxxxxx",
                "file_name": null,
                "state": "created",
                "sub_state": "none",
                "source_upload_id": "upload_zzzzzzzzzzzzzzzzzzzzzzzzz",
                "source_uri": null,
                "playback_policy": "public",
                "progress": 0,
                "error": null,
                "duration": null,
                "resolution": null,
                "metadata": {
                    "key": "value"
                }
            }
        ]
    }
} */

    const transcodeVideoUpload = function(data) {
      try
      { 
        let metadata = {};
        metadata.key = data.metadata_key;
        metadata.value = data.metadata_value;
        var options = {
          'method': 'POST',
          'url': 'https://api.thetavideoapi.com/video',
          'headers': {
            'x-tva-sa-id': process.env.THETA_API_KEY,
            'x-tva-sa-secret': process.env.THETA_API_SECRET,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"source_upload_id":`${data.upload_id}`,"playback_policy":"public","nft_collection":`${data.nft_collection}`,"metadata":`${metadata}`})
        
        };
        let resp;
        request(options, function (error, response) {
          if (error) throw new Error(error);
          console.log(response.body);
          resp = response.body;
        });

        return successResponse(200, resp, {"response" : resp}, "video uploaded successfully");
  
       } catch (error) {
              console.error('error -> ', logStruct('transcodeVideoUpload', error))
              return errorResponse(error.status, error.message);
            }
    }

    router.post('/vod/upload', function(req, res, next) {
      const response =  transcodeVideoUpload(req.body);
      return res.status(response.status).send(response)
    });

// Transcode a Video using an external URI    

/**
 * var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://api.thetavideoapi.com/video',
  'headers': {
    'x-tva-sa-id': 'srvacc_xxxxxxxxxxxxxxxxxxxxxxxxx',
    'x-tva-sa-secret': 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({"source_uri":"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4","playback_policy":"public","nft_collection":"0x5d0004fe2e0ec6d002678c7fa01026cabde9e793","metadata":{"key":"value"}})

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
 */

// Response
/**
 * 
 * {
    "status": "success",
    "body": {
        "videos": [
            {
                "id": "video_vvvvvvvvvvvvvvvvvvvvvvvvvv",
                "playback_uri": null,
                "create_time": "2021-09-30T16:50:56.662Z",
                "update_time": "2021-09-30T16:50:56.662Z",
                "service_account_id": "srvacc_xxxxxxxxxxxxxxxxxxxxxxxxx",
                "file_name": null,
                "state": "created",
                "sub_state": "none",
                "source_upload_id": null,
                "source_uri": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                "playback_policy": "public",
                "progress": 0,
                "error": null,
                "duration": null,
                "resolution": null,
                "metadata": {
                    "key": "value"
                }
            }
        ]
    }
}
 */

const transcodeVideoUri = function(data) {
  try
  { 
    let metadata = {};
    metadata.key = data.metadata_key;
    metadata.value = data.metadata_value;
    var options = {
      'method': 'POST',
      'url': 'https://api.thetavideoapi.com/video',
      'headers': {
        'x-tva-sa-id': process.env.THETA_API_KEY,
        'x-tva-sa-secret': process.env.THETA_API_SECRET,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"source_uri":`${data.source_uri}`,"playback_policy":"public","nft_collection":`${data.nft_collection}`,"metadata": `${metadata}`})
    
    };
    let resp;
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
      resp = response.body;
    });

    return successResponse(200, resp, {"response" : resp}, "video recorded successfully");

   }catch (error) {
          console.error('error -> ', logStruct('transcodeVideoUpload', error))
          return errorResponse(error.status, error.message);
        }
}

router.post('/vod/uri', function(req, res, next) {
  const response =  transcodeVideoUri(req.body);
  return res.status(response.status).send(response)
});

//GET your Video to check it's progress
const transcodeUploadVideoProgress = function(data) {
  try
  { 
    let metadata = {};
    metadata.key = data.metadata_key;
    metadata.value = data.metadata_value;
    const video_url = 'https://api.thetavideoapi.com/video/';
    var options = {
      'method': 'POST',
      'url': `${video_url}${data.video_id}`,
      'headers': {
        'x-tva-sa-id': process.env.THETA_API_KEY,
        'x-tva-sa-secret': process.env.THETA_API_SECRET,
        'Content-Type': 'application/json'
      },
      
      body: JSON.stringify({"source_uri":`${data.source_uri}`,"playback_policy":"public","nft_collection":`${data.nft_collection}`,"metadata": `${metadata}`})
    
    };
    let resp;
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
      resp = response.body;
    });

    return successResponse(200, resp, {"response" : resp}, "video progress feteched successfully");

   }catch (error) {
          console.error('error -> ', logStruct('transcodeUploadVideoProgress', error))
          return errorResponse(error.status, error.message);
        }
}

router.post('/vod/get', function(req, res, next) {
  const response =  transcodeUploadVideoProgress(req.body);
  return res.status(response.status).send(response)
});

/**
 * 
 * var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://api.thetavideoapi.com/video/video_vvvvvvvvvvvvvvvvvvvvvvvvvv',
  'headers': {
    'x-tva-sa-id': 'srvacc_xxxxxxxxxxxxxxxxxxxxxxxxx',
    'x-tva-sa-secret': 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
 */

//Theta Video API DRM Player

/**
 * import React, { Component } from 'react'

import { StudioPlayer } from 'theta-video-api-drm-player'
import 'theta-video-api-drm-player/dist/index.css'

const Example = () => {
  const walletConnectParams = {
    appName: "Your App Name",
    projectId: "Your Project ID"
  };

  const params = {
    signin: signin,
    jwt: jwt,
    autoconnect: true|false,
    useBeta: false|true
  }

  return (
    <StudioPlayer
      videoId={"Video ID"}
      walletConnectParams={walletConnectParams}
      params={params}
    />
  );
}
  // WalletConnect Authentication 
  {
    "projectId": "your_project_id",
    "appName": "your_app_name"
}
 */
//Server-side JWT creation
//Get your service account secret from your Theta Video API dashboard.
/**
 * const jwt = require('jsonwebtoken');

const algorithm = { algorithm: "HS256" };
function createTvaJwt(serviceAccount) {
    let expiration = new Date().getTime() / 1000;
    expiration += 120; // partners can choose how long the JWT can last

    let payload = {
        service_account_id: serviceAccount.id,
        iss: "auth0",
        exp: expiration,
    };
    return jwt.sign(payload, serviceAccount.secret, algorithm);
}
 */

//Theta Edgestore Auth Token

/**
 * if (!window.ethereum) {
  // should not reach here.
  throw 'wallet not installed';
}

const timestamp = Date.now().toString();
const msg = 'Theta EdgeStore Call ' + timestamp; 

const sig = await window.ethereum.request({
  method: 'personal_sign',
  params: [msg, address],
});

const auth_token = timestamp + "." + address + "." + sig;

// 1673992464885.0xec2a725e3855275c0c7cd725bf0dc7be95dca517.0x80a7f6ffc969f33603c532a72469d9e47edf6758c496b7d772210f745b63897a0b0a954fa16ed8aaa1321d7b73a23a6d65ea66bb4b345a6ee79aeb30fd5d8df61c
 */


/**
 * <!DOCTYPE html>
<html>
​
<head>
   <meta charset="utf-8">
   <title>Where To?</title>
   <link href="https://vjs.zencdn.net/7.15.4/video-js.css" rel="stylesheet" />
   <script src='https://vjs.zencdn.net/7.15.4/video.js'></script>
   <script src="https://cdn.jsdelivr.net/npm/hls.js@0.12.4"></script>
   <script src="https://d1ktbyo67sh8fw.cloudfront.net/js/theta.umd.min.js"></script>
   <script src="https://d1ktbyo67sh8fw.cloudfront.net/js/theta-hls-plugin.umd.min.js"></script>
   <script src="https://d1ktbyo67sh8fw.cloudfront.net/js/videojs-theta-plugin.min.js"></script>
</head>
​
<body>
   play video boii {{.}}
   <video id="my-player" controls></video>
</body>
<script>
   const optionalHlsOpts = null;
   const optionalThetaOpts = {
      allowRangeRequests: true, // false if cdn does not support range headers  
   };
   const player = window.player = videojs('my-player', {
      autoplay: true,
      muted: false,
      techOrder: ["theta_hlsjs", "html5"],
      sources: [{
         src: "https://media.thetavideoapi.com/srvacc_3z8e4t0g2jkfr57xsz3gqvpj0/video_kzh225ce37vvpsjvpqt8kh8ki5/1631659816016.m3u8",
         type: "application/vnd.apple.mpegurl",
         label: "1080p"
      }],
      theta_hlsjs: {
         videoId: "a video id",
         userId: "a user id",
         onThetaReady: null, // optional listener
         onStreamReady: null, // optional listener
         hlsOpts: optionalHlsOpts,
         thetaOpts: optionalThetaOpts,
      }
   });
</script>
​
</html>
 * 
 * 
 */

module.exports = router;