var nombreColores = ['White', 'LightYellow',
  'LemonChiffon', 'LightGoldenrodYellow', 'PapayaWhip', 'Moccasin', 'PeachPuff', 'PaleGoldenrod', 'Bisque', 'NavajoWhite', 'Wheat', 'BurlyWood', 'Tan',
  'Khaki', 'Yellow', 'Gold', 'Orange', 'DarkOrange', 'OrangeRed', 'Tomato', 'Coral', 'DarkSalmon', 'LightSalmon', 'LightCoral', 'Salmon', 'PaleVioletRed',
  'Pink', 'LightPink', 'HotPink', 'DeepPink', 'MediumVioletRed', 'Crimson', 'Red', 'FireBrick', 'DarkRed', 'Maroon',
  'Brown', 'Sienna', 'SaddleBrown', 'IndianRed', 'RosyBrown',
  'SandyBrown', 'Goldenrod', 'DarkGoldenrod', 'Peru',
  'Chocolate', 'DarkKhaki', 'DarkSeaGreen', 'MediumAquaMarine',
  'MediumSeaGreen', 'SeaGreen', 'ForestGreen', 'Green', 'DarkGreen', 'OliveDrab', 'Olive', 'DarkOliveGreen', 'YellowGreen', 'LawnGreen',
  'Chartreuse', 'GreenYellow', 'Lime', 'SpringGreen', 'LimeGreen',
  'LightGreen', 'PaleGreen', 'PaleTurquoise',
  'AquaMarine', 'Cyan', 'Turquoise', 'MediumTurquoise', 'DarkTurquoise', 'DeepSkyBlue',
  'LightSeaGreen', 'CadetBlue', 'DarkCyan', 'Teal', 'Steelblue', 'LightSteelBlue', 'Honeydew', 'LightCyan',
  'PowderBlue', 'LightBlue', 'SkyBlue', 'LightSkyBlue',
  'DodgerBlue', 'CornflowerBlue', 'RoyalBlue', 'SlateBlue',
  'MediumSlateBlue', 'DarkSlateBlue', 'Indigo', 'Purple', 'DarkMagenta', 'Blue',
  'MediumBlue', 'DarkBlue', 'Navy', 'Thistle',
  'Plum', 'Violet', 'Orchid', 'DarkOrchid', 'Fuchsia', 'Magenta', 'MediumOrchid',
  'BlueViolet', 'DarkViolet', 'DarkOrchid',
  'MediumPurple', 'Lavender', 'Gainsboro', 'LightGray', 'Silver', 'DarkGray', 'Gray',
  'DimGray', 'LightSlateGray', 'DarkSlateGray', 'Black'
];

// Variables
var indicadorColor = document.getElementById('indicador-de-color');
var colorPersonalizado = document.getElementById('color-personalizado');
var gomaBorrar = document.getElementById('goma-de-borrar');
var paleta = document.getElementById('paleta');
var grillaPixeles = document.getElementById('grilla-pixeles');
var mouseApretado = false;
var borrando = false;

// Funciones de la Paleta
colorPersonalizado.addEventListener('change',
  (function() {
    colorActual = colorPersonalizado.value;
    indicadorColor.style.background = colorActual;
    borrando = false;
    manejarBorrador();
  })
);

gomaBorrar.addEventListener('click',
  function() {
    if (borrando)
      borrando = false;
    else
      borrando = true;
    manejarBorrador();
  }
);

function crearPaleta() {
  for (var i = 0; i < nombreColores.length; i++) {
    var divPaleta = document.createElement('DIV');
    divPaleta.className = 'color-paleta';
    divPaleta.style.background =  nombreColores[i];
    paleta.appendChild(divPaleta);
  }
  agregarEventosPaleta();
}

function agregarEventosPaleta() {
  var divsPaleta = document.getElementsByClassName('color-paleta');
  for (var i = 0; i < divsPaleta.length; i++){
    divsPaleta[i].addEventListener('click',function() {
      indicadorColor.style.background = this.style.background;
      colorPersonalizado.value = '#ffffff';
      borrando = false;
      manejarBorrador();
    });
  }
}

// Cargar Grilla
function crearGrilla() {
  for (var i = 0; i <= 1750; i++) {
    var divGrilla = document.createElement('DIV');
    divGrilla.className = 'color-grilla';
    grillaPixeles.appendChild(divGrilla);
  }
  agregarEventosGrilla();
}

function agregarEventosGrilla() {
  var divsGrilla = document.getElementsByClassName('color-grilla');
  for (var i = 0; i < divsGrilla.length; i++){
    divsGrilla[i].addEventListener('click',pintarGrilla);
    divsGrilla[i].addEventListener('mousemove',pintarGrillaMove);
  }
}

// Dibujar sobre Grilla
grillaPixeles.addEventListener('mousedown',
  (function() {
    mouseApretado = true;
  })
);

grillaPixeles.addEventListener('mouseup',
  (function() {
    mouseApretado = false;
  })
);

grillaPixeles.addEventListener('mouseleave',
  (function() {
    if(mouseApretado)
      mouseApretado = false;
  })
);

function pintarGrilla(e) {
  var colorActual;
  if (!borrando)
    colorActual = indicadorColor.style.background;
  else
    colorActual = "white";
  e.target.style.background = colorActual;
}

function pintarGrillaMove(e) {
  if(mouseApretado) {
    pintarGrilla(e);
  }
}

function manejarBorrador() {
  console.log("Borrando: "+borrando);
  if (!borrando) {
    gomaBorrar.className = "boton-desactivado";
    grillaPixeles.className = "cursor-personalizado";
  } else {
    gomaBorrar.className = "boton-activado";
    grillaPixeles.className = "cursor-personalizado-borrador";
    indicadorColor.style.background = "#ffffff";
    colorPersonalizado.value = '#ffffff';
  }
}

// Cargar superhéroes
$("#batman").click(function(){
  cargarSuperheroe(batman);
});

$("#wonder").click(function(){
  cargarSuperheroe(wonder);
});

$("#flash").click(function(){
  cargarSuperheroe(flash);
});

$("#invisible").click(function(){
  cargarSuperheroe(invisible);
});

// Funcionalidad de botones
$("#borrar").click(function(){
  $("#grilla-pixeles div").animate({"background-color":"white"},2000);
});

$("#guardar").click(function(){
  guardarPixelArt();
});

// Inicio
crearPaleta();
crearGrilla();
