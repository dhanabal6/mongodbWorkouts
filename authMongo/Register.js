var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

//create a schema
var Schema = mongoose.Schema;

var RegisterSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  passwordConf: {
    type: String,
    required: true,
  }
}, { timestamps: true });

//authenticate input against database
RegisterSchema.statics.authenticate =  (email, password, callback) => {
  Register.findOne({ email: email })
    .exec( (err, register) => {
      if (err) {
        return callback(err)
      } else if (!register) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, register.password,  (err, result) => {
        if (result === true) {
          return callback(null, register);
        } else {
          return callback();
        }
      })
    });
}

//hashing a password before saving it to the database
RegisterSchema.pre('save',  (next) =>  {
  var register = this;
 bcrypt.genSalt(10,(err,salt) => {
    if (err) {
      return next(err);
    }
  bcrypt.hash(register.password, salt,  (err, hash) => {
    register.password = hash;
    next();
  })
 });
  
});


var Register = mongoose.model('Register', RegisterSchema);
module.exports = Register;