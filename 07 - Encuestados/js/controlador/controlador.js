/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },
  editarPregunta: function(idPregunta, nuevaPregunta) {
    this.modelo.editarPregunta(idPregunta, nuevaPregunta);
  },
  borrarPregunta: function(idPregunta) {
    this.modelo.borrarPregunta(idPregunta);
  },
  borrarTodo: function() {
    this.modelo.borrarTodo();
  },
  agregarVoto: function(idPregunta, nombrePregunta, respuestaSeleccionada) {
    this.modelo.agregarVoto(idPregunta, respuestaSeleccionada);
  }
};
