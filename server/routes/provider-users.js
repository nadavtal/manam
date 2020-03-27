
var express = require('express');
var app = module.exports = express();
const connection = require('../db.js');



//PROVIDER-USERS ROUTES
app.post("/provider-users", function(req, res){
  console.log('creating new provider user', req.body);
  const providerUser = req.body;

  var q = `INSERT INTO tbl_provider_users (user_id, provider_id, remarks, date_created, status) VALUES (
    ${providerUser.user_id}, ${providerUser.provider_id}, '${providerUser.remarks}', now(), '${providerUser.status}')`;
  console.log(q)
  connection.query(q, function(err, result) {
    if (err) res.send(err);

    res.send(result);
  });

});




