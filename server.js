var express = require('express');
var path = require('path');
var config = require('nconf');

// create the express app
// configure middlewares
var bodyParser = require('body-parser');
var morgan = require('morgan');
var logger = require('winston');
var app, db;

var start =  function(cb) {
  'use strict';
  // Configure express
  app = express();

  app.use(morgan('common'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json({type: '*/*'}));

  logger.info('[SERVER] Initializing routes');
  require('./app/routes/index')(app, db);

  // Error handler
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: (app.get('env') === 'development' ? err : {})
    });
    next(err);
  });

  app.listen(config.get('NODE_PORT'));
  logger.info('[SERVER] Listening on port ' + config.get('NODE_PORT'));

  if (cb) {
    return cb();
  }
};

module.exports = start;
