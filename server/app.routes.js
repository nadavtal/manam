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






var projects =  [
  {

    name: 'First project',
    generalLength: 300,
    maxSpanLength: 30,
    spans: 10,
    maxWidth: 200,
    foundation: 'foundation name here',
    skethFileUrl:  'https://www.arttutor.com/sites/default/files/brooklyn-bridge-final_0.JPG',
    lat: 31.79911453088927,
    lon: 34.85442778807419,
    localX: 31.79911453088927,
    localY: 34.85442778807419,
    imageUrl: 'https://i.pinimg.com/originals/22/74/49/2274490863593b5605942e16ed9c0301.jpg' ,
    status: 'Great',
    // uavOperators_id: 1,
  },
  {

    name: 'Second project',
    generalLength: 300,
    maxSpanLength: 30,
    spans: 10,
    maxWidth: 200,
    foundation: 'foundation name here',
    skethFileUrl:  'https://www.arttutor.com/sites/default/files/brooklyn-bridge-final_0.JPG',
    lat: 31.79911453088927,
    lon: 34.85442778807419,
    localX: 31.79911453088927,
    localY: 34.85442778807419,
    imageUrl: 'https://i.pinimg.com/originals/22/74/49/2274490863593b5605942e16ed9c0301.jpg' ,
    status: 'Bad',
    // uavOperators_id: 6,
  },

]

var users = [
  {id: '1', user_name: 'Nadav', first_name: 'Nadav', last_name: 'Almagor', email: 'nadav@gmail.com', password: 'asd', role: 'Admin', phone: '052-8882240', remarks: 'First  user of its kind'},
  {id: '2', user_name: 'Gilad', first_name: 'Gilad', last_name: 'Shloosh', email: 'gilad@gmail.com', password: 'asd', role: 'UAV operator', phone: '052-8882240', remarks: 'First  user of its kind'},
  {id: '3', user_name: 'Amiel', first_name: 'Amiel', last_name: 'Robin', email: 'amiel@gmail.com', password: 'asd', role: 'CAD technician', phone: '052-8882240', remarks: 'First  user of its kind'},
  {id: '4', user_name: 'Rafe', first_name: 'Rafe', last_name: 'Almagor', email: 'rafe@gmail.com', password: 'asd', role: 'Bridge enginner QC', phone: '052-8882240', remarks: 'First  user of its kind'},
  {id: '5', user_name: 'Shai', first_name: 'Shai', last_name: 'Almagor', email: 'shai@gmail.com', password: 'asd', role: 'Bridge analyzer', phone: '052-8882240', remarks: 'First  user of its kind'},
  {id: '6', user_name: 'Eitan', first_name: 'Eitan', last_name: 'Almagor', email: 'eitan@gmail.com',password: 'asd', role: 'DOT user', phone: '052-8882240', remarks: 'First  user of its kind'},
  {id: '7', user_name: 'Gadi', first_name: 'Gadi', last_name: 'Grosz', email: 'gadi@gmail.com',password: 'asd', role: 'UAV operator', phone: '052-8882240', remarks: 'First  user of its kind'},
  {id: '8', user_name: 'Tal', first_name: 'Tal', last_name: 'Grosz', email: 'tal@gmail.com',password: 'asd', role: 'UAV operator', phone: '052-8882240', remarks: 'First  user of its kind'},
  {id: '9', user_name: 'Nisan', first_name: 'Nisan', last_name: 'Grosz', email: 'nisan@gmail.com',password: 'asd', role: 'UAV operator', phone: '052-8882240', remarks: 'First  user of its kind'},
]

function createProjectUsersArray(projectId, usersIdArray) {
  let data = []
  for (let userId of usersIdArray) {
    data.push([projectId, userId])
  }

  return data
}
function createtemplateTasksArray(tasks) {
  let data = []
  for (let task of tasks) {
    data.push([task.name, task.description, task.task_name, task.task_order, task.task_description, task.role_type_name, task.task_def_status, task.organization])
  }

  return data
}

function createUsersArray(users) {
var usersArray = [];
for (let user of users) {
usersArray.push([user.user_name, user.password, user.phone, user.remarks, user.first_name, user.last_name, user.email])
  }
return usersArray
}

function createProjectsArray(projects) {

var projectsArray = [];
for (let project of projects) {
  // console.log(getValuesFromObject(project))
  projectsArray.push([project.projectName, parseFloat(project.generalLength), parseFloat(project.maxSpanLength), parseInt(project.spans),
    parseFloat(project.maxWidth), project.foundation, project.skethFileUrl, parseFloat(project.lat), parseFloat(project.lon),
    parseFloat(project.localX), parseFloat(project.localY), project.imageUrl, project.status])
}
return projectsArray
}

function getValuesFromObject(object) {
  let values = []
  for (let key of Object.keys(object) ) {
    console.log(typeof(object[key]))
    values.push(object[key])
  }
  return values
}

function registerUser(user) {

  // connection.query('INSERT INTO users SET ?', user, function(err, result) {
  // if (err) throw err;
  // console.log(result);
  // });
};

function addUsers(users) {
var q = 'INSERT INTO tbl_users (user_name, password, phone, remarks, first_name, last_name, email) VALUES ?';
var data = createUsersArray(users);
console.log(data);
connection.query(q, [data], function(err, result) {
console.log(err);
console.log(result);
});
}
// addUsers(users)
function addProjects(projects) {
var q = 'INSERT INTO projects (projectName, generalLength, maxSpanLength, spans, maxWidth, foundation, sketchFileUrl, lat, lon, localX, localY, imageUrl, projectStatus) VALUES ?';
var data = createProjectsArray(projects);
console.log(data);
connection.query(q, [data], function(err, result) {
console.log(err);
console.log(result);
});
}
// addProjects(projects)

function getUsers() {
  q = 'SELECT * FROM users';
  connection.query(q, function(err, result) {
    if (err) throw err;
    console.log(result);


});
}
