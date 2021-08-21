CREATE DATABASE peliculas;

USE peliculas;

CREATE TABLE pelicula (
  id INT NOT NULL auto_increment,
  titulo VARCHAR(100) NOT NULL,
  duracion INT NOT NULL,
  director VARCHAR(400) NOT NULL,
  anio INT,
  fecha_lanzamiento DATE NOT NULL,
  puntuacion INT,
  poster VARCHAR(300) NOT NULL,
  trama VARCHAR(700) NOT NULL,
  PRIMARY KEY (id)
);

source C:\Lucila\que-veo-hoy-recursos\scripts\script-paso-1-peliculas.sql

CREATE TABLE genero (
  id INT NOT NULL auto_increment,
  nombre VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE pelicula ADD COLUMN genero_id INT NOT NULL;
ALTER TABLE pelicula ADD FOREIGN KEY (genero_id) REFERENCES genero(id);

source C:\Lucila\que-veo-hoy-recursos\scripts\script-paso-2-generos.sql

CREATE TABLE actor (
  id INT NOT NULL auto_increment,
  nombre VARCHAR(70) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE actor_pelicula (
  id INT NOT NULL auto_increment,
  actor_id INT NOT NULL,
  pelicula_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (actor_id) REFERENCES actor(id),
  FOREIGN KEY (pelicula_id) REFERENCES pelicula(id)
);

source C:\Lucila\que-veo-hoy-recursos\scripts\script-paso-3-actores.sql