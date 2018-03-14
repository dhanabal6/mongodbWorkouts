const mongoose = require("mongoose");  
const db =   
mongoose.connect('mongodb://dhana:dhana@ds137246.mlab.com:37246/workouts' , { useMongoClient: true },  (err, res) => {  
   if(err){ console.log('Failed to connect to ' + db); }  
   else{ console.log(res.db.s.databaseName + 'DB Connected Successfully'); }  
});  
  
  
module.exports = db;
	