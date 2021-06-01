var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : 'matias_85',
  database : 'queveohoy',
  multipleStatements: true
});

connection.connect(function(err) {
  if (err) {
    console.error('error conectando a la Base de Datos: ' + err.stack);
    return;
  }});

module.exports = connection;
