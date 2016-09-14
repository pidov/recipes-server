var Recipe = require('../models/Recipe');
var Ingredient = require('../models/Ingredient');
var logger = require('winston');
var path = require('path');
module.exports = function(router) {
  'use strict';
  // This will handle the url calls for /recipes/:recipeId

  router.route('/')
    .get(function(req, res, next) {
      res.sendFile(path.join(__dirname, '../../public', 'login.html'));
    })
};
