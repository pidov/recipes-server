var Recipe = require('../models/Recipe');
var Ingredient = require('../models/Ingredient');
var logger = require('winston');

module.exports = function(router) {
  'use strict';
  // This will handle the url calls for /recipes/:recipeId
  router.route('/:name')
    .get(function(req, res, next) {
      // Return recipe
      Recipe.findOne({
        name: req.params.name
      }, function(err, recipe) {
        if (err) {
          logger.error('[GET RECIPES/{NAME}] Error getting recipe', err.errors);
          return res.json(err)
        }

        res.json(recipe || {})
      })
    })
    .put(function(req, res, next) {
      Recipe.findOneAndUpdate({
        name: req.params.name
      }, req.body, function(err, recipe) {
        if (err) {
          logger.error('[PUT RECIPES/{NAME}] Error updating recipe', err.errors);
          return res.json(err)
        }

        res.json(recipe);
      });
    })
    .delete(function(req, res, next) {
      Recipe.findOneAndRemove({
        name: req.params.name
      }, function(err) {
        if (err) {
          logger.error('[DELETE RECIPES/{NAME}] Error updating recipe', err.errors);
          return res.json(err)
        }

        res.json({});
      });
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
          logger.error('[POST RECIPES] Error saving recipe', err.errors);
          console.log(err);
          return res.json(err)
        }
        res.json(recipe)
      })

    });
};
