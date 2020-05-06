var express = require('express');
var router = express.Router();

var config = require('./config.js');
var ENV = process.env.NODE_ENV || 'developement';
// console.log(ENV);
// var DB_URI = config.db[ENV].url;
// console.log(DB_URI);
const path = require('path');

// const mysql = require('mysql');

const connection = require('./db.js');

router.get("/", function(req, res){

 res.send("HELLO FROM OUR WEB APP!");
});

module.exports = router;




