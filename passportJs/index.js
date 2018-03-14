const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const session = require('express-session');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');

const routes = require('./routes/index');
const app = express();


//database connection
const db = require("./config.js");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended:true }));

app.use(express.static(path.join(__dirname, 'build')));
app.use(cookieParser());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', routes);

// passport config
var Account = require('./model/Account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.listen(3001, () => console.log("App listening on port 3001!"));