var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://127.0.0.1:27017/dhana";
var url = "mongodb://localhost:27017/dhana";

MongoClient.connect(url,function(err,db){
	if(err) throw err;
	var obj = {name:"dhana",age:"25"};
     console.log("create db succesfully");
     db.collection("users").insertOne(obj,function(err,res){
     	if(err) throw err;
     	console.log('table craete succesfully');
     	console.log("No of Filess  "+res.insertedCount);
     	console.log(res);

     	})
     db.close();  
	});

//console.log(MongoClient);