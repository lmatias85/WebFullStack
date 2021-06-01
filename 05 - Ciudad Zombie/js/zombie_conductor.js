var ZombieConductor = function(sprite, x, y, ancho, alto, velocidad, rangoMov, direccion) {
  Enemigo.call(this, sprite, x, y, ancho, alto, velocidad, rangoMov);
  this.direccion = direccion;
}

ZombieConductor.prototype = Object.create(Enemigo.prototype);
ZombieConductor.prototype.constructor = ZombieConductor;

ZombieConductor.prototype.conducir = function(){

  var booleanRandom = false;
  if (Math.random() < 0.5) booleanRandom = true;

  if (this.direccion === 'h')
  {
    if (booleanRandom)
      this.x += this.velocidad;
  } else if (this.direccion === 'v') {
    if (booleanRandom)
      this.y += this.velocidad;
  }

  if(this.x === this.rangoMov.hastaX)
    this.x = this.rangoMov.desdeX;

  if(this.y === this.rangoMov.hastaY)
    this.y = this.rangoMov.desdeY;
}

ZombieConductor.prototype.atacar = function(jugador) {
  jugador.perderVida(jugador.vidas);
}
