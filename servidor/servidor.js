//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var ControladorPeliculas = require('./controladores/ControladorPeliculas');
var ControladorInformacionDePelicula = require('./controladores/ControladorInformacionDePelicula');
var ControladorRecomendaciones = require('./controladores/ControladorRecomendaciones');

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//get que trae TODAS las peliculas
app.get('/peliculas', ControladorPeliculas.traerTodasLasPeliculas);
//get que trae los generos
app.get('/generos', ControladorPeliculas.traerGeneros);
//get que trae la informacion de una pelicula en particular
app.get('/peliculas/:id', ControladorInformacionDePelicula.obtenerPelicula);
//get que muestra la recomiendacion de peliculas
app.get('/recomendacion', ControladorRecomendaciones.pedirRecomendacion);

//seteo del puerto que va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});
