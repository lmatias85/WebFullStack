lugaresModulo = (function () {
  var servicioLugares; // Servicio para obtener lugares cercanos e información de lugares(como fotos, puntuación del lugar,etc).

    // Completa las direcciones ingresadas por el usuario a y establece los límites
    // con un círculo cuyo radio es de 20000 metros.
  function autocompletar () {
        /* Completar la función autocompletar(): autocompleta los 4 campos de texto de la
        página (las direcciones ingresables por el usuario).
        Para esto creá un círculo con radio de 20000 metros y usalo para fijar
        los límites de la búsqueda de dirección. El círculo no se debe ver en el mapa. */
    var inputDireccion = document.getElementById('direccion');
    var inputDesde = document.getElementById('desde');
    var inputHasta = document.getElementById('hasta');
    var inputAgregar = document.getElementById('agregar');

    var autoDireccion = new google.maps.places.Autocomplete(inputDireccion, {strictBounds: true});
    var autoDesde = new google.maps.places.Autocomplete(inputDesde, {strictBounds: true});
    var autoHasta = new google.maps.places.Autocomplete(inputHasta, {strictBounds: true});
    var autoAgregar = new google.maps.places.Autocomplete(inputAgregar, {strictBounds: true});

    var limiteAutocompleta = new google.maps.Circle({center: posicionCentral, radius:20000});

    autoDireccion.setBounds(limiteAutocompleta.getBounds());
    autoDesde.setBounds(limiteAutocompleta.getBounds());
    autoHasta.setBounds(limiteAutocompleta.getBounds());
    autoAgregar.setBounds(limiteAutocompleta.getBounds());

  }

    // Inicializo la variable servicioLugares y llamo a la función autocompletar
  function inicializar () {
    servicioLugares = new google.maps.places.PlacesService(mapa)
    autocompletar()
  }

    // Busca lugares con el tipo especificado en el campo de TipoDeLugar

  function buscarCerca (posicion) {
    servicioLugares = new google.maps.places.PlacesService(mapa);
    servicioLugares.nearbySearch({
      location: posicion,
      radius: document.getElementById('radio').value,
      type: [document.getElementById('tipoDeLugar').value]
    }, marcadorModulo.marcarLugares);
  }

  return {
    inicializar,
    buscarCerca
  }
})()
