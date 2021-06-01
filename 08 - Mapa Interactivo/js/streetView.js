streetViewModulo = (function () {
  var panorama; // 'Visor' de StreetView

  function inicializar () {
    panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));
  }

    // Actualiza la ubicación del Panorama
  function fijarStreetView (ubicacion) {
    panorama.setPosition(ubicacion);
  }

  return {
    inicializar,
    fijarStreetView
  }
})()
