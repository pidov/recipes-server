var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
  ingredients: {
    type: Array
  },
  preparationSteps: {
    type: Array,
    required: true
  }

});

module.exports = mongoose.model('Recipe', recipes)
