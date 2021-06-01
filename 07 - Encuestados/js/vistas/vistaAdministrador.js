/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });
  this.modelo.preguntaEditada.suscribir(function() {
    contexto.reconstruirLista();
  });
  this.modelo.preguntaBorrada.suscribir(function(){
    contexto.reconstruirLista();
  });
  this.modelo.todasPreguntasBorradas.suscribir(function(){
    contexto.reconstruirLista();
  });
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    validacionDeFormulario();
    this.reconstruirLista();
    this.configuracionDeBotones();
  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    var nuevoItem;

    nuevoItem = $('<li class="list-group-item"></li>');
    nuevoItem.attr('id',pregunta.id);
    nuevoItem.attr('text',pregunta.textoPregunta);

    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));

    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function() {
      var value = e.pregunta.val();
      var respuestas = [];
      $('.has-success [name="option[]"]').each(function() {
        respuestas.push({'textoRespuesta':$(this).val(),'cantidad':0});
      })
      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);
    });
    //asociar el resto de los botones a eventos
    e.botonEditarPregunta.click(function(){
      var idPregunta = parseInt($('.list-group-item.active').attr('id'));
      var nuevaPregunta = prompt('Cambiar pregunta por: ')
      contexto.controlador.editarPregunta(idPregunta, nuevaPregunta);
    });
    e.botonBorrarPregunta.click(function() {
      var idPregunta = parseInt($('.list-group-item.active').attr('id'));
      contexto.controlador.borrarPregunta(idPregunta);
    });
    e.borrarTodo.click(function(){
      contexto.controlador.borrarTodo();
    });
  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
