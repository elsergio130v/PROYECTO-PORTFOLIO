//recoger la cookie de edit y tomar el valor siguiente a edit,
//despues obtenemos el personaje con
//tner el boton de edit disabled si no lo tenemos marcado como fav 

//quitar el font family al resto salvo a las cartas
//vamos a buscar el personaje en la bd por el ide del propio personaje
import { DatabaseManager } from "./indexedDB.js";
const dbManager = DatabaseManager.getInstance();

let todasLasCookies = document.cookie;
const inputName = document.getElementById("name");
const inputAffiliation = document.getElementById("affiliation");
const inputGender = document.getElementById("gender");
const inputImage = document.getElementById("image");
const inputRace = document.getElementById("race");
const btnActualizar = document.getElementById("actualizar");
const formElement = document.getElementById("form");

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



//ejecucion
personaje = await obtenerPersonaje();
rellenarName(personaje);
rellenarAffiliation(personaje);
rellenarGender(personaje);
rellenarImage(personaje);
rellenarRace(personaje);
btnActualizar.addEventListener("click", function(){
  actualizarBD(personaje);
});
addImage(personaje);





function getValorCookieEdit(){
    let nombre ="edit=";
    let cookiesAlmacenadas = todasLasCookies.split(";");
    for (let i = 0; i < cookiesAlmacenadas.length; i++) {
      
      let cookie = cookiesAlmacenadas[i].trim();
      // Para eliminar los espacios después del ;
      if (cookie.indexOf(nombre) === 0) {
        let valor = cookie.split("=");
        return valor[1];
      }
    }
    return false;
}

async function obtenerPersonaje(){
    if(getValorCookieEdit() !=null){
      let id = getValorCookieEdit();
      try{
        await dbManager.open();
        let personaje = await dbManager.obtenerObjeto(id);
        if(personaje){
          return personaje;
        }else{
          console.log("No se encontró ningún personaje con el id: " + id);
        }
      }catch{
        console.log("error");
      }
    } 
}

function actualizarBD(personaje){
  //obtener los valores de los input
  //y hacer un metodo en idexdb que me cambie el personaje que busco por 
  //su id con el que le paso cambiado los valores. verificamos que los inputs han sido modificados previamente
  if(inputName.value == personaje.name && inputAffiliation.value == personaje.affiliation && 
    inputGender.value == personaje.gender && inputImage.value == personaje.image &&
    inputRace.value == personaje.race){
  }else{
    personaje.name = inputName.value;
    personaje.affiliation = inputAffiliation.value;
    personaje.gender = inputGender.value;
    personaje.image = inputImage.value;
    personaje.race = inputRace.value;
    actualizarPersonajeDB(personaje);

  }

}


function rellenarName(element){
    inputName.value = element.name;
}
function rellenarAffiliation(element){
    inputAffiliation.value = element.affiliation;   
}
function rellenarGender(element){
    inputGender.value = element.gender;   
}
function rellenarImage(element){
    inputImage.value = element.image;    
}
function rellenarRace(element){
    inputRace.value = element.race;  
}

async function actualizarPersonajeDB(personaje){
  try{
    await dbManager.open();
    let actualizado = await dbManager.actualizarPersonaje(personaje);
    if(actualizado){
      console.log("su");
      return true;
    }else{
      console.log("No se encontró ningún personaje con el id: " + personaje.id);
    }
  }catch{
    console.log("error");
  }

}
function addImage(personaje){

      let div = document.createElement('div');
      let img = document.createElement('img');
      img.src = personaje.image;
      img.style.width="250px";
      img.style.height="250px";

      div.appendChild(img);
  
      // Añade el div al cuerpo del documento
      formElement.appendChild(div);
}


