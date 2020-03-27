
var express = require('express');
var app = module.exports = express();
const connection = require('../db.js');


//PROCESS TEMAPLATE TASKS ROUTES

//Get all template tasks
app.get("/process-template-tasks/", function(req, res){
  console.log('getting process-template-tasks', req.params);

  var q = `select * from tbl_process_template`;
  connection.query(q, function (error, results) {
  if (error) res.send(error);

  res.send(results);
  });
});

//Get all template tasks by organization name & process name
// app.get("/process-template-tasks/", function(req, res){
//   console.log('getting process-template-tasks', req.params);

//   var q = `select * from tbl_process_template`;
//   connection.query(q, function (error, results) {
//   if (error) res.send(error);

//   res.send(results);
//   });
// });


function updateProcessTask(task, taskId, res) {
  var q = `UPDATE tbl_process_template
  SET name = '${task.name}',
      description = '${task.description}',
      task_name = '${task.task_name}',
      task_description = '${task.task_description}',
      task_order = ${task.task_order},
      role_type_name = '${task.role_type_name}',
      task_def_status = '${task.task_def_status}',
      organization = '${task.organization}'
  WHERE id = ${taskId};`

  console.log(q)
  connection.query(q, function(err, result) {
    if (err) throw(err);

    res.send(result);
  });
}
//Upadte task
app.put("/process-template-tasks/:id", function(req, res){
  console.log('updating new process-template-task', req.body, req.params.id);
  const task = req.body;
  updateProcessTask(task, req.params.id, res)


});
// Delete task
app.delete("/process-template-tasks/:id", function(req, res){
  console.log('deleting process-template-task', req.params.id);
  var q = `DELETE FROM tbl_process_template WHERE id=${req.params.id}`
  connection.query(q, function(err, result) {
    if (err) res.send(err);

    res.send({result, deletedTaskId: req.params.id});
  });

});
//creating new process-template-task
app.post("/tasks", function(req, res){
  console.log('creating new task', req.body);
  const tasks = req.body;

  var q = `INSERT INTO tbl_tasks (name, survey_type, description, project_id, user_id, role_type_name, bid,
    process_id, organization_id, provider_name, due_date, status, last_update, date_created, created_by, remarks,
    pre_task_id, next_task_id, completed_percentage) VALUES ?`;
// var data = createProjectUsersArray(project.id, projectUsers);
// console.log(processes)
// console.log(convertObjArrayToArray(processes))
const values = convertObjArrayToArray(tasks)
connection.query(q, [values], function(err, result) {
if (err) res.send(err);

res.send(result);
});

});

//Upadte tasks
app.put("/tasks/:id", function(req, res){
  console.log('updating task', req.body);
  const task = req.body;
  updateTask(task, req.params.id, res)
  // var q = `INSERT INTO tbl_process_template (name, description, task_order, task_name, task_description, role_type_name, task_def_status, organization)
  // VALUES ('${task.name}', '${task.description}', ${task.task_order}, '${task.task_name}', '${task.task_description}', '${task.role_type_name}',
  //  '${task.task_def_status}', null)`;
  // console.log(q)
  // connection.query(q, function(err, result) {
  //   if (err) res.send(err);

  //   res.send(result);
  // });

});

function convertObjArrayToArray(array) {
  let finalArr = [];
  array.map(obj => finalArr.push(Object.values(obj)))
  return finalArr
}

function updateTask(task, taskId, res) {
  var q = `UPDATE tbl_tasks
  SET name = '${task.name}',
      survey_type = '${task.survey_type}',
      description = '${task.description}',
      project_id = ${task.project_id},
      user_id = ${task.user_id},
      role_type_name = '${task.role_type_name}',
      bid = ${task.bid},
      organization_id = ${task.organization_id},
      provider_name = '${task.provider_name}',
      due_date = '${task.due_date}',
      status = '${task.status}',
      last_update = now(),
      remarks = '${task.remarks}',
      pre_task_id = ${task.pre_task_id},
      next_task_id = ${task.next_task_id},
      completed_percentage = ${task.completed_percentage}
  WHERE id = ${taskId};`

  console.log(q)
  connection.query(q, function(err, result) {
    if (err) res.send(err);

    res.send(task);
  });
}
