var Recipe = require('../models/Recipe');
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
      Recipe.find({}, function(err, recipes) {
        if (err) throw err;
        res.json(recipes);
      })
    })
    .post(function(req, res, next) {

      var newRecipe = new Recipe(req.body);

      newRecipe.save(function(err, recipe) {
        if (err) {
          //TODO: Add validation handling
          logger.error('[RECIPES ROUTE] Error saving recipe', err.errors);
          res.json(err)
          return;
        }
        res.json(recipe)
      })

    });
};
