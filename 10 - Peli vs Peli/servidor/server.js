//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();


var generosController = require('./controllers/generosController');
var directoresController = require('./controllers/directoresController');
var actoresController = require('./controllers/actoresController');
var competenciasCRUDController = require('./controllers/competenciasCRUDController');
var competenciasManagerController = require('./controllers/competenciasManagerController')

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/generos',generosController.obtenerGeneros);
app.get('/directores',directoresController.obtenerDirectores);
app.get('/actores',actoresController.obtenerActores);

app.post('/competencias',competenciasCRUDController.crearCompetencia);
app.get('/competencias',competenciasCRUDController.buscarCompetencias);
app.get('/competencias/:id',competenciasCRUDController.obtenerCompetencia);
app.put('/competencias/:id',competenciasCRUDController.modificarCompetencia);
app.delete('/competencias/:id',competenciasCRUDController.eliminarCompetencia);

app.get('/competencias/:id/peliculas',competenciasManagerController.obtenerOpcionesPeliculas);
app.get('/competencias/:id/resultados',competenciasManagerController.obtenerResultados);
app.post('/competencias/:id/voto',competenciasManagerController.contarVoto);
app.delete('/competencias/:id/votos',competenciasManagerController.reiniciarCompetencia);

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';
var ip = '127.0.0.1';

app.listen(puerto, ip, function () {
  console.log( "Escuchando en ip " + ip + " en el puerto " + puerto );
});
