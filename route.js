'use strict';

// require('dotenv').config();
const http = require('http');
const port = process.env.SRV_PORT || '4444';

const app = require('./app');

app.set('port', port);

const route = http.createServer(app);

route.listen(port);

route.on('error', (error) => {
  console.error('error found', error)
});

route.on('listening', () => {
  console.log('Integration Server running at ', port)
});

