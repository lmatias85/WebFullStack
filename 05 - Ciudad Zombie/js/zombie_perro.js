var ZombiePerro = function(sprite, x, y, ancho, alto, velocidad, rangoMov, direccionAtaque) {
  Enemigo.call(this, sprite, x, y, ancho, alto, velocidad, rangoMov);
  this.direccionAtaque = direccionAtaque;
}

ZombiePerro.prototype = Object.create(Enemigo.prototype);
ZombiePerro.prototype.constructor = ZombiePerro;

ZombiePerro.prototype.correr = function(){

  this.x -= this.velocidad;

  if (this.direccionAtaque === 'arriba')
    this.y -= this.velocidad;
  else
    this.y += this.velocidad;

  if ((this.x < this.rangoMov.desdeX) || (this.x > this.rangoMov.hastaX)){
    this.velocidad *= -1;
  }

  if ((this.y < this.rangoMov.desdeY) || (this.y > this.rangoMov.hastaY)){
    if (this.direccionAtaque === 'abajo')
      this.direccionAtaque = 'arriba';
    else
      this.direccionAtaque = 'abajo';
  }
}

ZombiePerro.prototype.atacar = function(jugador) {
  jugador.perderVida(1);
}
