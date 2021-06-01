var con = require('../conexionBD/conexionbd')

function obtenerOpcionesPeliculas(req, res) {
  var id = req.params.id;
  var sql = "select a.id, a.titulo, a.poster " +
              "from pelicula a " +
             "where a.genero_id in (ifnull((select c.genero_id from competencia c where c.id = "+ id +"),a.genero_id))" +
               "and a.id in (select ifnull(e.pelicula_id, a.id) " +
                             "from competencia d " +
                              "left join director_pelicula e on d.director_id = e.director_id " +
                             "where d.id = "+ id +") " +
               "and a.id in (select ifnull(g.pelicula_id, a.id) " +
                              "from competencia f " +
                              "left join actor_pelicula g on f.actor_id = g.actor_id " +
                             "where f.id = "+ id +") " +
             "order by rand() " +
             "limit 2;" +
            "select id, nombre " +
              "from competencia " +
             "where id = " + id + "; ";
  con.query(sql, [2, 1], function(error, resultado, fields) {
    if(error){
      return res.status(500).send("Error al obtener opciones para la competencia.");
    }
    if(resultado[0].length === 0) {
      return res.status(404).send("No existen películas cargadas.");
    }
    if(resultado[1].length === 0) {
      return res.status(404).send("No existen datos para la competencia seleccionada.");
    }
    var response = {
      'peliculas' : resultado[0],
      'competencia' : resultado[1]
    }
    res.send(JSON.stringify(response));
  });
}

function obtenerResultados(req, res) {
  var idCompetencia = req.params.id;
  var sql = "select a.id pelicula_id, a.poster, a.titulo, count(1) votos " +
              "from pelicula a " +
            " inner join voto b " +
               " on (a.id = b.pelicula_id)" +
            " where b.competencia_id = " + idCompetencia +
            " group by a.id, a.poster, a.titulo " +
            " order by count(1) desc;" +
            " select nombre " +
              " from competencia " +
             " where id = " + idCompetencia;
  con.query(sql, [2, 1], function(error, resultado, fields) {
    if(error){
      return res.status(500).send("Error al obtener los resultados.");
    }
    if(resultado[0].length === 0) {
      return res.status(404).send("No existen votos cargados para la competencia seleccionada.");
    }
    if(resultado[1].length === 0) {
      return res.status(404).send("No existen datos para la competencia seleccionada.");
    }
    var response = {
      'resultados' : resultado[0],
      'competencia' : resultado[1]
    }
    res.send(JSON.stringify(response));
  });
}

function contarVoto(req, res) {
  var idCompetencia = req.params.id;
  var idPelicula = req.body.idPelicula;
  var sqlExisteCompetencia = "select 1 from competencia where id = " + idCompetencia;
  var sqlExistePelicula = "select 1 from pelicula where id = " + idPelicula;
  var sqlInsert = "insert into voto (competencia_id,pelicula_id) " +
                  "values ("+ idCompetencia + "," + idPelicula + ")";
  con.query(sqlExisteCompetencia, function(errorExisteComp, resultadoExisteComp, fieldsExisteComp){
    if(errorExisteComp) {
      return res.status(500).send("Error al verificar si existe la competencia. ");
    }
    if(resultadoExisteComp.length === 0) {
      return res.status(404).send("No existe la comptencia seleccionada. ");
    }
    con.query(sqlExistePelicula, function(errorExistePeli, resultadoExistePeli, fieldsExistePeli){
      if(errorExistePeli) {
        return res.status(500).send("Error al verificar si existe la pelicula. ");
      }
      if(resultadoExistePeli.length === 0) {
        return res.status(404).send("No existe la pelicula seleccionada. ");
      }
      con.query(sqlInsert, function(errorInsert, resultadoInsert, fieldsInsert){
        if(errorInsert) {
          return res.status(500).send("Error al insertar el voto.")
        }
        res.json(resultadoInsert.insertId);
      });
    });
  });
}

function reiniciarCompetencia(req, res) {
  var idCompetencia = req.params.id;
  var sqlExiste = "select 1 from competencia where id = " + idCompetencia;
  var sqlDelete = "delete from voto where competencia_id = " + idCompetencia;
  con.query(sqlExiste, function (errorExiste, resultadoExiste, fieldsExiste) {
    if(errorExiste) {
      return res.status(500).send("Error al verificar si la competencia ya existe.");
    }
    if(resultadoExiste.length === 0) {
      return res.status(422).send("La competencia que desea reiniciar no existe");
    }
    con.query(sqlDelete, function(errorDelete, resultadoDelete, fieldsDelete) {
      if(errorDelete) {
        return res.status(500).send("Error al reiniciar la competencia.");
      }
      res.json(resultadoDelete.affectedRows);
    });
  });
}

module.exports = {
  reiniciarCompetencia : reiniciarCompetencia,
  obtenerOpcionesPeliculas : obtenerOpcionesPeliculas,
  contarVoto : contarVoto,
  obtenerResultados : obtenerResultados
}
