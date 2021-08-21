var con = require('../lib/conexionbd');

function traerTodasLasPeliculas(req, res) {
  var anio = req.query.anio;
  var titulo = req.query.titulo;
  var genero_id = req.query.genero;
  var columna_orden = req.query.columna_orden;
  var tipo_orden = req.query.tipo_orden;
  var cantidad = req.query.cantidad;
  var pagina = req.query.pagina;
  var desde_fila = 0;
  var pelis_mostradas = pagina*cantidad;
  if (pagina > 1) {
    desde_fila = pelis_mostradas-cantidad;
  }
  var condicion = "where ";
  var sql = "select * from pelicula ";

  if (anio || titulo || genero_id) { //es decir, si hay filtros:
    var sql_anio = null;
    var sql_genero_id = null;
    var sql_titulo = null;

    if(anio) {
      sql_anio = "anio = " + anio;
    }
    if(genero_id){
      sql_genero_id = "genero_id = " + genero_id;
    }
    if(titulo){
      sql_titulo = "titulo like '%" + titulo + "%'"
    }

    if(anio && titulo && genero_id) { //posibilidad 1: se pusieron todos los filtros
      condicion = condicion + sql_anio + " and " + sql_titulo + " and " + sql_genero_id;
      sql = sql + condicion;
    }
    if(anio && titulo && !genero_id) { //posibilidad 2: se puso filtro de anio y titulo pero no de genero
      condicion = condicion + sql_anio + " and " + sql_titulo;
      sql = sql + condicion;
    }
    if(anio && !titulo && genero_id) { //posibilidad 3: se puso filtro de anio y genero pero no de titulo
      condicion = condicion + sql_anio + " and " + sql_genero_id;
      sql = sql + condicion;
    }
    if(!anio && titulo && genero_id) { //posibilidad 4: se puso filtro de titulo y genero pero no de anio
      condicion = condicion + sql_titulo + " and " + sql_genero_id;
      sql = sql + condicion;
    }
    if(anio && !titulo && !genero_id) { //posibilidad 5: se filtro solo por anio
      condicion = condicion + sql_anio;
      sql = sql + condicion;
    }
    if(!anio && titulo && !genero_id) { //posibilidad 5: se filtro solo por titulo
      condicion = condicion + sql_titulo;
      sql = sql + condicion;
    }
    if(!anio && !titulo && genero_id) { //posibilidad 5: se filtro solo por genero
      condicion = condicion + sql_genero_id;
      sql = sql + condicion;
    }

    sql = sql + " order by " + columna_orden + " " + tipo_orden + " limit " + desde_fila + "," + cantidad;
  }
  else{
    if (columna_orden && tipo_orden && cantidad) {
        var sql = "select * from pelicula order by " + columna_orden + " " + tipo_orden + " limit " + desde_fila + "," + cantidad;
    }
  }

    con.query(sql, function(error, resultado, fields) {
      console.log(sql);
      if (error) {
          console.log("Hubo un error en la consulta", error.message);
          return res.status(404).send("Hubo un error en la consulta");
      }
      console.log(resultado.length);
      var total;
      var otraSQL;
      if(condicion != "where ") {
        otraSQL = "select count(id) as total from pelicula " + condicion;
      } else {
        otraSQL = "select count(id) as total from pelicula ";
      }
      con.query(otraSQL, function(error, resul, fields){
          if (error) {
              console.log("Hubo un error en la consulta", error.message);
              return res.status(404).send("Hubo un error en la consulta");
          }
          total = resul[0].total;
          console.log(total); 
          var response = {
              "peliculas": resultado,
              'total': total
          };
          res.send(JSON.stringify(response));
      });
    });
}

function traerGeneros(req, res) {
  var sql = "select * from genero"
  con.query(sql, function(error, resultado, fields) {
      if (error) {
          console.log("Hubo un error en la consulta", error.message);
          return res.status(404).send("Hubo un error en la consulta");
      }
      var response = {
          'generos': resultado
      };

      res.send(JSON.stringify(response));
  });
}

module.exports = {
  traerTodasLasPeliculas: traerTodasLasPeliculas,
  traerGeneros: traerGeneros
};
