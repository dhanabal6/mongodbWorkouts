const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const Register = require("./Register");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

//database connection
const db = require("./config.js");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended:true }));

app.use(express.static(path.join(__dirname, 'build')));

//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// index page 
app.get('/', function(req, res) {
  res.send("data");
});

//POST route for updating data
app.post('/', function (req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }
    Register.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.send('data Sucessfully create');
      }
    });

  } else if (req.body.logemail && req.body.logpassword) {
    Register.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.send('autho');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})


app.get('/profile',  (req, res, next) => {
  Register.findById(req.session.userId)
    .exec( (error, user) => {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
        }
      }
    });
});

app.get('/logout', (req, res, next) => {
  if (req.session) {
    // delete session object
    req.session.destroy((err) => {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});


app.listen(3001, () => console.log("App listening on port 3001!"));