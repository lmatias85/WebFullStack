var con = require('../conexionBD/conexionbd')

function obtenerDirectores(req, res) {
  var sql = "select id, nombre from director";
  con.query(sql, function(error, resultado, fields) {
    if(error){
      return res.status(500).send("Error al obtener los directores.");
    }
    if(resultado.length === 0) {
      return res.status(404).send("No existen directores cargados.");
    }
    res.send(JSON.stringify(resultado));
  });
}

module.exports = {
  obtenerDirectores : obtenerDirectores
}
