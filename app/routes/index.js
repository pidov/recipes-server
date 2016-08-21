var changeCase = require('change-case');
var express = require('express');
var routes = require('require-dir')();

module.exports = function(app, db) {
  'use strict';

  // Initialize all routes
  Object.keys(routes).forEach(function(routeName) {
    var router = express.Router();
    // You can add some middleware here
    // router.use(someMiddleware);

    // Initialize the route to add its functionality to router
    require('./' + routeName)(router, db);

    // Add router to the speficied route name in the app
    app.use('/' + changeCase.paramCase(routeName), router);
  });
};
