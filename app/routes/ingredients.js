var Ingredient = require('../models/Ingredient');
var logger = require('winston');

module.exports = function(router) {
  'use strict';
  // This will handle the url calls for /recipes/:recipeId
  router.route('/:recipeId')
    .get(function(req, res, next) {
      // Return recipe
    })
    .put(function(req, res, next) {
      // Update recipe
    })
    .patch(function(req, res,next) {
      // Patch
    })
    .delete(function(req, res, next) {
      // Delete record
    });

  router.route('/')
    .get(function(req, res, next) {
      Ingredient.find({}, function(err, ingredients) {
        if (err) {
          logger.error('[INGREDIENTS ROUTE] Error getting ingredients', err.errors);
          res.json(err)
        };
        res.json(ingredients);
      })
    })
    .post(function(req, res, next) {

      var newIngredient = new Ingredient(req.body);

      newIngredient.save(function(err, ingredient) {
        if (err) {
          //TODO: Add validation handling
          logger.error('[INGREDIENTS ROUTE] Error saving ingredient', err.errors);
          res.json(err)
          return;
        }
        res.json(ingredient)
      })

    });
};
