'use strict';

var nconf = require('nconf');
var logger = require('winston');
var server = require('./server');

// Load Environment variables from .env file
require('dotenv').load();

// Set up configs
nconf.use('memory');
// First load command line arguments
nconf.argv();
// Load environment variables
nconf.env();
// Load config file for the environment
var config = require('./config/environments/' + nconf.get('NODE_ENV'));

logger.info('[APP] Starting server initialization');

server(config, function(err) {
  if (err) {
    return logger.error('[APP] Server initialization failed.');
  }
  logger.info('[APP] Server initialized successfully.');
});
