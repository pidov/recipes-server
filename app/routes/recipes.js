module.exports = function(router, db) {
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
      console.log(db);
      res.json([])
    }).post(function(req, res, next) {
      // Create new recipe
    });
};
