if('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('/addhomes/sw.js')
           .then(function() { console.log('Service Worker Registered'); });
}

// Código para manejar la solicitud de instalación en el escritorio

let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
  // Evita que Chrome 67 y versiones anteriores muestren automáticamente el aviso
  e.preventDefault();
  // Guarda el evento para que pueda activarse más tarde.
  deferredPrompt = e;
  // Actualizar la interfaz de usuario para notificar al usuario que puede agregar a la pantalla de inicio
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', (e) => {
    // Oculta nuestra interfaz de usuario que muestra nuestro botón A2HS.
    addBtn.style.display = 'none';
    // Mostrar el aviso
    deferredPrompt.prompt();
    // Espere a que el usuario responda a la pregunta
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });
});



(function (i, s, o, g, r, a, m) {
i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
  (i[r].q = i[r].q || []).push(arguments)
}, i[r].l = 1 * new Date();
  a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
  a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})
  (window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-64663506-1', 'auto');
ga('send', 'pageview');

var map, todasLasCapturas, extorsion, secuestro, otrosDelitos ;
 
function initMap() {
  map = new google.maps.Map(document.getElementById("map"),  {
    zoom: 10,
    zoomControl: false,
    scaleControl: false,
   
    
   
    streetViewControl: true,
    
    fullscreenControl: false,
    
    gestureHandling: 'greedy',   
    

    /* center: { lat: 6.1409, lng: -75.4112 }, */
   
        center: { lat: 6.105243, lng: -75.350567 },

    mapTypeId: google.maps.MapTypeId.SATELLITE,

    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
    
      
      

      //mapTypeIds: ["",'']

  
   
    },
    zoomControl:true,
    zoomControlOptions: {
      style:google.maps.ZoomControlStyle.DEFAULT,
      /* style:google.maps.backgroundColor = 'red',
      style:google.maps.border = '20px solid #fff',
      style:google.maps.borderRadius = '3px', */
  }
    
  });

   
  
  var img = (src = "ico/./marke.ico");
  marker = new google.maps.Marker({
    map: map,
    icon: img,
    title: 'Gaula Oriente !',
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: { lat: 6.126014, lng: -75.409273 }
  });
  marker.addListener('click', toggleBounce);


function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}
  
   todasLasCapturas = new google.maps.visualization.HeatmapLayer({
    data: pointsTodasLasCapturas(),
    /* map: map */
  });

  secuestro = new google.maps.visualization.HeatmapLayer({
    data: pointsSecuestro(),
    //map: map
  });

  extorsion = new google.maps.visualization.HeatmapLayer({
    data: pointsExtorsion(),
    //map: map
  });

  otrosDelitos = new google.maps.visualization.HeatmapLayer({
    data: pointsOtrosDelitos(),
    //map: map
  });
}

// Funcion para activar el mapa de calor
function activarMapaCalor(className) {
  todasLasCapturas.setMap(todasLasCapturas.getMap() ? null : map);

  var div5 = document.getElementsByClassName("cantidadSecuestro");
  var div6 = document.getElementsByClassName("cantidadExtorsion");
  var div7 = document.getElementsByClassName("cantidadOtros");
  var div8 = document.getElementsByClassName("cantidadTotal");

  if (div7[0].style.display == "none") {
    div6[0].style.display = "none";
    div5[0].style.display = "none";
    div8[0].style.display = "none";

  } else {
    div6[0].style.display = "none";
    div5[0].style.display = "none";
    div7[0].style.display = "none";
    div8[0].style.display = "none";

  }
}

// Funcion para cambiar el color del mapa de color
function cambiarGradiente() {
  var gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ]
  todasLasCapturas.set('gradient', todasLasCapturas.get('gradient') ? null : gradient);
  secuestro.set('gradient', secuestro.get('gradient') ? null : gradient);
  extorsion.set('gradient', extorsion.get('gradient') ? null : gradient);
  otrosDelitos.set('gradient', otrosDelitos.get('gradient') ? null : gradient);
}

// Funcion para cambiar el tamaño de la macha de calor
function cambiarTamaño() {
  todasLasCapturas.set('radius', todasLasCapturas.get('radius') ? null : 20);
  secuestro.set('radius', secuestro.get('radius') ? null : 20);
  extorsion.set('radius', extorsion.get('radius') ? null : 20);
  otrosDelitos.set('radius', otrosDelitos.get('radius') ? null : 20);
}

// Funcion para cambiar la opacidad del mapa de calor
function cambiarOpacidad() {
  todasLasCapturas.set('opacity', todasLasCapturas.get('opacity') ? null : 0.4);
  secuestro.set('opacity', secuestro.get('opacity') ? null : 0.4);
  extorsion.set('opacity', extorsion.get('opacity') ? null : 0.4);
  otrosDelitos.set('opacity', otrosDelitos.get('opacity') ? null : 0.4);
}

// Funcion para mostrar los points de las capturas por extorsion
function capturasExtorsion(className) {
  extorsion.setMap(extorsion.getMap() ? false : map);
  secuestro.setMap(null);
  otrosDelitos.setMap(null);

  var map1 = document.getElementById("capturasExtorsion");
  var map2 = document.getElementById("capturasSecuestro");
  var map3 = document.getElementById("capturasOtros");

  if (map1 == 'block') {
    map2 = 'none';
    map1 = 'block';
  } else {
    map2 = 'block';
    map1 = 'none';
    map3 = "none";
  }

  var div1 = document.getElementsByClassName('cantidadSecuestro');
  var div2 = document.getElementsByClassName('cantidadExtorsion');
  var div7 = document.getElementsByClassName("cantidadOtros");

  if (div2[0].style.display == 'block') {
    div2[0].style.display = 'none';
    div1[0].style.display = 'block';
  } else {
    div2[0].style.display = 'block';
    div1[0].style.display = 'none';
    div7[0].style.display = "none";
  }
}

// Funcion para mostrar los points de las capturas por secuestro
function capturasSecuestro(className) {
  secuestro.setMap(secuestro.getMap() ? null : map);
  extorsion.setMap(null);
  otrosDelitos.setMap(null);

  var div4 = document.getElementsByClassName("cantidadSecuestro");
  var div3 = document.getElementsByClassName("cantidadExtorsion");
  var div7 = document.getElementsByClassName("cantidadOtros");

  if (div4[0].style.display == "block") {
    div4[0].style.display = "none";
    div3[0].style.display = "block";
  } else {
    div4[0].style.display = "block";
    div3[0].style.display = "none";
    div7[0].style.display = "none";
  }
}

// Funcion para mostrar los points de las capturas por otros delitos
function capturasOtrosDelitos(className) {
  otrosDelitos.setMap(otrosDelitos.getMap() ? null : map);
  extorsion.setMap(null);
  secuestro.setMap(null);

  var div5 = document.getElementsByClassName("cantidadSecuestro");
  var div6 = document.getElementsByClassName("cantidadExtorsion");
  var div7 = document.getElementsByClassName("cantidadOtros");

  if (div7[0].style.display == "block") {
    div6[0].style.display = "none";
    div5[0].style.display = "block";
  } else {
    div6[0].style.display = "none";
    div5[0].style.display = "none";
    div7[0].style.display = "block";

  }
}

// Funcion para mostrar los points de todas las capturas
function todasLasCapt(className) {
  todasLasCapturas.setMap(todasLasCapturas.getMap() ? null : map);
  extorsion.setMap(null);
  secuestro.setMap(null);
  otrosDelitos.setMap(null);

  var div5 = document.getElementsByClassName("cantidadSecuestro");
  var div6 = document.getElementsByClassName("cantidadExtorsion");
  var div7 = document.getElementsByClassName("cantidadOtros");
  var div8 = document.getElementsByClassName("cantidadTotal");

  if (div7[0].style.display == "block") {
    div6[0].style.display = "block";
    div5[0].style.display = "block";
    div8[0].style.display = "block";

  } else {
    div6[0].style.display = "block";
    div5[0].style.display = "block";
    div7[0].style.display = "block";
    div8[0].style.display = "block";
  }
}

