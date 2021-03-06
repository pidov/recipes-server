var Recipe = require('../models/Recipe');
var Ingredient = require('../models/Ingredient');
var logger = require('winston');

module.exports = function(router) {
  'use strict';
  // This will handle the url calls for /recipes/:recipeId
  router.route('/:id')
    .get(function(req, res, next) {
      // Return recipe
      Recipe.findOne({
        '_id': req.params.id
      })
      .populate('ingredients.details')
      .exec(function(err, recipe) {
        if (err) {
          logger.error('[GET RECIPES/{NAME}] Error getting recipe', err.errors);
          return res.json(err)
        }

        res.json(recipe || {})
      })
    })
    .put(function(req, res, next) {
      Recipe.findOneAndUpdate({
        '_id': req.params.id
      }, req.body, {
        new: true
      }, function(err, recipe) {
        if (err) {
          logger.error('[PUT RECIPES/{ID}] Error updating recipe', err.errors);
          return res.json(err)
        }

        res.json(recipe);
      });
    })
    .delete(function(req, res, next) {
      Recipe.findOneAndRemove({
        "_id": req.params.id
      }, function(err) {
        if (err) {
          logger.error('[DELETE RECIPES/{ID}] Error updating recipe', err.errors);
          return res.json(err)
        }

        res.json({});
      });
    });

  router.route('/')
    .get(function(req, res, next) {
      Recipe.find(req.query)
      .exec(function(err, recipes) {
        if (err) throw err;

        res.json(recipes);
      })
    })
    .post(function(req, res, next) {
      var newRecipe = new Recipe(req.body);
      newRecipe.save(function(err, recipe) {
        if (err) {
          logger.error('[POST RECIPES] Error saving recipe', err.errors);
          return res.json(err)
        }

        res.json(recipe)
      })

    });
};
