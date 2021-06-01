use competencias;

create table competencia (
  id int unsigned auto_increment primary key,
	nombre varchar(300),
	genero_id int unsigned,
	director_id int unsigned,
	actor_id int unsigned,
	foreign key (genero_id) references genero(id),
	foreign key (director_id) references director(id),
	foreign key (actor_id) references actor(id)
);

create table voto (
  id int unsigned auto_increment primary key,
	competencia_id int unsigned,
	pelicula_id int unsigned,
	foreign key (competencia_id) references competencia(id) on delete cascade,
	foreign key (pelicula_id) references pelicula(id)
);
