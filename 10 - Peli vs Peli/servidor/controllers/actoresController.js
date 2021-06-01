var con = require('../conexionBD/conexionbd')

function obtenerActores(req, res) {
  var sql = "select id, nombre from actor";
  con.query(sql, function(error, resultado, fields) {
    if(error){
      return res.status(500).send("Error al obtener los actores.");
    }
    if(resultado.length === 0) {
      return res.status(404).send("No existen actores cargados.");
    }
    res.send(JSON.stringify(resultado));
  });
}

module.exports = {
  obtenerActores : obtenerActores
}
