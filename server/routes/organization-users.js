
var express = require('express');
var app = module.exports = express();
const connection = require('../db.js');
const jwt = require('jsonwebtoken');
const config = require('../config.js')


app.post("/organization-users", function(req, res){
  console.log('creating organization-users', req.body);
  const token = jwt.sign({ 
    user_id: req.body.userId, 
    organization_id: req.body.orgId,
    roleTypeId: req.body.roleTypeId
  }, config.secret);
  var q = `INSERT INTO tbl_organizations_users ( user_id, organization_id, role_id, remarks, date_created, status, confirmation_token)
  VALUES (${req.body.userId}, ${req.body.orgId}, ${req.body.roleTypeId}, '', now(), 'created', '${token}')`;
  // console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error) ;
  
  res.send({results, token});
  });
 });

 app.post("/organization-users/confirmation", function(req, res){
  console.log('confirming organization user', req.body)
  const decoded = jwt.verify(req.body.token, config.secret)
  console.log(decoded)
  var q = `UPDATE tbl_organizations_users
  SET confirmation_token = '',
      status = 'confirmed'
  WHERE confirmation_token = '${decoded.email}';`

  // connection.query(q, function (error, results) {
  // if (error) throw error;
  
  // res.send(results);
  // });
 });




