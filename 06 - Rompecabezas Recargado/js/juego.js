var Juego = {
  altoDeRompecabezas: 600,
  altoPiezas: 200,
  anchoDeRompecabezas: 600,
  anchoPiezas: 200,
  cantidadDePiezasPorLado: 0,
  columnaPosicionVacia: 0,
  contadorDeMovimientos: 0,
  filaPosicionVacia: 0,
  movimientosRestantes: 0,
  timer: null,
  imagen: new Image(),
  grilla: [],
  instrucciones: [],
  movimientos: [],
  movimientosUsuario: [],
  piezas: [],
  codigosDireccion: CodigosDireccion,
  canvas : document.getElementById('canvasJuego'),
  context : null
}

Juego.mostrarInstrucciones = function () {
  this.agregarInstruccion("Utilizar las flechas para mover las fichas");
  this.agregarInstruccion("Ordernar las piezas hasta alcanzar la imagen objetivo");
  for(var i=0; i < this.instrucciones.length; i++){
    this.mostrarInstruccionEnLista(this.instrucciones[i],"lista-instrucciones")
  }
};

Juego.agregarInstruccion = function (strInstruccion) {
  this.instrucciones.push(strInstruccion);
};

Juego.mostrarInstruccionEnLista = function (instruccion, idLista) {
  var ul = document.getElementById(idLista);
  var li = document.createElement("li");
  li.textContent = instruccion;
  ul.appendChild(li);
};

Juego.setValoresPorDefecto = function() {
  this.contadorDeMovimientos = 0;
  this.cantidadDePiezasPorLado = 3;
  document.getElementById('nivelFacil').checked = true;
  this.setDificultad('facil');
  document.getElementById('inCantidadPiezasLado').value = 3;
  this.iniciarImagen(function(){});
  Juego.inhabilitarElementos(false);
};

Juego.setDificultad = function (nivel) {
  var cantMovimientosPermitidos;
  var minutosPermitidos;
  var segundosPermitidos;
  switch (nivel) {
    case 'facil':
      cantMovimientosPermitidos = Math.max(Math.pow(this.cantidadDePiezasPorLado,5),200);;
      minutosPermitidos = this.cantidadDePiezasPorLado*3;
      segundosPermitidos = 0;
      break;
    case 'medio':
      cantMovimientosPermitidos = Math.max(Math.pow(this.cantidadDePiezasPorLado,4),150);;
      minutosPermitidos = this.cantidadDePiezasPorLado*2;
      segundosPermitidos = 0;
      break;
    case 'dificil':
      cantMovimientosPermitidos = Math.max(Math.pow(this.cantidadDePiezasPorLado, 3),100);
      minutosPermitidos = this.cantidadDePiezasPorLado;
      segundosPermitidos = 0;
      break;
  }
  Juego.mostrarTiempo(document.getElementById('minutos'),minutosPermitidos);
  Juego.mostrarTiempo(document.getElementById('segundos'),segundosPermitidos);
  Juego.mostrarMovimientosRestantes(document.getElementById('cantMovimientosRestantes'),cantMovimientosPermitidos);
};

Juego.mostrarTiempo = function (elemento,tiempo) {
  elemento.innerHTML = (tiempo).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
};

Juego.mostrarMovimientosRestantes = function (elemento, cantidad) {
  elemento.innerHTML = cantidad;
};

Juego.iniciarImagen = function (callback) {
  this.imagen = new Image();
  var self = this;
  this.imagen.addEventListener('load', function () {
    self.cargarImagen.call(self);
    callback();
  }, false);
  this.imagen.src = "images/imagen.jpg";
};

Juego.cargarImagen = function () {
  this.anchoPiezas = Math.floor(this.anchoDeRompecabezas / this.cantidadDePiezasPorLado);
  this.altoPiezas = Math.floor(this.altoDeRompecabezas / this.cantidadDePiezasPorLado);
  this.configurarCanvas();
};

Juego.configurarCanvas = function () {
  this.context = this.canvas.getContext('2d');
  this.context.drawImage(this.imagen,0,0);
  this.context.beginPath();
  var xVacia = this.anchoDeRompecabezas - this.anchoPiezas;
  var yVacia = this.altoDeRompecabezas - this.altoPiezas;
  this.context.fillStyle = '#112d4e';
  this.context.fillRect(xVacia,
                        yVacia,
                        this.anchoPiezas,
                        this.altoPiezas);
};

Juego.inhabilitarElementos = function (valor) {
  var arrElementos = document.getElementsByClassName('radiobutton');
  document.getElementById('btnMezclar').disabled = valor;
  document.getElementById('inCantidadPiezasLado').disabled = valor;
  for(var i=0; i < arrElementos.length; i++) {
    arrElementos[i].disabled = valor;
  }
};

Juego.iniciar = function () {
  this.piezas = [];
  this.grilla = [];
  this.cantidadDePiezasPorLado = parseInt(document.getElementById("inCantidadPiezasLado").value);
  this.movimientosRestantes = parseInt(document.getElementById('cantMovimientosRestantes').innerHTML);
  this.contadorDeMovimientos = 0;
  //se guarda el contexto en una variable para que no se pierda cuando se ejecute la funcion iniciarImagen (que va a tener otro contexto interno)
  var self = this;
  this.crearGrilla();
  //se instancian los atributos que indican la posicion de las fila y columna vacias de acuerdo a la cantidad de piezas por lado para que sea la ultima del tablero
  this.filaPosicionVacia = this.cantidadDePiezasPorLado - 1;
  this.columnaPosicionVacia = this.cantidadDePiezasPorLado - 1;
  //se espera a que este iniciada la imagen antes de construir las piezas y empezar a mezclarlas
  this.iniciarImagen(function () {
    self.construirPiezas(self.cantidadDePiezasPorLado);
    //la cantidad de veces que se mezcla es en funcion a la cantidad de piezas por lado que tenemos, para que sea lo mas razonable posible.
    var cantidadDeMezclas = (Math.pow(self.cantidadDePiezasPorLado, 3), 100);
    self.mezclarPiezas(cantidadDeMezclas);
  });
};

Juego.crearGrilla = function () {
  var cantPiezasTotal = 1;
  for (var i=0; i < this.cantidadDePiezasPorLado; i++ ){
      this.grilla[i] = new Array(this.cantidadDePiezasPorLado);
      for (var j=0; j < this.cantidadDePiezasPorLado; j++) {
        this.grilla[i][j] = cantPiezasTotal;
        cantPiezasTotal++;
      }
  }
};

Juego.construirPiezas = function (cantPiezasPorLado) {
  var piezaGrilla = 1;
  var posx = 0;
  var posy = 0;
  for(var i=0; i < cantPiezasPorLado; i++) {
    for(var j=0; j < cantPiezasPorLado; j++){
      this.piezas.push(new Piezas(posx, posy, posx, posy, piezaGrilla));
      posx += this.anchoPiezas;
      if (posx > (cantPiezasPorLado - 1) * this.anchoPiezas)
        posx = 0;
      piezaGrilla ++;
    }
    posy += this.altoPiezas;
  }
};

Juego.mezclarPiezas = function (veces) {
  if (veces <= 0) {
    Juego.contarTiempo();
    return;
  }
  var direcciones = [this.codigosDireccion.ABAJO, this.codigosDireccion.ARRIBA,
      this.codigosDireccion.DERECHA, this.codigosDireccion.IZQUIERDA];
  var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
  this.moverEnDireccion(direccion,'JUEGO');
  setTimeout(function() {
      Juego.mezclarPiezas(veces - 1);
    }, 60);
};

Juego.contarTiempo = function () {
  var minutos = document.getElementById('minutos');
  var segundos = document.getElementById('segundos');
  var contadorMinutos =  parseInt(minutos.innerHTML);
  var contadorSegundos = parseInt(segundos.innerHTML);
  this.timer = setInterval(function() {
    if(contadorMinutos > 0) {
      if (contadorSegundos === 0) {
        contadorSegundos = 59;
        contadorMinutos--;
        Juego.mostrarTiempo(minutos,contadorMinutos);
        Juego.mostrarTiempo(segundos,contadorSegundos);
      } else if (contadorSegundos > 0) {
        contadorSegundos--;
        Juego.mostrarTiempo(segundos,contadorSegundos);
      }
    } else if (contadorMinutos === 0) {
      contadorSegundos--;
      Juego.mostrarTiempo(segundos,contadorSegundos);
      if (contadorSegundos === 0) {
        Juego.setValoresPorDefecto();
        clearInterval(timer);
        swal(":(", "Te quedaste sin tiempo. Vuelve a intentarlo!!!", "error");
      }
    }
  },1000);
};

Juego.moverEnDireccion = function(direccion,tipo) {
  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;
  if (direccion === this.codigosDireccion.ABAJO) {
    nuevaFilaPiezaVacia = this.filaPosicionVacia - 1;
    nuevaColumnaPiezaVacia = this.columnaPosicionVacia;
  }
  else if (direccion === this.codigosDireccion.ARRIBA) {
    nuevaFilaPiezaVacia = this.filaPosicionVacia + 1;
    nuevaColumnaPiezaVacia = this.columnaPosicionVacia;
  }
  else if (direccion === this.codigosDireccion.DERECHA) {
    nuevaFilaPiezaVacia = this.filaPosicionVacia;
    nuevaColumnaPiezaVacia = this.columnaPosicionVacia - 1;
  }
  else if (direccion === this.codigosDireccion.IZQUIERDA) {
    nuevaFilaPiezaVacia = this.filaPosicionVacia;
    nuevaColumnaPiezaVacia = this.columnaPosicionVacia + 1;
  }
  if (this.posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)) {
    this.intercambiarPosiciones(this.filaPosicionVacia, this.columnaPosicionVacia, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    this.actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    if (tipo === 'USUARIO')
      Juego.rastrearMovimiento();
  }
};

Juego.posicionValida = function(fila, columna) {
  return (fila < this.cantidadDePiezasPorLado && columna < this.cantidadDePiezasPorLado && fila >= 0 && columna >= 0);
};

Juego.intercambiarPosiciones = function (fila1, columna1, fila2, columna2) {
  var indNuevaPiezaVacia = this.grilla[fila2][columna2]-1;
  this.intercambiarPosicionesGrilla(fila1, columna1, fila2, columna2);
  this.intercambiarPosicionesCanvas(indNuevaPiezaVacia);
};

Juego.intercambiarPosicionesGrilla = function (filaPos1, columnaPos1, filaPos2, columnaPos2) {
  var auxPos1;
  auxPos1 = this.grilla[filaPos1][columnaPos1];
  this.grilla[filaPos1][columnaPos1] = this.grilla[filaPos2][columnaPos2];
  this.grilla[filaPos2][columnaPos2] = auxPos1;
};

Juego.intercambiarPosicionesCanvas = function (indiceNuevaPiezaVacia) {
  var auxXActualPieza1 = this.piezas[this.piezas.length-1].xActual; // donde debo ubicar la pieza
  var auxYActualPieza1 = this.piezas[this.piezas.length-1].yActual; // donde debo ubicar la pieza
  var auxXOriginalPieza1 = this.piezas[this.piezas.length-1].xOriginal;
  var auxYOriginalPieza1 = this.piezas[this.piezas.length-1].yOriginal;

  var auxXActualPieza2 = this.piezas[indiceNuevaPiezaVacia].xActual; // donde debo ubicar el rectangulo
  var auxYActualPieza2 = this.piezas[indiceNuevaPiezaVacia].yActual; // donde debo ubicar el rectangulo
  var auxXOriginalPieza2 = this.piezas[indiceNuevaPiezaVacia].xOriginal; // donde debo empezar a cortar
  var auxYOriginalPieza2 = this.piezas[indiceNuevaPiezaVacia].yOriginal; // donde debo empezar a cortar

  this.piezas[indiceNuevaPiezaVacia].xActual = auxXActualPieza1;
  this.piezas[indiceNuevaPiezaVacia].yActual = auxYActualPieza1;
  this.piezas[this.piezas.length-1].xActual = auxXActualPieza2;
  this.piezas[this.piezas.length-1].yActual = auxYActualPieza2;
this.context.drawImage(this.imagen,auxXOriginalPieza2,auxYOriginalPieza2,this.anchoPiezas,this.altoPiezas,
                                     auxXActualPieza1,auxYActualPieza1,this.anchoPiezas,this.altoPiezas);
  this.context.fillRect(auxXActualPieza2,auxYActualPieza2,this.anchoPiezas,this.altoPiezas);
};

Juego.actualizarPosicionVacia = function (nuevaFila, nuevaColumna) {
  this.filaPosicionVacia = nuevaFila;
  this.columnaPosicionVacia = nuevaColumna;
};

Juego.rastrearMovimiento = function() {
  this.contadorDeMovimientos++;
  this.movimientosRestantes--;
  if(this.movimientosRestantes === 0){
    Juego.setValoresPorDefecto();
    clearInterval(Juego.timer);
    swal(":(", "Usaste todos tus movimientos permitidos. Vuelve a intentarlo!!!", "error");
  }
  this.mostrarMovimientosRestantes(document.getElementById('cantMovimientosRestantes'),this.movimientosRestantes);
};

Juego.capturarTeclas = function () {
  document.body.onkeydown = (function(evento) {
    if (evento.which === Juego.codigosDireccion.ABAJO ||
      evento.which === Juego.codigosDireccion.ARRIBA ||
      evento.which === Juego.codigosDireccion.DERECHA ||
      evento.which === Juego.codigosDireccion.IZQUIERDA) {
      Juego.moverEnDireccion(evento.which,'USUARIO');
      if (Juego.chequearSiGano())
        Juego.mostrarCartelGanador();
      evento.preventDefault();
    }
  })
};

Juego.capturarMouse = function () {
  this.canvas.onmousedown = (function(evento) {
    var filaGrilla;
    var columnaGrilla;
    var posXMouse = evento.x;
    var posYMouse = evento.y;
    var varOffsetLeft =  Juego.canvas.offsetLeft;
    var varOffsetTop = Juego.canvas.offsetTop;
    var posXCanvas = posXMouse - varOffsetLeft;
    var posYCanvas = posYMouse - varOffsetTop;
    var indicePieza = Juego.obtenerIndicePieza(posXCanvas, posYCanvas);

    for (var i = 0; i < Juego.grilla.length; i++) {
      for (var j = 0; j < Juego.grilla.length; j++) {
        if (Juego.grilla[i][j] === Juego.piezas[indicePieza].piezaGrilla) {
          filaGrilla = i;
          columnaGrilla = j;
        }
      }
    }
    if (Juego.esAdyacenteVacia(filaGrilla, columnaGrilla)) {
      var direccion = Juego.obtenerDireccionMovimiento(filaGrilla, columnaGrilla);
      Juego.moverEnDireccion(direccion,'USUARIO');
      if (Juego.chequearSiGano())
        Juego.mostrarCartelGanador();
    }
  })
};

Juego.obtenerIndicePieza = function (posX, posY) {
  for (var i = 0; i < this.piezas.length; i++) {
    if (Juego.piezas[i].xActual <= posX && Juego.piezas[i].xActual + Juego.anchoPiezas > posX &&
        Juego.piezas[i].yActual <= posY && Juego.piezas[i].yActual + Juego.altoPiezas > posY)
    return i;
  }
  return -1;
};

Juego.esAdyacenteVacia = function (filaPieza, columnaPieza) {
  if ((filaPieza === this.filaPosicionVacia && columnaPieza + 1 === this.columnaPosicionVacia)||
      (filaPieza === this.filaPosicionVacia && columnaPieza - 1 === this.columnaPosicionVacia)||
      (filaPieza + 1 === this.filaPosicionVacia && columnaPieza === this.columnaPosicionVacia)||
      (filaPieza - 1 === this.filaPosicionVacia && columnaPieza === this.columnaPosicionVacia))
    return true;
  return false;
};

Juego.obtenerDireccionMovimiento = function (filaPieza, columnaPieza) {
  var direccion;
  if(filaPieza === this.filaPosicionVacia && columnaPieza + 1 === this.columnaPosicionVacia)
    direccion = this.codigosDireccion.DERECHA;
  else if (filaPieza === this.filaPosicionVacia && columnaPieza - 1 === this.columnaPosicionVacia)
    direccion = this.codigosDireccion.IZQUIERDA;
  else if (filaPieza + 1 === this.filaPosicionVacia && columnaPieza === this.columnaPosicionVacia)
    direccion = this.codigosDireccion.ABAJO;
  else if (filaPieza - 1 === this.filaPosicionVacia && columnaPieza === this.columnaPosicionVacia)
    direccion = this.codigosDireccion.ARRIBA;
  return direccion;
};

Juego.chequearSiGano = function() {
  var orden = 1;
  if (this.contadorDeMovimientos > 0 )  {
    for(var i=0; i < this.grilla.length;i++){
      for(var j=0; j < this.grilla.length;j++){
        if(this.grilla[i][j] != orden){
          return false;
        }
        orden++;
      }
    }
    return true;
  }
  else {
    return false;
  }
};

Juego.mostrarCartelGanador = function () {
  setTimeout(function() {
    swal("¡¡¡Felicidades!!!", "Completaste el juego con "+Juego.contadorDeMovimientos+" movimientos.", "success");
    Juego.setValoresPorDefecto();
    clearInterval(Juego.timer);0
  }, 300);
}

$('#btnMezclar').on('click', function(){
  Juego.inhabilitarElementos(true);
  Juego.iniciar();
});

$('input[name=nivel]:radio').on("change",function(){
  Juego.setDificultad($('input:checked').val());
});

$('#inCantidadPiezasLado').on("change",function(){
  if (!/^([0-9])*$/.test($('#inCantidadPiezasLado').val()) || parseInt($('#inCantidadPiezasLado').val()) <= 1 ) {
    swal("Atencion",'El valor debe estar comprendido entre 2 y 99.','warning');
    $('#inCantidadPiezasLado').val('3');
  }
  Juego.cantidadDePiezasPorLado = $('#inCantidadPiezasLado').val();
  Juego.setDificultad($('input:checked').val());
});

Juego.mostrarInstrucciones();
Juego.setValoresPorDefecto();
Juego.capturarTeclas();
Juego.capturarMouse();
