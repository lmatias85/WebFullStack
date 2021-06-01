//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var peliculasController = require('./controladores/controladorPeliculas');
var generosController = require('./controladores/controladorGeneros');
var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/generos',generosController.getGeneros);
app.get('/peliculas',peliculasController.buscarPeliculas);
app.get('/peliculas/recomendacion',peliculasController.recomendarPeliculas);
app.get('/peliculas/:id',peliculasController.verInformacionPelicula);

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});
