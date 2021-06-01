/*
 * Modelo
 */
var Modelo = function() {
  this.preguntasGuardadas = JSON.parse(localStorage.getItem('preguntas'));
  if (this.preguntasGuardadas !== null) {
    this.preguntas = this.preguntasGuardadas;
  } else {
    this.preguntas = [];
  }
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.preguntaBorrada = new Evento(this);
  this.todasPreguntasBorradas = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    var idMasAlto = 0;
    for (var i = 0; i < this.preguntas.length; i++) {
      if (this.preguntas[i].id > idMasAlto) {
        idMasAlto = this.preguntas[i].id;
      }
    }
    return idMasAlto;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  editarPregunta: function(idPregunta, nuevaPregunta) {
    for(var i=0; i < this.preguntas.length; i++) {
      if (this.preguntas[i].id === idPregunta){
        this.preguntas[i].textoPregunta = nuevaPregunta;
      }
    }
    this.guardar();
    this.preguntaEditada.notificar();
  },

  borrarPregunta: function(idPregunta) {
    for(var i=0; i < this.preguntas.length; i++) {
      if (this.preguntas[i].id === idPregunta){
        this.preguntas.splice(i,1);
      }
    }
    this.guardar();
    this.preguntaBorrada.notificar();
  },

  borrarTodo: function() {
    this.preguntas.splice(0,this.preguntas.length);
    this.guardar();
    this.todasPreguntasBorradas.notificar();
  },

  agregarVoto: function(idPregunta, respuesta) {
    for(var i=0; i < this.preguntas.length; i++) {
      if (this.preguntas[i].id === parseInt(idPregunta)){
        for(var j=0; j < this.preguntas[i].cantidadPorRespuesta.length; j++) {
          if (this.preguntas[i].cantidadPorRespuesta[j].textoRespuesta === respuesta) {
            this.preguntas[i].cantidadPorRespuesta[j].cantidad ++;
          }
        }
      }
    }
    this.guardar();
  },
  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem('preguntas',JSON.stringify(this.preguntas));
  }
};
