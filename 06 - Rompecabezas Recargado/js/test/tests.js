var expect = chai.expect;

describe('Creación', function() {
    'use strict';

describe('Juego', function() {
    it('El Objeto Juego está definido', function(done) {
      if (!window.Juego){
        done(err);
      }
      else{
        done();
      }
    });
});

describe('Tamaño de la grilla', function() {
    it('La grilla tiene el tamaño correcto', function() {
      //se crea la grilla con un valor de cantidad de piezas por lado
      Juego.cantidadDePiezasPorLado = 5;
      Juego.crearGrilla();
      //se evalua si el tamaño de la grilla creada es correcto
      expect(Juego.grilla.length).to.equal(Juego.cantidadDePiezasPorLado);
      expect(Juego.grilla[0].length).to.equal(Juego.cantidadDePiezasPorLado);
    });
  });

describe('Posición válida', function() {
    it('La posición es válida', function() {
      //se crea la grilla con un valor de cantidad de piezas por lado
      if (!Juego.posicionValida(0,0)) done(err);
      if (!Juego.posicionValida(2,2)) done(err);
      if (Juego.posicionValida(Juego.cantidadDePiezasPorLado,Juego.cantidadDePiezasPorLado)) done(err);
      if (Juego.posicionValida(Juego.cantidadDePiezasPorLado + 4,Juego.cantidadDePiezasPorLado + 4)) done(err);
    });
  });

describe('Intercambio de Posiciones de Grilla', function() {
    it('El intercambio de posicones de la grilla del rompecabezas', function() {
      //se crea la grilla con un valor de cantidad de piezas por lado
      var pieza1 = Juego.grilla[0][0];
      var pieza2 = Juego.grilla[1][1];
      Juego.intercambiarPosicionesGrilla(0,0,1,1);
      expect(Juego.grilla[0][0]).to.equal(pieza2);
      expect(Juego.grilla[1][1]).to.equal(pieza1);
    });
  });

  describe('Chequeo si ganó', function() {
      it('El control para verificar si ganó el juego es correcto', function() {
        Juego.contadorDeMovimientos = 1;
        //se crea la grilla con un valor de cantidad de piezas por lado
        Juego.grilla = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]];
        if (!Juego.chequearSiGano()) done(err);
        Juego.grilla = [[1,2,9,4],[5,6,16,8],[3,10,11,12],[13,14,15,7]];
        if (Juego.chequearSiGano()) done(err);
        Juego.grilla = [[1,1,1,1],[5,6,16,8],[3,10,11,12],[13,14,15,7]];
        if (Juego.chequearSiGano()) done(err);
      });
    });

});
