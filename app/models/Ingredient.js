var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ingredient = new Schema({
  name: {
      type: String,
      required: true,
  },
  unit: {
    type: String
  },
  calories: {
    type: Number,
    required: true
  },
  proteins: {
    type: Number,
    required: true
  },
  fats: {
    type: Number,
    required: true
  },
  carbs: {
    type: Number,
    required: true
  },
  sugar: {
    type: Number
  },
  salt: {
    type: Number
  },
  fibre: {
    type: Number
  },
  saturates: {
    type: Number
  }
});

module.exports = mongoose.model('Ingredient', ingredient)
