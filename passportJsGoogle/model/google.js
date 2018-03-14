var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create User Schema
var Google = new Schema({
  name: String,
  someID: String
});


module.exports = mongoose.model('google', Google);