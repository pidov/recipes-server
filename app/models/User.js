var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var users = new Schema({
  email: {
    type: String,
    required: true
  },
  firstName: String,
  lastName: String
});

module.exports = mongoose.model('User', users)
