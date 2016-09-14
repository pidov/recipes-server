var express = require('express');
var path = require('path');
var config = require('nconf');

// create the express app
// configure middlewares
var bodyParser = require('body-parser');
var morgan = require('morgan');
var logger = require('winston');

var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var app;

var start =  function(options, cb) {
  'use strict';
  logger.info('[SERVER] Initializing database connection');


  mongoose.connect(options.db.url, {}, function(err) {
    if (err) {
      logger.error('[DATABASE] Failed to connect to databse. The database said: ', err.message);

      if (cb) {
        return cb();
      }

      return;
    }
    // Configure express
    app = express();
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    app.use(morgan('common'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json({type: '*/*'}));


    logger.info('[SERVER] Initializing routes');
    require('./app/routes/index')(app);

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
  });
};

module.exports = start;
