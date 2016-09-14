var changeCase = require('change-case');
var express = require('express');
var routes = require('require-dir')();
var jwt = require('express-jwt');

var jwtCheck = jwt({
  secret: new Buffer('Dz1Odb0C0UI6ykf4ClYyvLzwD77BVAhI2t79kE5w7YcUaTTbzjdoS14Mhq6dmZnr', 'base64'),
  audience: 'x4cCX8jLWnnXtOncngLmLM4619MSCBrk'
});

module.exports = function(app) {
  'use strict';
  var allRoutes = []

  // Initialize all routes
  Object.keys(routes).forEach(function(routeName) {
    var router = express.Router();
    // You can add some middleware here
    // router.use(someMiddleware);
    if (routeName !== "login") {
      router.use(jwtCheck);
    }
    // Initialize the route to add its functionality to router
    require('./' + routeName)(router);

    // Add router to the speficied route name in the app
    allRoutes.push(routeName);
    app.use('/' + changeCase.paramCase(routeName), router);
  });


  app.get('/', function(req, res, next) {
    res.json(allRoutes)
  })
};
