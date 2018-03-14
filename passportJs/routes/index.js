var express = require('express');
var passport = require('passport');
var Account = require('../model/Account');
var router = express.Router();


router.get('/api', function (req, res) {
    res.send({ user : req.user });
});

router.get('/register', function(req, res) {
    console.log(req.session)
    res.send({reg: "dta" });

});

router.post('/register', function(req, res, next) {
    Account.register(new Account({ username : req.body.username,password:req.body.password }),req.body.password, function(err, account) {
        if (err) {
            return res.send({ account : "error" });
        }else{
            return res.send({data:account});
        }
        passport.authenticate('local')(req, res, function () {
              req.session.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.send('its authenticated and logged in');
            });
        });
    });
});

router.get('/login', function(req, res) {
    res.send({ sessionID : req.sessionID });
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/api/login' }), function(req, res) {
    console.log(req.body);

    res.send('login success');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.send('logout success');
});


module.exports = router;