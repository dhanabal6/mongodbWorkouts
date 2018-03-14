var mongoose = require('mongoose');
//create a schema
var Schema = mongoose.Schema;


// schema define attr
var Userschema = new Schema({
 name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  location: String,
  meta: {
    age: Number,	
    website: String
  },
  created_at: Date,
  updated_at: Date
	})
//  create a model 
var Userschemaer = mongoose.model('User',Userschema);

module.exports = User;