const INDEXDB_NAME = "Dragon_ball";
const INDEXDB_VERSION = 1;
const STORE_NAME = "Favoritos";

// Patrón Singleton: Una instancia para todo el proyecto
export class DatabaseManager {
  counter = 1;

  constructor(databaseName, databaseVersion) {
    this.databaseName = databaseName;
    this.databaseVersion = databaseVersion;
    this.db = null;
  }

  // Static: Para garantizar que el método getInstance pertenezca a la clase DatabaseManager en sí y no a las instancias individuales de la clase.
  // Si no fuera static, se podrían crear diferentes instancias de DatabaseManager, cada una con su propia "this.instance"
  static getInstance() {
    if (!this.instance) {
      this.instance = new DatabaseManager(INDEXDB_NAME, INDEXDB_VERSION);
    }
    return this.instance;
  }

  open() {
    return new Promise((resolve, reject) => {
      let request = indexedDB.open(this.databaseName, this.databaseVersion);
      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve();
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };

      request.onupgradeneeded = (event) => {
        let db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const objectStore = db.createObjectStore(STORE_NAME, {
            keyPath: "id",
            autoIncrement: true,
          });
        }
      };
    });
  }

  addData(data) {
    if (!this.db) {
      throw new Error("La base de datos no está abierta.");
    }

    return new Promise((resolve, reject) => {
      let transaction = this.db.transaction([STORE_NAME], "readwrite");
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

  getData(id) {
    if (!this.db) {
      throw new Error("La base de datos no está abierta.");
    }

    return new Promise((resolve, reject) => {
      let transaction = this.db.transaction([STORE_NAME], "readonly");
      let objectStore = transaction.objectStore(STORE_NAME);
      let request = objectStore.get(id);

      request.onsuccess = (event) => {
        let data = event.target.result;
        if (data) {
          resolve(data);
        } else {
          reject(
            new Error(
              "El objeto con el id: " +
                id +
                ", no se encontró en la base de datos."
            )
          );
        }
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }

  // Actividad: Hacer el método delete, update y getAll()


  delete(id) {
    console.log("hola delete");
    return new Promise((resolve, reject) => {
      let transaction = this.db.transaction([STORE_NAME], 'readwrite');
      let objectStore = transaction.objectStore(STORE_NAME);
      let request = objectStore.delete(id);
  
      request.onsuccess = () => {
        // console.log("resolve");
        resolve();
      };
  
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }


  update(data, id) {
    if (!this.db) {
      throw new Error("La base de datos no está abierta.");
    }

    return new Promise((resolve, reject) => {
      let transaction = this.db.transaction([STORE_NAME], "readwrite");
      let objectStore = transaction.objectStore(STORE_NAME);
      let request = objectStore.put(id);

      request.onsuccess = (event) => {
        let data = event.target.result;
        if (data) {
          resolve(data);
        } else {
          reject(
            new Error(
              "El objeto con el id: " +
                id +
                ", no se encontró en la base de datos."
            )
          );
        }
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    });

  }


   //
  //prueba
  buscarYEliminarObjeto(objetoAEliminar) {
    if (!this.db) {
      throw new Error("La base de datos no está abierta.");
    }
    return new Promise((resolve, reject) => {
    var transaction = this.db.transaction([STORE_NAME], 'readwrite');
    var store = transaction.objectStore(STORE_NAME);
    var request = store.openCursor();
  
    request.onsuccess = (event) => {
      var cursor = event.target.result;
      if (cursor) {
        var objetoEnDB = cursor.value;
        let personaje = objetoEnDB.personaje;
        // en este metodo, lo que hacemos es hacer un cursor, que es una especie de bucle en este caso,
        //ya que si no encuentra la coincidencia del objeto, pregunta al siguiente hasta que cursor es null
        //por que se sale de rango. cogemos ese objeto y escogemos el personaje, ya que es lo que necesitamos para
        //comparar un objeto con otro.
       
        if (personaje.id === objetoAEliminar.id) {
          cursor.delete();
          // console.log("Objeto encontrado y eliminado");
        } else {
          cursor.continue();
        }
      } else {
        // console.log("Objeto no encontrado");
      }
      resolve();
    };
  
    request.onerror = (event) => {
      // console.log("Error al buscar el objeto: " + event.target.errorCode);
      reject();
    };
  });
  }

  buscarObjeto(element) {
    if (!this.db) {
      return Promise.reject(new Error("La base de datos no está abierta."));
    }
  
    return new Promise((resolve, reject) => {
      var transaction = this.db.transaction([STORE_NAME], 'readonly');
      var store = transaction.objectStore(STORE_NAME);
      var request = store.openCursor();
  
      request.onsuccess = (event) => {
        var cursor = event.target.result;
        if (cursor) {
          var objetoEnDB = cursor.value;
          let personaje = objetoEnDB.personaje;
         
          if (personaje.id === element.id) {
            // console.log("Objeto encontrado");
            resolve(true);
          } else {
            cursor.continue();
          }
        } else {
          // console.log("Objeto no encontrado");
          resolve(false);
        }
      };
  
      request.onerror = (event) => {
        // console.log("Error al buscar el objeto: " + event.target.errorCode);
        reject(new Error("Error al buscar el objeto: " + event.target.errorCode));
      };
    });
  }

  obtenerObjeto(id) {
    if (!this.db) {
      return Promise.reject(new Error("La base de datos no está abierta."));
    }
  
    return new Promise((resolve, reject) => {
      var transaction = this.db.transaction([STORE_NAME], 'readonly');
      var store = transaction.objectStore(STORE_NAME);
      var request = store.openCursor();
  
      request.onsuccess = (event) => {
        var cursor = event.target.result;
        if (cursor) {
          var objetoEnDB = cursor.value;
          let personaje = objetoEnDB.personaje;
         
          if (personaje.id == id) {
            console.log("Objeto encontrado");
            resolve(personaje);
          } else {
            cursor.continue();
          }
        } else {
          // console.log("Objeto no encontrado");
          resolve(false);
        }
      };
  
      request.onerror = (event) => {
        // console.log("Error al buscar el objeto: " + event.target.errorCode);
        reject(new Error("Error al buscar el objeto: " + event.target.errorCode));
      };
    });
  }

  actualizarPersonaje(element){
    if (!this.db) {
      return Promise.reject(new Error("La base de datos no está abierta."));
    }
  
    return new Promise((resolve, reject) => {
      var transaction = this.db.transaction([STORE_NAME], 'readwrite');
      var store = transaction.objectStore(STORE_NAME);
      var request = store.openCursor();
  
      request.onsuccess = (event) => {
        var cursor = event.target.result;
        if (cursor) {
          var objetoEnDB = cursor.value;
          let personaje = objetoEnDB.personaje;
         console.log(element.id);
          if (personaje.id === element.id) {
            console.log("Objeto encontrado");
            objetoEnDB.personaje = element;
            var updateRequest = store.put(objetoEnDB);
            updateRequest.onsuccess = () => {
              console.log("Objeto actualizado con éxito");
              resolve(true);
            };
            updateRequest.onerror = (event) => {
              console.log("Error al actualizar el objeto: " + event.target.errorCode);
              reject(new Error("Error al actualizar el objeto: " + event.target.errorCode));
            };
          } else {
            cursor.continue();
          }
        } else {
          // console.log("Objeto no encontrado");
          resolve(false);
        }
      };
  
      request.onerror = (event) => {
        // console.log("Error al buscar el objeto: " + event.target.errorCode);
        reject(new Error("Error al buscar el objeto: " + event.target.errorCode));
      };
    });
    
    }
   
  
}
