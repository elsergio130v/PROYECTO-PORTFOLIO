const reproduciendo = document.querySelector(".cabecera h1");
const duracion = document.querySelector("#barra");
const aleatorio = document.querySelector("#aleatorio");
const anterior = document.querySelector("#anterior");
const playPause = document.querySelector("#playPause");
const siguiente = document.querySelector("#siguiente");
const bucle = document.querySelector("#bucle");
const tiempo = document.querySelector("#tiempo");
const autor = document.querySelector("#autor");
const nombreCancionP = document.querySelector("#nombreCancion");
const volumen = document.querySelector("#volumen");
let bucleActivo = false;

//creamos los objetos de nustro reproductor
const canciones = [
  {
    nombreCancion: "Hustlers",
    autor: "natos_waor_fernandoCosta",
    ruta: "audio/Natos_y_Waor_HUSTLERS_ft._Fernando_Costa.mp3",
    audio: new Audio("audio/Natos_y_Waor_HUSTLERS_ft._Fernando_Costa.mp3"),
  },
  {
    nombreCancion: "Call Me Spaceman",
    autor: "Hardwell",
    ruta: "audio/Call_Me_a_Spaceman.mp3",
    audio: new Audio("audio/Call_Me_a_Spaceman.mp3"),
  },
  {
    nombreCancion: "Smells Like Teen Spirit",
    autor: "Nirvana",
    ruta: "audio/Smells_Like_Teen_Spirit.mp3",
    audio: new Audio("audio/Smells_Like_Teen_Spirit.mp3"),
  },
];
const lista = document.querySelector("#lista");
let currentAudio = canciones[0].audio;
addDuracion();
addElementsLista();
actulizarBarra();

//este actionListener ejecuta la acciond del boton para la siguiente cancion.

siguiente.addEventListener("click", function () {
  siguienteAudio();
});
//añade a los objetos un atributo duracion, ya que hasta que no se carga el audio del objeto, no se puede.
// me di cuenta que es un poco inutil este metodo ya que la propia api nos proporciona uno.
function addDuracion() {
  canciones.forEach((cancion) => {
    cancion.duracion = cancion.audio.duration;
  });
}

bucle.addEventListener("click", function () {
  funcionBucle();
});

//esta funcion se encarga de añadir los elementos a la lista, y el evento de la lista,
//ya que si uno de los elementos de la lista es pulsado, se reproducira, dicho audio.
function addElementsLista() {
  canciones.forEach((element) => {
    let cancion = document.createElement("a");
    lista.appendChild(cancion);
    cancion.classList.add("cancion");
    let nombreCancion = element.nombreCancion;
    cancion.innerText = nombreCancion;
    cancion.addEventListener("click", function () {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = element.audio;
      currentAudio.play();
      playPause.classList.add("active");
      actulizarBarra();
      reproduciendo.innerText = buscarCancion(currentAudio).nombreCancion;
      autor.innerText = buscarCancion(currentAudio).autor;
      nombreCancionP.innerText = buscarCancion(currentAudio).nombreCancion;
    });
  });
}

//esta funcion, es la encargada de que si clicamos en el boton aleatorio, este
//obtiene un numero aleatorio del min y max de la lista que tenemos y el currentaudio
// pasa a ser el aleatorio, y le da al play
aleatorio.addEventListener("click", function () {
  funcionAleatorio();
});

//funcion encargada de darle el evento click al boton play/pause.
playPause.addEventListener("click", function () {
  if (playPause.classList.contains("active") == true) {
    playPause.classList.remove("active");
    currentAudio.pause();
  } else {
    currentAudio.play();
    playPause.classList.add("active");
    reproduciendo.innerText = buscarCancion(currentAudio).nombreCancion;
    autor.innerText = buscarCancion(currentAudio).autor;
    nombreCancionP.innerText = buscarCancion(currentAudio).nombreCancion;
    actulizarBarra();
  }
});

//este actionListener ejecuta la acciond del boton para la atras cancion
//si el boton play esta activo cambia la camcion y la reproduce, si en cambio,
//este boton no esta activo, cambia la cancion pero no la reproduce.
anterior.addEventListener("click", function () {
  if (playPause.classList.contains("active") == true) {
    playPause.classList.remove("active");
    currentAudio.pause();
    currentAudio.currentTime = 0;
    if (currentAudio == canciones[0].audio) {
      currentAudio = canciones[2].audio;
    } else if (currentAudio == canciones[2].audio) {
      currentAudio = canciones[1].audio;
    } else {
      currentAudio = canciones[0].audio;
    }

    currentAudio.play();
    playPause.classList.add("active");
    reproduciendo.innerText = buscarCancion(currentAudio).nombreCancion;
    autor.innerText = buscarCancion(currentAudio).autor;
    nombreCancionP.innerText = buscarCancion(currentAudio).nombreCancion;
    actulizarBarra();
  } else {
    if (currentAudio == canciones[0].audio) {
      currentAudio = canciones[2].audio;
    } else if (currentAudio == canciones[2].audio) {
      currentAudio = canciones[1].audio;
    } else {
      currentAudio = canciones[0].audio;
    }
    reproduciendo.innerText = buscarCancion(currentAudio).nombreCancion;
    autor.innerText = buscarCancion(currentAudio).autor;
    nombreCancionP.innerText = buscarCancion(currentAudio).nombreCancion;
    actulizarBarra();
  }
});

// esta funcion compara el audio actual con los de la lista para encontar la cancion
//actual y poder utilizar el objeto
function buscarCancion(audio) {
  for (let i = 0; i < canciones.length; i++) {
    if (canciones[i].audio == audio) return canciones[i];
  }
}

function actulizarBarra() {
  currentAudio.addEventListener("timeupdate", function () {
    duracion.max = currentAudio.duration;
    duracion.value = currentAudio.currentTime;
    duracion.value = currentAudio.currentTime;
    var minutes = Math.floor(currentAudio.currentTime / 60);
    var seconds = Math.floor(currentAudio.currentTime - minutes * 60);
    tiempo.innerHTML = minutes + ":" + seconds;
    if (currentAudio.ended) {
      if (bucleActivo) {
        currentAudio.currentTime = 0;
        currentAudio.play();
      } else {
        siguienteAudio();
      }
    }
  });
}

//esta funcion pasa de la cancion actual a la siguiente.
//si el boton play esta activo cambia la camcion y la reproduce, si en cambio,
//este boton no esta activo, cambia la cancion pero no la reproduce.
function siguienteAudio() {
  if (playPause.classList.contains("active") == true) {
    playPause.classList.remove("active");
    currentAudio.pause();
    currentAudio.currentTime = 0;
    if (currentAudio == canciones[2].audio) {
      currentAudio = canciones[0].audio;
    } else if (currentAudio == canciones[0].audio) {
      currentAudio = canciones[1].audio;
    } else {
      currentAudio = canciones[2].audio;
    }

    currentAudio.play();
    playPause.classList.add("active");
    reproduciendo.innerText = buscarCancion(currentAudio).nombreCancion;
    autor.innerText = buscarCancion(currentAudio).autor;
    nombreCancionP.innerText = buscarCancion(currentAudio).nombreCancion;
    actulizarBarra();
  } else {
    if (currentAudio == canciones[2].audio) {
      currentAudio = canciones[0].audio;
    } else if (currentAudio == canciones[0].audio) {
      currentAudio = canciones[1].audio;
    } else {
      currentAudio = canciones[2].audio;
    }
    reproduciendo.innerText = buscarCancion(currentAudio).nombreCancion;
    autor.innerText = buscarCancion(currentAudio).autor;
    nombreCancionP.innerText = buscarCancion(currentAudio).nombreCancion;
    actulizarBarra();
  }
}

duracion.addEventListener('input', function() {
  currentAudio.currentTime = duracion.value;
});


// currentAudio.addEventListener('volumechange', function(){
//     volumen.value = currentAudio.volume;
// });

volumen.addEventListener('input', function(){
  currentAudio.volume = volumen.value;
});




function funcionAleatorio() {
  let aleatorio = Math.floor(Math.random() * 3);
  currentAudio.pause();
  currentAudio.currentTime = 0;
  currentAudio = canciones[aleatorio].audio;
  playPause.classList.add("active");
  currentAudio.play();
  reproduciendo.innerText = buscarCancion(currentAudio).nombreCancion;
  autor.innerText = buscarCancion(currentAudio).autor;
  nombreCancionP.innerText = buscarCancion(currentAudio).nombreCancion;
  actulizarBarra();
}

function funcionBucle() {
  // bucleActivo = bucle.classList.contains("active") ?true :false;
  if (bucle.classList.contains("active")) {
    bucle.classList.remove("active");
    bucleActivo = false;
  } else {
    bucle.classList.add("active");
    bucleActivo = true;
  }
}
