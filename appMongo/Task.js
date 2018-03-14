var mongoose = require('mongoose');
//create a schema
var Schema = mongoose.Schema;
  
var Taskschema = new Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref:"User"
  },
  name: String,
  points: Number,
},
  { timestamps: true }
    );
//  create a model 

module.exports = mongoose.model('Task',Taskschema);