var con = require('../lib/conexionbd');

function pedirRecomendacion(req, res) {
  var anio_inicio = req.query.anio_inicio;
  var anio_fin = req.query.anio_fin;
  var puntuacion = req.query.puntuacion;
  var genero = req.query.genero;
  var duracion = req.query.duracion;

  var sql;

  if (Object.keys(req.query).length === 0) {
      sql = "select pelicula.id, pelicula.titulo, pelicula.poster, pelicula.trama, genero.nombre from pelicula join genero on genero_id = genero.id limit 0,50";
  }
  else {
      if(puntuacion){
        if(genero){
            sql = "select pelicula.id, pelicula.titulo, pelicula.poster, pelicula.trama, genero.nombre from pelicula join genero on genero_id = genero.id where pelicula.puntuacion >= " + puntuacion + " and genero.nombre = '" + genero + "' limit 0,50";
        }else {
            sql = "select pelicula.id, pelicula.titulo, pelicula.poster, pelicula.trama, genero.nombre from pelicula join genero on genero_id = genero.id where pelicula.puntuacion >= " + puntuacion + " limit 0,50";
        }
      }
      if(anio_inicio) {
        if(genero){
            sql = "select pelicula.id, pelicula.titulo, pelicula.poster, pelicula.trama, genero.nombre from pelicula join genero on genero_id = genero.id where pelicula.anio between " + anio_inicio + " and " + anio_fin + " and genero.nombre = '" + genero + "' limit 0,50";
        }else {
            sql = "select pelicula.id, pelicula.titulo, pelicula.poster, pelicula.trama, genero.nombre from pelicula join genero on genero_id = genero.id where pelicula.anio between " + anio_inicio + " and " + anio_fin + " limit 0,50";
        }
      }
      if(duracion) { //criterio agregado por mi
        if(genero){
            sql = "select pelicula.id, pelicula.titulo, pelicula.poster, pelicula.trama, genero.nombre from pelicula join genero on genero_id = genero.id where pelicula.duracion <= " + duracion + " and genero.nombre = '" + genero + "' limit 0,50";
        }else {
            sql = "select pelicula.id, pelicula.titulo, pelicula.poster, pelicula.trama, genero.nombre from pelicula join genero on genero_id = genero.id where pelicula.duracion <= " + duracion + " limit 0,50";
        }
      }
  }
  con.query(sql, function(error, resultado, fields) {
      if (error) {
          console.log("Hubo un error en la consulta", error.message);
          return res.status(404).send("Hubo un error en la consulta");
      }
      var response = {
          'peliculas': resultado
      };

      res.send(JSON.stringify(response));
  });
}

module.exports = {
  pedirRecomendacion: pedirRecomendacion
};
