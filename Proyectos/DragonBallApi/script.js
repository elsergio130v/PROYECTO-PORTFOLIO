const url = "https://dragonball-api.com/api/characters?limit=1000";
const contenedor = document.getElementById("contenedor");
const mainElement = document.getElementById("main");
const botonDespliegue = document.getElementById("menuDesplegable");
const favoritosElement = document.getElementById("favoritos");


//indexDB
import { DatabaseManager } from "./indexedDB.js";
const dbManager = DatabaseManager.getInstance();
let favoritos = [];
let personajes = [];
let personaje = {
  affiliation: "",
  deletedAt: "",
  description: "",
  gender: "",
  id: 0,
  image: "",
  ki: "",
  maxKi: "",
  name: "",
  race: "",
};

//proceso ejecucion
request(url);
activeNavA();
eventoDespliegueNav();
addEventFavoritosNav();
// console.log(favoritos);

//funciones
async function request(url) {
  var response = await fetch(url);
  var data = await response.json();
  completarPersonajes(data.items);
  addCards();

  return data.items;
}

//en esta funcion tras haber hecho el fetch si todo va bien, rellenamos un objeto con el personajes data,
//que es el json del fetch. tenemos nuestra lista personajes de objetos personaje para manejar lo que queramos.
function completarPersonajes(data) {
  data.forEach((element) => {
    let personaje = {};
    personaje.affiliation = element.affiliation;
    personaje.deletedAt = element.deletedAt;
    personaje.description = element.description;
    personaje.gender = element.gender;
    personaje.id = element.id;
    personaje.image = element.image;
    personaje.ki = element.ki;
    personaje.maxKi = element.maxKi;
    personaje.name = element.name;
    personaje.race = element.race;
    personajes.push(personaje);
  });
}

async function addCards() {
  personajes.forEach(async (element) => {

    let div = document.createElement("div");
    let classes =
      "col-10 col-sm-6 col-md-4 col-lg-3 col-xl-2 bg-white text-dark card";
    div.classList.add(...classes.split(" "));
    div.id = element.id;
    div.innerHTML =
      '<img src="' +
      element.image +
      '" class="card-img-top ' +
      element.race +
      '" alt="...">' +
      '<div class="card-body mt-3"">' +
      '<h5 class="card-title">' +
      element.name +
      "</h5>" +
      '<p class="card-text"><span">KI: ' +
      element.ki +
      "</span></p>" +
      '<p class="card-text"><span">RAZA: ' +
      element.race +
      "</span></p>" +
      '<div class="row gap-3 justify-content-center">' +
      '<a class="btn btn-primary mg w-75 col border-0 " id ="mga' +
      element.id +
      '"><i id="mg' +
      element.id +
      '" class="far fa-heart"></i></a>' +
      '<a id="edit' +
      element.id +
      '" class="btn btn-primary mg w-75 col border-0 disabled" value="' +
      element.id +
      '">editar</a>' +
      "<div>" +
      "</div>";
    contenedor.appendChild(div);
    // let mgElement = document.getElementById("mg"+element.id);
    let mgElement = document.getElementById("mga" + element.id);
    addEventListenerMgButttons(mgElement, element);
    let editElement = document.getElementById("edit" + element.id);
    addEventListenerEdit(editElement, element);
    try {
      let existsInDB = await existeEnDb(element);

      if (existsInDB) {
        let clas1 = "far fa-heart";
        let clas2 = "fas fa-heart";
        let child = document.getElementById("mg" + element.id);
        child.classList.remove(...clas1.split(" "));
        child.classList.add(...clas2.split(" "));
        actualizarFavoritos(element);
        let editElement = document.getElementById("edit"+element.id);
        editElement.classList.remove("disabled");
      }
    } catch (error) {
      console.error("Error al verificar en la base de datos: " + error);
    }
  });
}

// funcionalidad, cuando hago hover que el color de la sombra sea referente a la raza del personaje

function addEventListenerMgButttons(mgElement, element) {
  let clas1 = "far fa-heart";
  let clas2 = "fas fa-heart";
  let child = document.getElementById("mg" + element.id);
  //tenemos que hacer que cuando ocurra
  mgElement.addEventListener("click", () => {
    if (child.classList.contains("far")) {
      child.classList.remove(...clas1.split(" "));
      child.classList.add(...clas2.split(" "));

      //previamente a addPersonaje, tenemos que comprobar si ya existe en la indexdb.

      //tenemos que hacer que cuando ocurra esta parte del if se añada a index db
      addPersonajeMg(element);
      //actualizamos la lista de favoritos
      actualizarFavoritos(element);
    } else if (child.classList.contains("fas")) {
      child.classList.remove(...clas2.split(" "));
      child.classList.add(...clas1.split(" "));
      //en esta linea hacemos que dicho elemento lo eliminamos de la indexdb
      deletePersonajeMg(element);
    }
  });
}

// function addEventEditButton(element){
//   let editElement = document.getElementById("edit");
//   editElement.addEventListener("click", () =>  {
//       window.location.href = "";
//       setCookie(element.id);
// });
// }

function setCookieEdit(id) {
  document.cookie = "edit =" + id;
}

function activeNavA() {
  let transformaciones = document.getElementById("transformaciones");
  // let favoritos = document.getElementById("favoritos");

  let lista = [transformaciones, favoritosElement];
  lista.forEach((element) => {
    element.addEventListener("click", () => {
      if (element.classList.contains("activado")) {
        element.classList.remove("activado");
      } else {
        element.classList.add("activado");
      }
    });
  });
}

function eventoDespliegueNav() {
  let botonDespliegue = document.getElementById("menuDesplegable");
  botonDespliegue.addEventListener("click", margenNavbar);
}

//funciona, pero tiene dos fallos, ya que no entra en la mediaquery una vez sae pulsa el boton
// y si se pulsa y volvemos a la ventana completa se queda el margin top
function margenNavbar() {
  console.log("entro");
  if (botonDespliegue.ariaExpanded == "true") {
    mainElement.style.marginTop = "150px";
    mainElement.classList.add("animacion-main");
  } else {
    mainElement.style.marginTop = "0px";
  }
}
function addPersonajeMg(element) {
  dbManager
    .open()
    .then(() => {
      let data = { personaje: element };
      dbManager
        .addData(data)
        .then(() => {
          console.log("añadido");
          let editElement = document.getElementById("edit"+element.id);
          editElement.classList.remove("disabled");
        })
        .catch((error) => {
          console.error("Error addData: " + error);
        });
    })
    .catch((error) => {
      console.error("Error open: " + error);
    });
}

function deletePersonajeMg(element) {
  dbManager
    .open()
    .then(() => {
      dbManager
        .buscarYEliminarObjeto(element)
        .then(() => {
          console.log("eliminado");
          let editElement = document.getElementById("edit"+element.id);
          editElement.classList.add("disabled");
        })
        .catch((error) => {
          console.error("Error buscarYEliminarObjeto: " + error);
        });
    })
    .catch((error) => {
      console.error("Error open: " + error);
    });
}

async function existeEnDb(element) {
  try {
    await dbManager.open();
    const objetoEncontrado = await dbManager.buscarObjeto(element);

    if (objetoEncontrado) {
      // console.log("Objeto encontrado");
      return true;
    } else {
      // console.log("Objeto no encontrado");
      return false;
    }
  } catch (error) {
    // console.error("Error: " + error);
    return false;
  }
}

function actualizarFavoritos(element) {
  let personaje = element;
  favoritos.push(personaje);
}

// function openDB_DomCargado() {
//   dbManager.open();
// }

function addEventFavoritosNav() {
  favoritosElement.addEventListener("click", SoloMostrarFavoritos);
}

async function SoloMostrarFavoritos() {
  if (favoritosElement.classList.contains("activado")) {
    let elementosEliminar = document.querySelectorAll('.card');
    elementosEliminar.forEach((elemento) => {
      elemento.remove();
    });
    console.log("eliminar");
    await addCardsFavoritas();
  } else {
    let elementosEliminar = document.querySelectorAll('.card');
    elementosEliminar.forEach((elemento) => {
      elemento.remove();
    });
    addCardsNormales();
    console.log("introducir");
  }
}


async function addCardsFavoritas() {
  favoritos.forEach(async (element) => {
    //addEventeditButton(element);

    let div = document.createElement("div");
    let classes =
      "col-10 col-sm-6 col-md-4 col-lg-3 col-xl-2 bg-white text-dark card";
    div.classList.add(...classes.split(" "));
    div.id = element.id;
    div.innerHTML =
      '<img src="' +
      element.image +
      '" class="card-img-top ' +
      element.race +
      '" alt="...">' +
      '<div class="card-body mt-3"">' +
      '<h5 class="card-title">' +
      element.name +
      "</h5>" +
      '<p class="card-text"><span">KI: ' +
      element.ki +
      "</span></p>" +
      '<p class="card-text"><span">RAZA: ' +
      element.race +
      "</span></p>" +
      '<div class="row gap-3 justify-content-center">' +
      '<a class="btn btn-primary mg w-75 col border-0 " id ="mga' +
      element.id +
      '"><i id="mg' +
      element.id +
      '" class="far fa-heart"></i></a>' +
      '<a id="edit' +
      element.id +
      '" class="btn btn-primary mg w-75 col border-0 " value="' +
      element.id +
      '">editar</a>' +
      "<div>" +
      "</div>";
    contenedor.appendChild(div);
    // let mgElement = document.getElementById("mg"+element.id);
    let mgElement = document.getElementById("mga" + element.id);
    addEventListenerMgButttons(mgElement, element);
    let editElement = document.getElementById("edit" + element.id);
    addEventListenerEdit(editElement, element);
    try {
      let existsInDB = await existeEnDb(element);

      if (existsInDB) {
        let clas1 = "far fa-heart";
        let clas2 = "fas fa-heart";
        let child = document.getElementById("mg" + element.id);
        child.classList.remove(...clas1.split(" "));
        child.classList.add(...clas2.split(" "));

      }
    } catch (error) {
      console.error("Error al verificar en la base de datos: " + error);
    }
  });
}

async function addCardsNormales() {
  personajes.forEach(async (element) => {
    //addEventeditButton(element);

    let div = document.createElement("div");
    let classes =
      "col-10 col-sm-6 col-md-4 col-lg-3 col-xl-2 bg-white text-dark card";
    div.classList.add(...classes.split(" "));
    div.id = element.id;
    div.innerHTML =
      '<img src="' +
      element.image +
      '" class="card-img-top ' +
      element.race +
      '" alt="...">' +
      '<div class="card-body mt-3"">' +
      '<h5 class="card-title">' +
      element.name +
      "</h5>" +
      '<p class="card-text"><span">ki: ' +
      element.ki +
      "</span></p>" +
      '<p class="card-text"><span">RAZA: ' +
      element.race +
      "</span></p>" +
      '<div class="row gap-3 justify-content-center">' +
      '<a class="btn btn-primary mg w-75 col border-0 " id ="mga' +
      element.id +
      '"><i id="mg' +
      element.id +
      '" class="far fa-heart"></i></a>' +
      '<a id="edit' +
      element.id +
      '" class="btn btn-primary mg w-75 col border-0 " value="' +
      element.id +
      '">editar</a>' +
      "<div>" +
      "</div>";
    contenedor.appendChild(div);
    // let mgElement = document.getElementById("mg"+element.id);
    let mgElement = document.getElementById("mga" + element.id);
    addEventListenerMgButttons(mgElement, element);
    let editElement = document.getElementById("edit" + element.id);
    addEventListenerEdit(editElement, element);
    try {
      let existsInDB = await existeEnDb(element);

      if (existsInDB) {
        let clas1 = "far fa-heart";
        let clas2 = "fas fa-heart";
        let child = document.getElementById("mg" + element.id);
        child.classList.remove(...clas1.split(" "));
        child.classList.add(...clas2.split(" "));
        
      }
    } catch (error) {
      console.error("Error al verificar en la base de datos: " + error);
    }
  });
}

function addEventListenerEdit(editElement, element){
  editElement.addEventListener("click", () => {
    setCookieEdit(element.id);
    // let ruta = window.location.href;
    window.location.href = "edit.html";
    // console.log(ruta);
    
    //la idea es que solo tengamos una cookie que es la que vamos a utilizar, 
    //una vez se modifique dicho objeto se eliminara y pasaremos a index.html
  });

}