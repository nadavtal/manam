
var express = require('express');
var app = module.exports = express();
const connection = require('../db.js');
const config = require('../config.js')
const jwt = require('jsonwebtoken');
const generator = require('generate-password');
 

app.get("/organizations", function(req, res){
  console.log('getting organizations');
  var q = 'SELECT * FROM tbl_organizations';
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
app.post("/organizations", function(req, res){
  console.log('creating organization', req.body);
  const organization = req.body
  var q = `INSERT INTO tbl_organizations ( name, date_created, remarks, created_by, metric_system, engineering_schema, 
  website, contact_name, phone, address, general_status )
  VALUES
  ( '${organization.name}', now(), '${organization.remarks}', '${organization.created_by}', '${organization.metric_system}', '${organization.engineering_schema}',
  '${organization.website}', '${organization.contact_name}' , '${organization.phone}', '${organization.address}', 
  '${organization.general_status ? organization.general_status : 'Awaiting confirmation'}');`
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
app.get("/organizations/:id", function(req, res){
  console.log('getting organization');
  var q = 'SELECT * FROM tbl_organizations where id = '+req.params.id;
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
app.put("/organizations/:id", function(req, res){
  const org = req.body
  console.log('updating organization');
  var q = `UPDATE tbl_organizations
  SET name = '${org.name}',
      remarks = '${org.remarks}',
      metric_system = '${org.metric_system}',
      engineering_schema = '${org.engineering_schema}',
      website = '${org.website}',
      email = '${org.email}',
      contact_name = '${org.contact_name}',
      phone = '${org.phone}',
      address = '${org.address}',
      general_status = '${org.general_status}',
      profile_image = '${org.profile_image}'
  WHERE id = ${req.params.id};`

  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});

function updateOrganization(organization, res) {
  var q = `UPDATE tbl_bridge_list
  SET name = '${bridge.name}',
      bridge_type = '${bridge.bridge_type}',
      bridge_type_code = '${bridge.bridge_type_code}',
      structure_name = '${bridge.structure_name}',
      road = '${bridge.road}',
      road_station = ${bridge.road_station},
      inspection_classification = '${bridge.inspection_classification}',
      description = '${bridge.description}',
      year_built = ${bridge.year_built},
      region = '${bridge.region}',
      general_length = ${bridge.general_length},
      max_span_length = ${bridge.max_span_length},
      spans = ${bridge.spans},
      max_width = ${bridge.max_width},
      foundations = '${bridge.foundations}',
      lat = ${bridge.lat},
      lon = ${bridge.lon},
      x = ${bridge.x},
      y = ${bridge.y},
      status = '${bridge.status}',
      image_url = '${bridge.image_url}',
      cad_model_id = ${bridge.cad_model_id ? bridge.cad_model_id : null}
  WHERE bid = ${bridgeId};`

  console.log(q)
  connection.query(q, function(err, result) {
    if (err) throw(err);

    res.send(result);
  });
}

app.get("/organizations/:id/bridges", function(req, res){
  console.log('getting bridges by orgnization: '+ req.params.id);
  var q = 'SELECT * FROM tbl_bridge_list where organization_id = '+req.params.id;
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
app.get("/organizations/:id/providers", function(req, res){
  console.log('getting providers by orgnization: '+ req.params.id);
  var q = `SELECT * FROM tbl_providers p
  INNER JOIN tbl_organization_providers op
  ON op.provider_id = p.id
  AND op.organization_id = ${req.params.id}`;
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});

app.get("/organizations/:id/projects", function(req, res){
  console.log('getting projects by orgnization: '+ req.params.id);
  var q = 'SELECT * FROM tbl_projects where organization_id = '+req.params.id;
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
app.get("/organizations/:id/tasks", function(req, res){
  console.log('getting tasks by orgnization: '+ req.params.id);
  var q = 'SELECT * FROM tbl_tasks where organization_id = '+req.params.id;
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
app.get("/organizations/:id/roles", function(req, res){
  console.log('getting roles by orgnization: '+ req.params.id);
  var q = `SELECT * FROM tbl_roles where organization_id = ${req.params.id}`;
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
app.get("/organizations/:id/elements-groups", function(req, res){
  console.log('getting elements groups by orgnization: '+ req.params.id);
  var q = 'SELECT * FROM tbl_elements_groups where organization_id = '+ req.params.id;
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
app.get("/organizations/:id/elements-types", function(req, res){
  console.log('getting elements types by orgnization: '+ req.params.id);
  var q = 'SELECT * FROM tbl_elements_types where organization_id = '+ req.params.id;
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
app.get("/organizations/:id/bridge-types", function(req, res){
  console.log('getting bridge types by orgnization: '+ req.params.id);
  var q = 'SELECT * FROM tbl_bridge_type where organization_id = '+ req.params.id;
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
app.get("/organizations/:id/structure-types", function(req, res){
  console.log('getting structure-types groups by orgnization: '+ req.params.id);
  var q = 'SELECT * FROM tbl_structure_type where organization_id = '+ req.params.id;
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
app.get("/organizations/:id/project-processes", function(req, res){
  console.log('getting projects processes by orgnization: '+ req.params.id);
  var q = 'SELECT * FROM tbl_processes where organization_id = '+req.params.id;
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
app.get("/organizations/:id/processes/:name", function(req, res){
  // console.log(req.params)
  console.log('getting processes by organization: '+ req.params.name);
  // var q = 'SELECT * FROM tbl_projects where organization_id = '+req.params.id;
  var q = `SELECT DISTINCT name, description, organization FROM tbl_process_template where organization='${req.params.name}'`;
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
app.get("/organizations/:id/processes-tasks/:name", function(req, res){
  // console.log(req.params)
  console.log('getting processes and tasks by organization: '+ req.params.name);
  // var q = 'SELECT * FROM tbl_projects where organization_id = '+req.params.id;
  var q = `SELECT name, description, task_name, task_description, role_type_name, task_def_status FROM tbl_process_template where organization='${req.params.name}'`;
  console.log(q)
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});
app.get("/organizations/email/:email", function(req, res){
  console.log('getting organizations by mail', req.params.email)
  // var q = `SELECT * FROM db_3dbia.tbl_users u
  // INNER JOIN tbl_users_roletypes ur
  //   ON ur.userId = u.id where user_name = '${req.params.email}' and password = '${req.params.password}'`
  var q = `SELECT * FROM db_3dbia.tbl_organizations where email = '${req.params.email}'`

  connection.query(q, function (error, results) {
  if (error) throw error;
  
  res.send(results);
  });
 });
app.get("/organizations/name/:name", function(req, res){
  console.log('getting organizations by name', req.params.name)
  // var q = `SELECT * FROM db_3dbia.tbl_users u
  // INNER JOIN tbl_users_roletypes ur
  //   ON ur.userId = u.id where user_name = '${req.params.email}' and password = '${req.params.password}'`
  var q = `SELECT * FROM db_3dbia.tbl_organizations where name = '${req.params.name}'`

  connection.query(q, function (error, results) {
  if (error) throw error;
  
  res.send(results);
  });
 });


//other routes..

