const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const User = require("./User");
const Task = require("./Task");
const Timesheet = require("./Timesheet");


//database connection
const db = require("./config.js");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended:true }));

app.use(express.static(path.join(__dirname, 'build')));

// set the view engine to ejs
app.set('view engine', 'ejs');

// index page 
/*app.get('/', function(req, res) {
  res.send({message:"data"});
});*/

app.get('/', async(req, res) => {
  const data = await User.getUsers();
  console.log(data);
  for(var i=0; i<data.length; i++){
    console.log(data[i].name)
    let task = data[i].tasks;
    let sum=0;
     task.forEach(each => {
         sum+=each.points;
  });
     console.log(sum)
  // return sum;
  }
  // res.render('pages/about', { "userlist" : data});
  res.send(data);
});

app.post('/', function(req, res) {
	console.log(req.body);
  const users = new User(req.body);
  users.save();
  res.send({message:"data saved Sucessfully"});
});


app.get('/view', (req,res) => {
const users = User.find({}).exec((err, data) => {
    if (err) {
      res.send(err);
    } else {
    console.log(data);
    res.send(data);
    }
  });
});

/*timeSheet*/
app.post('/timesheet', function(req, res) {
  console.log(req.body);
  const timesheet = new Timesheet(req.body);
  timesheet.save((error, data) => {
    if (error) {
      res.send(error);
    } else {
      console.log(data);
      res.send(data);
    }
  });
});


app.get('/timesheet', async(req,res) => {

  const date = '2018-01-28';
  var query = {};
  query[`data.created`] = date;
  console.log(query);

/*
  const date = 'sample Projects'
  const key = '1231246312632.2018-01-27.projectName'
  var query = {};
  query[`data.${key}`] = date;
  console.log(query);*/

await Timesheet.find(query,(err, data) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
    console.log(data);
    res.send(data);
    }
  });

});

app.get('/api/:userId', (req,res) => {
	console.log(req.params.userId);
	const editUser = User.findOne({_id:req.params.userId}).populate('userId').exec((err, data) => {
    console.log(data+"test");
     res.send(data);
  });
});

app.post('/api/:userId' ,(req,res) => {
	const userUpdate =   User.findOneAndUpdate({_id: req.params.userId}, req.body,
    {upsert:true,new: true,runValidators: true}).exec();
    console.log('update data Sucessfully');
    res.send({message:'update data Sucessfully'});
})

app.delete('/:userId/delete', (req,res) => {
  console.log(req.params.userId);
  const userDelete =  User.findOne({_id: req.params.userId}).remove().exec();
  console.log("data Deleted Sucessfully");
  res.send({message:"data Deleted Sucessfully"})
})



/*task*/
app.post('/:userId', function(req, res) {
  console.log(req.body);
  req.body.userId = req.params.userId;
  const tasks = new Task(req.body);
  tasks.save((error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  });
});

app.get('/:userId', (req,res) => {
  console.log(req.params.userId);
  const editUser = Task.find({userId:req.params.userId}).populate('userId').exec((err, data) => {
   if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
})




app.listen(3001, () => console.log("App listening on port 3001!"));