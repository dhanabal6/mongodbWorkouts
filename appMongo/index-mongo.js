const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const User = require("./User");
//database connection
const db = require("./config.js");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended:true }));

app.use(express.static(path.join(__dirname, 'build')));

// set the view engine to ejs
app.set('view engine', 'ejs');

// index page 
app.get('/', function(req, res) {
  res.send("data");
    // res.render('pages/index');
});

app.post('/', function(req, res) {
	console.log(req.body);
  const users = new User(req.body);
  users.save();
  res.send("data saved Sucessfully");
  console.log("data saved Sucessfully");
  // res.render('pages/index');
});


app.get('/view', (req,res) => {
const users = User.find({}, (err, data) => {
    if (err) {
      res.send(err);
    } else {
    console.log(data);
    res.send(data);
     // res.render('pages/about', {
     //        "userlist" : data
     //    });
    }
  });
});

app.get('/api/:userId', (req,res) => {
	console.log(req.params.userId);
	const editUser = User.findOne({_id:req.params.userId}, (err, data) => {
    console.log(data+"test");
     res.send(data);
    // res.render('pages/index', { "edituserlist": data } );
  });
})

app.post('/api/:userId' ,(req,res) => {
	const userUpdate =   User.findOneAndUpdate({_id: req.params.userId}, req.body,
    {upsert:true,new: true,runValidators: true}).exec();
    console.log('update data Sucessfully');
    res.send('update data Sucessfully');
    // res.render('pages/index');
})

/*app.get('/:userId/delete', (req,res) => {
  console.log(req.params.userId);
	const userDelete =  User.findOne({_id: req.params.userId}).remove().exec();
	console.log("data Deleted Sucessfully");
  res.send("data Deleted Sucessfully")
	// res.render('pages/index');
})*/

app.delete('/:userId/delete', (req,res) => {
  console.log(req.params.userId);
  const userDelete =  User.findOne({_id: req.params.userId}).remove().exec();
  console.log("data Deleted Sucessfully");
  res.send("data Deleted Sucessfully")
  // res.render('pages/index');
})


app.listen(3001, () => console.log("App listening on port 3001!"));