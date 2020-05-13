var express = require('express');
var app = module.exports = express();
const connection = require('../db.js');

//PROVIDERS ROUTES
app.get("/providers", function(req, res){
  console.log('getting providers')
  var q = 'SELECT * FROM tbl_providers';
  connection.query(q, function (error, results) {
  if (error) throw error;

  res.send(results);
  });
 });

app.post("/providers", function(req, res){
  console.log('creating provider', req.body);
  const provider = req.body
  var q = `INSERT INTO tbl_providers ( name, date_created, remarks, created_by, contact_name, phone, address, region, general_status, website, about_team )
  VALUES
  ( '${provider.name}', now(), '${provider.remarks}', '${provider.created_by}', '${provider.contact_name}', '${provider.phone}',  '${provider.address}',
  '${provider.region}', '${provider.general_status ? provider.general_status : 'Awaiting confirmation'}', '${provider.website}', '${provider.about_team}');`
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
 });
app.post("/provider-bridges", function(req, res){
  console.log('getting provider bridges', req.body);
  const ids = req.body
  var q = `SELECT * FROM tbl_bridge_list where bid in (${ids})`
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
 });

app.get("/providers/:id", function(req, res){
  console.log('getting provider ' + req.params.id)
  var q = 'SELECT * FROM tbl_providers WHERE id = ' + req.params.id;
  connection.query(q, function (error, results) {
  if (error) throw error;

  res.send(results);
  });
 });
 app.get("/providers/email/:email", function(req, res){
  console.log('getting providers by mail', req.params.email)
  // var q = `SELECT * FROM db_3dbia.tbl_users u
  // INNER JOIN tbl_users_roletypes ur
  //   ON ur.userId = u.id where user_name = '${req.params.email}' and password = '${req.params.password}'`
  var q = `SELECT * FROM db_3dbia.tbl_providers where email = '${req.params.email}'`

  connection.query(q, function (error, results) {
  if (error) throw error;
  
  res.send(results);
  });
 });
 app.get("/providers/name/:name", function(req, res){
  console.log('getting providers by mail', req.params.name)
  // var q = `SELECT * FROM db_3dbia.tbl_users u
  // INNER JOIN tbl_users_roletypes ur
  //   ON ur.userId = u.id where user_name = '${req.params.name}' and password = '${req.params.password}'`
  var q = `SELECT * FROM db_3dbia.tbl_providers where name = '${req.params.name}'`

  connection.query(q, function (error, results) {
  if (error) throw error;
  
  res.send(results);
  });
 });
app.put("/providers/:id", function(req, res){
  const provider = req.body
  console.log('updating provider');
  var q = `UPDATE tbl_providers
  SET name = '${provider.name}',
      remarks = '${provider.remarks}',
      contact_name = '${provider.metric_system}',
      region = '${provider.region}',
      website = '${provider.website}',
      email = '${provider.email}',
      address = '${provider.address}',
      phone = '${provider.phone}',
      general_status = '${provider.general_status}'
  WHERE id = ${req.params.id};`

  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
app.get("/providers/:id/organizations", function(req, res){
  console.log('GETTING organizations by provider: '+ req.params.id);
  var q = `SELECT * FROM tbl_organizations o
  INNER JOIN tbl_organization_providers op
  ON op.organization_id = o.id
  AND op.provider_id = ${req.params.id}`;
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
app.get("/providers/:id/roles", function(req, res){
  console.log('getting roles by provider: '+ req.params.id);
  var q = `SELECT * FROM tbl_roles where provider_id = ${req.params.id};`;
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
app.get("/providers/:id/users", function(req, res){
  console.log('getting users by provider: '+ req.params.id);
  var q = `SELECT u.id, first_name , last_name, user_image, phone, email, address, u.remarks, pu.status, ur.roletypeId, rt.name
  FROM tbl_users u
  LEFT JOIN tbl_users_roletypes ur
  ON ur.userId = u.id
  LEFT JOIN tbl_roles_types rt
  ON rt.id = ur.roletypeId
  INNER JOIN tbl_provider_users pu
  ON pu.user_id = u.id
  AND pu.provider_id = ${req.params.id}`;
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});

app.get("/providers/:name/tasks", function(req, res){
  console.log('getting tasks by provider: '+ req.params.name);
  var q = `SELECT * FROM tbl_tasks where provider_name = '${req.params.name}'`;
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
app.get("/providers/:name/project-processes", function(req, res){
  console.log('getting projects processes by provider: '+ req.params.name);
  var q = `SELECT * FROM tbl_processes where provider_name = '${req.params.name}'`;
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
app.get("/providers/:name/processes", function(req, res){
  // console.log(req.params)
  console.log('getting processes by provider: '+ req.params.name);
  // var q = 'SELECT * FROM tbl_projects where organization_id = '+req.params.id;
  var q = `SELECT DISTINCT name, description, organization FROM tbl_process_template
            where provider='${req.params.name}'`;
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
app.get("/providers/:name/processes-tasks", function(req, res){
  // console.log(req.params)
  console.log('getting processes and tasks by organization: '+ req.params.name);
  // var q = 'SELECT * FROM tbl_projects where organization_id = '+req.params.id;
  var q = `SELECT name, description, task_name, task_description, role_type_name, task_def_status
            FROM tbl_process_template where provider='${req.params.name}'`;
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });

});

// app.get("/providers/:id/bridges", function(req, res){
//   console.log('getting bridges by provider: '+ req.params.id);
//   var q = 'SELECT * FROM tbl_bridge_list where organization_id = '+req.params.id;
//   connection.query(q, function (error, results) {
//   if (error) res.send(error);

//   res.send(results);
//   });
// });
// app.get("/providers/:id/organizations", function(req, res){
//   console.log('getting providers by orgnization: '+ req.params.id);
//   var q = `SELECT name , contact_name, phone, email, address
//   FROM tbl_providers p
//   INNER JOIN tbl_organization_providers op
//   ON op.provider_id = p.id
//   AND op.organization_id = ${req.params.id}`;
//   connection.query(q, function (error, results) {
//   if (error) res.send(error);

//   res.send(results);
//   });
// });

// app.get("/organizations/:id/projects", function(req, res){
//   console.log('getting projects by orgnization: '+ req.params.id);
//   var q = 'SELECT * FROM tbl_projects where organization_id = '+req.params.id;
//   connection.query(q, function (error, results) {
//   if (error) res.send(error);

//   res.send(results);
//   });
// });



//other routes..

