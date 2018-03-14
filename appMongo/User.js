var mongoose = require('mongoose');
//create a schema
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;
  

var Userschema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: String,
  totalPoints: Number,
},
  { timestamps: true }
  );
//  create a model 

Userschema.statics.getUsers = function() {
  return this.aggregate([
        {
      $lookup: {
        from: "tasks",
        localField: "_id",
        foreignField: "userId",
        as: "tasks"
      }
    },
        {
      $project: {
        name: "$$ROOT.name",
        tasks: "$tasks"
      }
    }
  ]);
};


module.exports = mongoose.model('User',Userschema);
