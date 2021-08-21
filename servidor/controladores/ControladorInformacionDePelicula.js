var con = require('../lib/conexionbd');

function obtenerPelicula(req, res) {
    var id = req.params.id;
    var sql = "select pelicula.titulo, pelicula.duracion, pelicula.director, pelicula.anio, pelicula.fecha_lanzamiento, pelicula.puntuacion, pelicula.poster, pelicula.trama, genero.nombre, actor.nombre as actores from pelicula join genero on genero_id = genero.id join actor_pelicula on pelicula.id = actor_pelicula.pelicula_id join actor on actor_pelicula.actor_id = actor.id where pelicula.id = " + id;
    con.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        //si no se encontró ningún resultado, se envía un mensaje con el error
        if (resultado.length == 0) {
            console.log("No se encontro ninguna pelicula con ese id");
            return res.status(404).send("No se encontro ninguna pelicula con ese id");
        }
        else {
          var actores = [];
          for (var i = 0; i < resultado.length; i++) {
            actores.push(resultado[i].actores);
          }
          resultado[0].actores = actores;
          var respuesta = {
              'pelicula': resultado[0],
              'actores': resultado[0],
              'genero': resultado[0]
          };
          res.send(JSON.stringify(respuesta));
        }
    });
}

module.exports = {
  obtenerPelicula: obtenerPelicula
};
