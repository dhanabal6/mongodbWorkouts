var mongoose = require('mongoose');
//create a schema
var Schema = mongoose.Schema;


var childSchema = new Schema({}, { strict: false });
var Timesheetschema = new Schema({ _id:Schema.Types.ObjectId, data: [Schema.Types.Mixed] },
{_id: false, strict: false  });
/*
const childSchema = new Schema({
    projectName: String,
    taskName: String,
    spendTime: Number,
    taskCompletion: Number
});

var Timesheetschema = new Schema({
  _id:Number,
   data : Schema.Types.Mixed,
},{ strict: false },{ _id: false });*/


module.exports = mongoose.model('Timesheet',Timesheetschema);