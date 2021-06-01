var con = require('../conexionBD/conexionbd')

function crearCompetencia(req, res) {
  var nombreCompetencia = req.body.nombre;
  var idGenero = req.body.genero;
  var idDirector = req.body.director;
  var idActor = req.body.actor;

  var sqlExiste = "select 1 from competencia where upper(nombre) = upper('" + nombreCompetencia + "')";
  var sql2Pelis =  "select a.id " +
                     "from pelicula a " +
                    "where a.genero_id in (if(" + idGenero + ">0," + idGenero + ",a.genero_id))" +
                      "and a.id in (select d.pelicula_id " +
                                    " from director_pelicula d " +
                                   " where d.director_id = if(" + idDirector + ">0," + idDirector + ",d.director_id))" +
                      "and a.id in (select e.pelicula_id " +
                                    " from actor_pelicula e " +
                                   " where e.actor_id = if(" + idActor + ">0," + idActor + ",e.actor_id))";
  var sqlInsert = "insert into competencia (nombre, genero_id, director_id, actor_id) " +
                  "values ('" + nombreCompetencia + "', " +
                  "if (" + idGenero + ">0," + idGenero + ",null), " +
                  "if (" + idDirector + ">0," + idDirector + ",null)," +
                  "if (" + idActor + ">0," + idActor + ",null))";
  con.query(sqlExiste, function (errorExiste, resultadoExiste, fieldsExiste) {
    if(errorExiste) {
      return res.status(500).send("Error al verificar si la competencia ya existe.");
    }
    if(resultadoExiste.length > 0) {
      return res.status(422).send("Ya existe una competencia con el nombre " + nombreCompetencia);
    }
    con.query(sql2Pelis, function (error2Pelis, resultado2Pelis, fiels2Plis){
      if(error2Pelis){
        return res.status(500).send("Error al validar la factibilidad de la competencia.");
      }
      if(resultado2Pelis.length < 2){
        return res.status(422).send("No existen dos o más películas para los criterios seleccionados ");
      }
      con.query(sqlInsert, function(errorInsert, resultadoInsert, fieldsExiste) {
        if(errorInsert) {
          return res.status(500).send("Error al insertar la competencia.");
        }
        res.json(resultadoInsert.insertId);
      });
    });
  });
}

function buscarCompetencias(req, res) {
  var sql = "select id, nombre from competencia";
  con.query(sql, function(error, resultado, fields) {
    if(error){
      return res.status(500).send("Error al buscar las competencias.");
    }
    if(resultado.length === 0) {
      return res.status(404).send("No existen competencias cargadas.");
    }
    res.send(JSON.stringify(resultado));
  });
}

function obtenerCompetencia(req, res) {
  var idCompetencia = req.params.id;
  var sql = "select a.id, a.nombre, b.nombre genero_nombre, c.nombre director_nombre, d.nombre actor_nombre " +
             " from competencia a " +
             " left join genero b on (a.genero_id = b.id) " +
             " left join director c on (a.director_id = c.id) " +
             " left join actor d on (a.actor_id = d.id) " +
            " where a.id = " + idCompetencia;
  con.query(sql, function(error, resultado, fields) {
    if(error){
      return res.status(500).send("Error al buscar la competencia.");
    }
    if(resultado.length === 0) {
      return res.status(404).send("No existe la competencia seleccionada.");
    }
    res.send(JSON.stringify(resultado[0]));
  });
}

function modificarCompetencia(req, res) {
  var idCompetencia = req.params.id;
  var nombreCompetencia = req.body.nombre;
  var sqlExiste = "select 1 from competencia where id = " + idCompetencia;
  var sqlUpdate = "update competencia set nombre = '" +nombreCompetencia + "' where id = " + idCompetencia;
  con.query(sqlExiste, function (errorExiste, resultadoExiste, fieldsExiste) {
    if(errorExiste) {
      return res.status(500).send("Error al verificar si la competencia ya existe.");
    }
    if(resultadoExiste.length === 0) {
      return res.status(422).send("La competencia que desea modificar no existe");
    }
    con.query(sqlUpdate, function(errorUpdate, resultadoUpdate, fieldsUpdate) {
      if(errorUpdate) {
        return res.status(500).send("Error al modificar la competencia.");
      }
      res.json(resultadoUpdate);
    });
  });
}

function eliminarCompetencia(req, res) {
  var idCompetencia = req.params.id;
  var sqlExiste = "select 1 from competencia where id = " + idCompetencia;
  var sqlDelete = "delete from competencia where id = " + idCompetencia;
  con.query(sqlExiste, function (errorExiste, resultadoExiste, fieldsExiste) {
    if(errorExiste) {
      return res.status(500).send("Error al verificar si la competencia ya existe.");
    }
    if(resultadoExiste.length === 0) {
      return res.status(422).send("La competencia que desea eliminar no existe");
    }
    con.query(sqlDelete, function(errorDelete, resultadoDelete, fieldsDelete) {
      if(errorDelete) {
        return res.status(500).send("Error al eliminar la competencia.");
      }
      res.json(resultadoDelete.affectedRows);
    });
  });
}

module.exports = {
  crearCompetencia : crearCompetencia,
  buscarCompetencias : buscarCompetencias,
  obtenerCompetencia : obtenerCompetencia,
  modificarCompetencia : modificarCompetencia,
  eliminarCompetencia : eliminarCompetencia
}
