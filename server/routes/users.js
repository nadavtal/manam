
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
  var q = `INSERT INTO tbl_users ( user_name, password, phone, status, remarks, first_name, last_name, date_created, user_image, email, address )
  VALUES
  ( '${user.user_name}', '${user.password}', '${user.phone}', 'active', '${user.remarks}', '${user.first_name}', '${user.last_name}', now(), '', '${user.email}', '${user.address}');`
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

  // var q = `SELECT * FROM db_3dbia.tbl_organizations_users where user_id = ${req.params.id}`;
  // var q = `SELECT p.id as projectId, name , s.id as surveyId, survey_type, company, Survey_date
  // FROM tbl_projects p
  // INNER JOIN projects_surveys ps
  // ON ps.projectId = p.id
  // INNER JOIN surveys s
  // ON s.id = ps.surveyId
  // WHERE p.id = ${id};`;
  var q = `SELECT o.id as org_id, r.id as role_id, o.name as org_name, r.name as role_name, ou.remarks FROM tbl_organizations_users ou
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
  var q = `SELECT * FROM tbl_provider_users pu
  INNER JOIN tbl_providers p
  ON pu.provider_id = p.id
  AND pu.user_id = ${req.params.id}`;
  // INNER JOIN tbl_roles r
  // ON ou.role_id = r.id`;
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) throw error;

  res.send(results);
  });
 });

 //GET USER
 app.get("/users/:email/:password", function(req, res){
  console.log('getting user')
  // var q = `SELECT * FROM db_3dbia.tbl_users u
  // INNER JOIN tbl_users_roletypes ur
  //   ON ur.userId = u.id where user_name = '${req.params.email}' and password = '${req.params.password}'`
  var q = `SELECT * FROM db_3dbia.tbl_users where email = '${req.params.email}' and password = '${req.params.password}'`

  connection.query(q, function (error, results) {
  if (error) throw error;

  res.send(results[0]);
  });
 });


 app.get("/providers/:id/organizations", function(req, res){
  console.log('getting organizations by provider: '+ req.params.id);
  var q = `SELECT id, name , contact_name, phone, email, address, website
  FROM tbl_organizations p
  INNER JOIN tbl_organization_providers op
  ON op.organization_id = p.id
  AND op.provider_id = ${req.params.id}`;
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
//other routes..

