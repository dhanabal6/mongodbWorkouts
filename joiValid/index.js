const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');

const db = require("./config.js");
const Joi = require('joi');
const expressJoi = require('express-joi-validator');


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended:true }));

var querySchema = {
    query: {
        limit: Joi.number().default(10).min(10).max(100),
        offset: Joi.number().default(10).min(10).max(100)
    }
};
 
app.get('/', expressJoi(querySchema), function (req, res, next) {
     res.send('validate')
});
 
var bodySchema = {
    body: {
        name: Joi.string().required(),
        username: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email(),
        age: Joi.number().required(),
        location: Joi.string().required(),
    }
};
 
app.post('/api', expressJoi(bodySchema), function (req, res, next) {
  console.log(req.body);
    res.send({message:'name recevied'})
});
 
app.use(function (err, req, res, next) {
    if (err.isBoom) {
         return res.status(err.output.statusCode).json(err.output.payload);
    }
});



app.listen(3001, () => console.log("App listening on port 3001!"));