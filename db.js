var Mongo = require('mongodb');
//console.log(mongo);
var url = "mongodb://localhost:27017/sample";

Mongo.connect(url,function(err,db){
	if(err) throw err;

	//insert data

	var rec = [{name:"dhanabal",age:"25",_id:"0"},
	{name:"dhanbal",age:"28",_id:"1"},
	{name:"dhanabl",age:"27",_id:"2"},
	{name:"dhanab",age:"22",_id:"3"},
	{name:"dhanaal",age:"22",_id:"4"}];
	console.log('Database Create success');
   db.collection("collect").insertMany(rec,function(err,data){
    	if(err) throw console,log(err);
    	console.log(data);
    	console.log(data.insertedCount);
    	})

    // select Data

    db.collection("collect").find({}).toArray(function(err,data){
    	if(err) throw console.log(err);
    	console.log(data);
    	})

   // delete data

  var query = {age:"27"} 
   db.collection("collect").deleteOne(query,function(err,res){
   	if(err) throw console.log(err);
   	console.log(res.result.n+"delete success");
   	}) 	

   // search data from collection

   var srch = {name:"dhanabal"};
   db.collection("collect").find(srch).toArray(function(err,res){
   	if(err) throw console.log(err);
   	console.log("data serch success");
   	console.log(res);
   	})

   // drop a collection

  db.collection("collect").drop(function(err,res){
  	if(err) throw console.log(err);
   	console.log("data drop success");
  	console.log(res);
  	})
  
  // update data
  
     var qry = {name:"dhanabal"};
     var upt = {name:"dhana"};
     db.collection("collect").updateOne(qry,upt,function(err,res){
     	if(err) throw console.log(err);
     	console.log("data upate success");
     	console.log(res);
     	})


	})