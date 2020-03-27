const mysql = require('mysql');

var connection = mysql.createPool({
  connectionLimit : 100,
  host     : 'Vm1.manam.co.il',
  user     : 'manam_3dbia',     // your root username
  password: 'Manam12!@',
  database : 'db_3dbia',
  multipleStatements: true
});

module.exports =  connection

;

