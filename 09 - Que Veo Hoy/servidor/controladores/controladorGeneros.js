var con = require('../lib/conexionbd')

function getGeneros(req, res) {
  var sql = 'select id, nombre from genero';
  con.query(sql, function(error, resultado, fields) {
    if(error){
      console.log('Error al obtener las géneros.');
      return res.status(404).send("Hubo un error al obtener los géneros.");
    }
    var response = {
      'generos': resultado
    }
    res.send(JSON.stringify(response));
  });
}

module.exports = {
  getGeneros : getGeneros
}
