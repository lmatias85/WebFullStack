var con = require('../conexionBD/conexionbd')

function obtenerGeneros(req, res) {
  var sql = "select id, nombre from genero";
  con.query(sql, function(error, resultado, fields) {
    if(error){
      return res.status(500).send("Error al obtener los generos.");
    }
    if(resultado.length === 0) {
      return res.status(404).send("No existen generos cargados.");
    }
    res.send(JSON.stringify(resultado));
  });
}

module.exports = {
  obtenerGeneros : obtenerGeneros
}
