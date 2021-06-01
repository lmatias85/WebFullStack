var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  port     : '3306',
  user     : 'root',
  password : 'matias_85',
  database : 'competencias',
  multipleStatements: true
});

connection.connect(function(err) {
  if (err) {
    console.error('error conectando a la Base de Datos: ' + err.stack);
    return;
  }});

module.exports = connection;
