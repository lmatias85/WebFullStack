var con = require('../lib/conexionbd')

function buscarPeliculas(req, res) {

  var posicionInicialPagina;
  var pagina = req.query.pagina;
  var titulo = req.query.titulo;
  var genero = req.query.genero;
  var anio = req.query.anio;
  var cantidad = req.query.cantidad;
  var columna_orden = req.query.columna_orden;
  var tipo_orden = req.query.tipo_orden;

  if (pagina === undefined)
    pagina = 1;
  if (titulo === undefined)
    titulo = '';
  if (genero === undefined)
    genero = null;
  if (anio === undefined)
    anio = null;
  if (cantidad === undefined)
    cantidad = 54;
  if (columna_orden === undefined)
    columna_orden = 1;
  if (tipo_orden === undefined)
    tipo_orden = 'asc';

  posicionInicialPagina = (pagina-1) * cantidad;

  var sql = "select * from pelicula " +
            " where titulo like '%" + titulo + "%'" +
              " and anio = coalesce(" + anio + ",anio)" +
              " and genero_id = coalesce(" + genero + ",genero_id)" +
            " order by " + columna_orden + " " + tipo_orden +
            " limit " + posicionInicialPagina + "," + cantidad + ";" +
            "select count(1) total from pelicula " +
            " where titulo like '%" + titulo + "%'" +
              " and anio = coalesce(" + anio + ",anio)" +
              " and genero_id = coalesce(" + genero + ",genero_id);";
  con.query(sql, [2, 1], function(error, resultado, fields) {
    if(error){
      return res.status(404).send("Hubo un error al buscar las películas." + error.code);
    }
    var response = {
      'peliculas': resultado[0],
      'total': resultado[1]
    }
    res.send(JSON.stringify(response));
  });
}

function verInformacionPelicula(req, res) {
  var id = req.params.id;
  var sql = "select a.id, a.titulo, a.duracion, a.director, a.anio, a.fecha_lanzamiento, a.puntuacion, " +
                  " a.poster, a.trama, b.nombre " +
              "from pelicula a, genero b " +
             "where a.genero_id = b.id " +
               "and a.id = " + id + ";" +
            "select b.* " +
              "from actor_pelicula a, actor b " +
             "where a.actor_id = b.id " +
               "and a.pelicula_id = " + id + ";";
  con.query(sql,function(error, resultado, fields){
    if(error){
      return res.status(404).send("Hubo un error al obtener información de la película. " + error.code);
    }
    if(resultado.length === 0) {
      return res.status(404).send("No se enecontró información para la película solicitada.");
    } else {
      var response = {
        'pelicula': resultado[0],
        'actores': resultado[1]
      }
      res.send(JSON.stringify(response));
    }
  });
}

function recomendarPeliculas(req, res) {

  var genero = req.query.genero;
  var anio_inicio = req.query.anio_inicio;
  var anio_fin = req.query.anio_fin;
  var puntuacion = req.query.puntuacion;

  if (genero === undefined)
    genero = '%';
  if (anio_inicio === undefined)
    anio_inicio = 1;
  if (anio_fin === undefined)
    anio_fin = 3000;
  if (puntuacion === undefined)
    puntuacion = null;

  var sql = "select a.*, b.nombre  " +
              "from pelicula a, genero b " +
            " where a.genero_id = b.id " +
              " and a.anio between " + anio_inicio + " and " + anio_fin  +
              " and b.nombre like '" + genero + "'" +
              " and a.puntuacion >= coalesce(" + puntuacion + ",puntuacion);"
  con.query(sql, function(error, resultado, fields) {
    if(error){
      return res.status(404).send("Hubo un error al recomendar película. " + error.code);
    }
    var response = {
      'peliculas': resultado
    }
    res.send(JSON.stringify(response));
  });
}

module.exports = {
  buscarPeliculas : buscarPeliculas,
  verInformacionPelicula : verInformacionPelicula,
  recomendarPeliculas : recomendarPeliculas
}
