const btnAdd = document.getElementById("add");
const btnDelete = document.getElementById("delete");
const bodyElement = document.body;


const INDEXDB_NAME = "Bloc_Notas";
const INDEXDB_VERSION = 1;
const STORE_NAME = "notas";

let db = null;
let counter = 1;
let contador = document.getElementsByClassName("notas").length+1;

let valorNota = {
  cadena:"",
  id:"",
};

openDB();


eventoDelBotonAdd();
eventoDelBotonDelete();


// if(notes) {
//     notes.forEach(note => addDivNota(note));
    
// }


function eventoDelBotonAdd(){
if (btnAdd!=null)
btnAdd.addEventListener("click", function(e) {
    addDivNota();   
});
}

// funcion que añade el elemento al boto de delete all
// coge la lista de todos los div con la clase nota,
// como es una html collection la pasamos a un array y luego,
// ya la podemos recorrer con un for each, por el contrario no entra al foreach.
function eventoDelBotonDelete(){
    if (btnDelete!=null)
    btnDelete.addEventListener("click", function(event) {

        let allNotes = document.getElementsByClassName("notas"); 
        Array.from(allNotes).forEach(function(note) {
            note.remove();
        });
        updateNotas();
    });
    }


//preguntar por esta entrada del objeto, ya que parece que la igualas a una cadena vacia pero no.
function addDivNota(note = "") {
  console.log(note);
    let div = document.createElement("div");
    let topBarNota = document.createElement("div");
    let textArea = document.createElement("textarea");
    bodyElement.appendChild(div);
    div.classList.add("notas");
    div.id = contador;
    div.appendChild(topBarNota);
    topBarNota.classList.add("topbar");
    //boton eliminar
    let elim = document.createElement('button');
    elim.innerHTML ="eliminar";
    elim.id = "borrar";
    elim.addEventListener("click",() => { eventoEliminar (div )});
    topBarNota.appendChild(elim);
    div.appendChild(textArea);
    textArea.classList.add("text");
    textArea.id ="txt";
    textArea.value=note;
    let valorNota = {};
    textArea.addEventListener('blur', function(event) {
      valorNota.cadena = textArea.value;
      valorNota.id = contador;
      // console.log(contador);
      if(div.id == contador){
        addData(valorNota.cadena);
        console.log("if"+contador);
      }else{
        
        console.log("else"+contador);
          updateNotas(valorNota.cadena);
        }

        
    });
    contador++;
}




function eventoEliminar( div) {
  var id = "#"+div.id;
  let textArea = document.querySelector(id>"#txt");
  console.log(textArea);
  updateNotas(textArea.value);
    div.remove();
}

function openDB() {
    // Promesa para manejar operaciones asíncronas
    return new Promise((resolve, reject) => {
  
      // Solicitud para abrir la base de datos
      let request = indexedDB.open(INDEXDB_NAME, INDEXDB_VERSION);
  
      // Evento que indica que la base de datos está lista.
      request.onsuccess = (event) => {
        // Referencia a la BD
        db = event.target.result;
        console.log("foreach");
        // Indica que la promesa se completó con éxito
        let transaction = db.transaction([STORE_NAME], "readonly");
        let objectStore = transaction.objectStore(STORE_NAME);
        let notes = objectStore.getAll();
        notes.onsuccess = function(e) {
            // Obtenemos el array de valores
            var notas = e.target.result;
            console.log("h"+notas);
            // cogemos el array y creamos las notas que ya existen en la base de datos
            if(notas) {
              notas.forEach(note => addDivNota(note))  
          }
          };
        // console.log(notes);
        resolve();
      };
  
      // Evento que indica que apertura ha fallado.
      request.onerror = (event) => {
        // Indica que la promesa falló
        reject(event.target.error);
      };
  
      // Evento que se activa cuando la versión cambia o se crea por primera vez
      request.onupgradeneeded = (event) => {
        db = event.target.result;
  
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          // Crea un almacen de objetos (tabla), campo id como clave primaria y autoincremental
          let objectStore = db.createObjectStore(STORE_NAME, {autoIncrement: true });
        }
      };

    });
  }

function addData(data) {
    if (!db) {
      throw new Error("La base de datos no está abierta.");
    }
  
    return new Promise((resolve, reject) => {
      let transaction = db.transaction([STORE_NAME], "readwrite");
      let objectStore = transaction.objectStore(STORE_NAME);
      let request = objectStore.add(data);
      request.onsuccess = (event) => {
        resolve();

      };
  
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }


function updateNotas(data){
  if (!db) {
    throw new Error("La base de datos no está abierta.");
  }

  return new Promise((resolve, reject) => {
    let transaction = db.transaction([STORE_NAME], "readwrite");
    let objectStore = transaction.objectStore(STORE_NAME);
    let request = objectStore.put(data);
    console.log(data);
    request.onsuccess = (event) => {
      resolve();
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

