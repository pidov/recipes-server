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
require('./config/environments/' + nconf.get('NODE_ENV'));

logger.info('[APP] Starting server initialization');

server(function() {
  logger.info('[APP] Server initialized successfully.');
});
