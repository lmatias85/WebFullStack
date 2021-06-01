//Declaración de variables
var nombreUsuario = "Matías";
var codigoSeguridad = 5656;
var saldoCuenta = 30000;
var limiteExtraccion = 5000;
var agua = 350;
var telefono = 425;
var luz = 210;
var internet = 570;
var cuentaAmiga1 = 1234567;
var cuentaAmiga2 = 7654321;

//Ejecución de las funciones que actualizan los valores de las variables en el HTML
iniciarSesion();
cargarNombreEnPantalla();
actualizarSaldoEnPantalla();
actualizarLimiteEnPantalla();

//Funciones creadas
function incrementarSaldo(dinero){
  saldoCuenta += dinero;
}

function decrementarSado(dinero){
  saldoCuenta -= dinero;
}

function esMultiploDe100(numero){
  if (numero % 100 === 0 ){
    return true;
  } else{
    return false;
  }
}

function haySaldoDisponible(dinero){
  if (dinero <= saldoCuenta){
    return true;
  }
  else{
    return false;
  }
}

function superaLimiteExtraccion(dinero){
  if (dinero > limiteExtraccion){
    return true;
  }
  else{
    return false;
  }
}

function cancela(input){
  if (input == null){
    return true;
  }
  else{
    return false;
  }

}

function controlNumero(valor){
  if (isNaN(valor)){
    alert("Debe ingresar un valor numérico.");
    return false;
  }
  else if (valor < 0){
    alert("Debe ingresar un valor mayor a 0 (cero).");
    return false;
  }
  return true;
}

function efectuarPago(servicio,nombreServicio){
  if(haySaldoDisponible(servicio)){
    auxSaldoAnterior = saldoCuenta;
    decrementarSado(servicio);
    alert("Has pagado el servicio "+nombreServicio+"\nSaldo anterior: "+auxSaldoAnterior+"\nDinero descontado: "+servicio+"\nSaldo actual: "+saldoCuenta);
    actualizarSaldoEnPantalla();
  }
  else{
    alert("No hay suficiente dinero en tu cuenta para pagar este servicio.");
  }
}

function limpiarPantalla(){
  saldoCuenta = 0;
  nombreUsuario = "";
  limiteExtraccion = 0;
  actualizarSaldoEnPantalla();
  cargarNombreEnPantalla();
  actualizarLimiteEnPantalla();
}

//Funciones que tenes que completar
function cambiarLimiteDeExtraccion(){
  var limite = prompt("Ingrese el nuevo límite de extracción");
  var auxLimiteAnterior = limiteExtraccion;
  var nuevoLimite;
  if(!cancela(limite)){
    nuevoLimite = parseInt(limite);
    if(controlNumero(nuevoLimite)){
      limiteExtraccion = nuevoLimite;
      actualizarLimiteEnPantalla();
      alert("Límite de extracción anterior: "+auxLimiteAnterior+"\nNuevo límite de extracción: "+limiteExtraccion);
    }
  }
}

function extraerDinero(){
  var dinero = prompt("Ingrese el dinero a extraer");
  var auxSaldoAnterior = saldoCuenta;
  var dineroAExtraer;
  if(!cancela(dinero)){
    dineroAExtraer = parseInt(dinero);
    if(controlNumero(dineroAExtraer)){
      if(!haySaldoDisponible(dineroAExtraer)){
        alert("No hay saldo disponible para extraer esa cantidad de dinero.")
      }
      else if (superaLimiteExtraccion(dineroAExtraer)){
          alert("La cantidad de dinero que deseas extraer es mayor a tu límite de extracción.")
        } else if (!esMultiploDe100(dineroAExtraer)){
            alert("Sólo puedes extraer billetes de 100.")
          } else{
            decrementarSado(dineroAExtraer);
            actualizarSaldoEnPantalla();
            alert("Has Retirado: "+dineroAExtraer+"\nSaldo anterior: "+auxSaldoAnterior+"\nSaldo actual: "+saldoCuenta);
          }
    }
  }
}

function depositarDinero(){
  var dinero = prompt("Ingrese el dinero a depositar.");
  var auxSaldoAnterior = saldoCuenta;
  var dineroADepositar;
  if (!cancela(dinero)){
    dineroADepositar = parseInt(dinero);
    if(controlNumero(dineroADepositar)){
      incrementarSaldo(dineroADepositar);
      actualizarSaldoEnPantalla();
      alert("Has Depositado: "+dineroADepositar+"\nSaldo anterior: "+auxSaldoAnterior+"\nSaldo actual: "+saldoCuenta);
    }
  }
}

function pagarServicio(){
  var opcion = prompt("Ingrese el número que corresponda con el servicio que queres pagar:\n1 - Agua\n2 - Luz\n3 - Internet\n4 - Teléfono");
  if(!cancela(opcion)){
    opcion = parseInt(opcion);
    if (controlNumero(opcion)){
      switch (opcion){
        case 1:
          efectuarPago(agua,"Agua");
          break;
        case 2:
          efectuarPago(luz,"Luz");
          break;
        case 3:
          efectuarPago(internet,"Internet");
          break;
        case 4:
          efectuarPago(telefono,"Teléfono");
          break;
        default:
          alert("No existe el servicio seleccionado.");
      }
    }
  }
}

function transferirDinero(){
  var dineroATransferir = prompt("Ingrse el monto que desea transferir:");
  var cuentaATransferir;
  if(!cancela(dineroATransferir)){
    dineroATransferir = parseInt(dineroATransferir);
    if(controlNumero(dineroATransferir)){
      if(haySaldoDisponible(dineroATransferir)){
        cuentaATransferir = parseInt(prompt("Ingrse el número de cuenta al que desea transferir:"));
        if(cuentaATransferir === cuentaAmiga1 || cuentaATransferir === cuentaAmiga2)
        {
          decrementarSado(dineroATransferir);
          actualizarSaldoEnPantalla();
          alert("Se han transferido: $"+dineroATransferir+"\nCuenta Destino: "+cuentaATransferir);
        }
        else{
          alert("Sólo se puede transferir dinero a una cuenta amiga.");
        }
      }
      else{
        alert("No hay saldo suficiente para transferir $"+dineroATransferir);
      }
    }
  }
}

function iniciarSesion(){
  var codigoCuenta = prompt("Por favor ingrese el código de su cuenta:");
  if (!cancela(codigoCuenta)){
    codigoCuenta = parseInt(codigoCuenta);
    if(codigoCuenta === codigoSeguridad){
      alert("Bienvenido/a "+nombreUsuario+" ya puedes comenzar a realizar operaciones.")
    }
    else{
      alert("Código Incorrecto. Tu dinero ha sido retenido por cuestiones de seguridad.");
      limpiarPantalla();
    }
  }
  else{
    retenerSaldo();
  }
}

function cerrarSesion(){
  if(confirm("¿Está seguro que desea Salir?")){
    limpiarPantalla();
  }
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla(){
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla(){
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla(){
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}
