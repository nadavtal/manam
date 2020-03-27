
var express = require('express');
var app = module.exports = express();
const connection = require('../db.js');

//USERS ROUTES
app.get("/users", function(req, res){
  console.log('getting users')
  var q = 'SELECT * FROM tbl_users';
  connection.query(q, function (error, results) {
  if (error) throw error;

  res.send(results);
  });
 });

app.post("/users", function(req, res){
  console.log('creating user', req.body);
  const user = req.body
  var q = `INSERT INTO tbl_users ( user_name, password, phone, status, remarks, first_name, last_name, date_created, user_image, email )
  VALUES
  ( '${user.user_name}', '${user.password}', '${user.phone}', 'active', '${user.remarks}', '${user.first_name}', '${user.last_name}', now(), '', '${user.email}');`
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) throw error;

  res.send(results);
  });
 });

//other routes..

