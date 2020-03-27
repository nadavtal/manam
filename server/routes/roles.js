
var express = require('express');
var app = module.exports = express();
const connection = require('../db.js');



//ROLES ROUTES
app.get("/roles", function(req, res){
  console.log('getting roles')
  var q = `select * from tbl_roles`;
  connection.query(q, function (error, results) {
  if (error) throw error;

  res.send(results);
  });
});


//ROLES TYPES ROUTES
app.get("/roleTypes", function(req, res){
  console.log('getting rolesTypes')
  var q = `select * from tbl_roles_types`;
  // console.log(q)
  connection.query(q, function (error, results) {
  if (error) throw error;

  res.send(results);
  });
});

