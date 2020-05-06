
var express = require('express');
var app = module.exports = express();
const connection = require('../db.js');
const jwt = require('jsonwebtoken');
const config = require('../config.js')
const generator = require('generate-password');
//USERS ROUTES
// console.log(config)
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
  const password = generator.generate({
    length: 6,
    numbers: true
  });
  const user = req.body
  const token = jwt.sign({ 
    email: user.email, password: user.password 
  }, config.secret);
  var q = `INSERT INTO tbl_users (
     user_name, password, phone, general_status, remarks, first_name, 
     last_name, date_created, user_image, email, address, confirmation_token )
  VALUES
  ( '${user.user_name}', '${password}', '${user.phone}', 
  '${user.general_status? user.general_status : 'Awaiting confirmation'}', '${user.remarks}', 
  '${user.first_name}', '${user.last_name}', now(), '', '${user.email}', '${user.address}',
  '${token}');`
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) throw error;
  
  user.id = results.insertId
  res.send({user, token});
  });
 });
 app.post("/users/confirmation", function(req, res){
  console.log('confirming user', req.body)
  const decoded = jwt.verify(req.body.token, config.secret)
  // var q = `SELECT * FROM db_3dbia.tbl_users u
  // INNER JOIN tbl_users_roletypes ur
  //   ON ur.userId = u.id where user_name = '${req.params.email}' and password = '${req.params.password}'`
  var q = `UPDATE tbl_users
  SET confirmation_token = '',
      status = 'confirmed'
  WHERE email = '${decoded.email}';`

  connection.query(q, function (error, results) {
  if (error) throw error;
  
  res.send(results);
  });
 });
 app.get("/users/email/:email", function(req, res){
  console.log('getting user by mail', req.params.email)
  // var q = `SELECT * FROM db_3dbia.tbl_users u
  // INNER JOIN tbl_users_roletypes ur
  //   ON ur.userId = u.id where user_name = '${req.params.email}' and password = '${req.params.password}'`
  var q = `SELECT * FROM db_3dbia.tbl_users where email = '${req.params.email}'`

  connection.query(q, function (error, results) {
  if (error) throw error;
  
  res.send(results);
  });
 });
 app.get("/users/login/:email/:password", function(req, res){
  console.log('getting userrrrr', req.params);

  var q = `SELECT * FROM db_3dbia.tbl_users where email = '${req.params.email}' and password = '${req.params.password}'`

  connection.query(q, function (error, results) {
    console.log(results)
    if (error) res.send(error);
    // jwt.sign({ foo: 'bar' }, 'Manam', { algorithm: 'RS256' }, function(err, token) {
    //   console.log(token);
    // });
    if(results.length) {
      const user = results[0]
      const token = jwt.sign({ 
        email: user.email, password: user.password 
      }, config.secret);

      if (token && user) res.send({user, token});
    } else{
      res.send({msg: 'There is no user with these email & password'})
    }
    // console.log(token)
  });
 });
 
app.post("/users/:id/roles", function(req, res){
  console.log('creating user roles', req.body, req.params.id);
  const userRoles = req.body;
  const values = userRoles.map(role => [req.params.id, role])
  console.log(values)
  var q = `INSERT INTO tbl_users_roletypes ( userId, roletypeId)
  VALUES ?`;
  console.log(q)
  connection.query(q, [values], function (error, results) {
  if (error) throw error;

  res.send(results);
  });
 });

 app.get("/users/:id/roles-types", function(req, res){
  console.log('getting user role types', req.params.id);

  var q = `SELECT * FROM db_3dbia.tbl_users_roletypes where userId = ${req.params.id}`;
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) throw error;

  res.send(results);
  });
 });

 app.get("/users/:id/organization-roles", function(req, res){
  console.log('getting user organziation-roles', req.params.id);
  var q = `SELECT o.id as org_id, ou.from_provider_id as prov_id, r.id as role_id, o.name as org_name, r.name as role_name, ou.remarks FROM tbl_organizations_users ou
  INNER JOIN tbl_organizations o
  ON ou.organization_id = o.id
  AND ou.user_id = ${req.params.id}
  INNER JOIN tbl_roles r
  ON ou.role_id = r.id`;
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) throw error;

  res.send(results);
  });
 });

 app.get("/users/:id/provider-roles", function(req, res){
  console.log('getting user provider-roles', req.params.id);

  // var q = `SELECT * FROM db_3dbia.tbl_provider_users where user_id = ${req.params.id}`;
  var q = `SELECT p.id as provider_id, r.id as role_id, p.name as provider_name, r.name as role_name, pu.remarks FROM tbl_provider_users pu
  INNER JOIN tbl_providers p
  ON pu.provider_id = p.id
  AND pu.user_id = ${req.params.id}
  INNER JOIN tbl_roles r
  ON pu.role_id = r.id`;
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) throw error;

  res.send(results);
  });
 });
 app.get("/users/:id", function(req, res){
  console.log('getting user', req.params.id)
  // var q = `SELECT * FROM db_3dbia.tbl_users u
  // INNER JOIN tbl_users_roletypes ur
  //   ON ur.userId = u.id where user_name = '${req.params.username}' and password = '${req.params.password}'`
  var q = `SELECT * FROM db_3dbia.tbl_users where id = ${req.params.id}`
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results[0]);
  });
 });
 app.put("/users/:id", function(req, res){
  const user = req.body
  console.log('updating user');
  var q = `UPDATE tbl_users
  SET password = '${user.password}',
      phone = '${user.phone}',
      general_status = '${user.general_status}',
      remarks = '${user.remarks}',
      first_name = '${user.first_name}',
      last_name = '${user.last_name}',
      user_image = '${user.user_image}',
      email = '${user.email}',
      address = '${user.address}'
  WHERE id = ${req.params.id};`

  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
 //GET USER
 



//other routes..

