var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ingredient = require('./Ingredient').schema;

var recipes = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  introductionText: {
    type: String
  },
  outroText: {
    type: String
  },
  preparationTime: {
    type: Number,
    required: true
  },
  portions: {
    type: Number,
    required: true
  },
  difficulty: {
    type: String,
    required: true
  },
  ingredients: [{
    qty: Number,
    displayQty: String,
    details: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredient'
    }
  }],
  preparationSteps: {
    type: Array,
    required: true
  }
});

module.exports = mongoose.model('Recipe', recipes)
