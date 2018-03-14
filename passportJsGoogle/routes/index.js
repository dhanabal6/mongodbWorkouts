var express = require('express');
var passport = require('passport');
var router = express.Router();
var passportGoogle = require('../autho/googleSt');


router.get('/api',  (req, res) => {
    res.send({ user : req.user });
});

router.get('/login', (req, res, next) => {
  res.send('Go back and register!');
});

router.get('/logout', (req, res) => {
    req.logout();   
    res.send('logout success');
});

router.get('/auth/google', passportGoogle.authenticate('google'));

router.get('/auth/google/callback',
  passportGoogle.authenticate('google', { failureRedirect: '/login' }),
  (req, res) =>  {
    // Successful authentication
    res.json(req.user);
  });

module.exports = router;