const url = "https://dragonball-api.com/api/characters";
const contenedor = document.getElementById("contenedor");
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
  transformations: [
    // { id: "", name: 1, image:"", ki:"", deletedAt:"" },
    // { nombre: "objeto2", valor: 2 },
  ],
  originalPlanet: {
    id: "valor1",
    name: "valor2",
    isDestroyed:false,
    description:"",
    image:"",
    deletedAt:""
  }
};


//proceso ejecucion 
request(url);
console.log(personajes[1]);
activeNavA();



//funciones
async function request(url) {
    let contador = 1;
    let bandera = true;
    while(bandera){
        let contadorletter = "/"+contador.toString();
        var response = await fetch(url+contadorletter);
        var data = await response.json();
        console.log(data);
        contador++;
        if(!response.ok || data == undefined){
            bandera =false;
            console.log(url+contadorletter)
        }else{
            completarPersonajes(data);
        }
    }
    console.log(contador);
    addCards();
  return data.items;
}

//en esta funcion tras haber hecho el fetch si todo va bien, rellenamos un objeto con el personajes data,
//que es el json del fetch. tenemos nuestra lista personajes de objetos personaje para manejar lo que queramos. 
function completarPersonajes(data){
  //data.forEach(element => {
    let personaje = {}; 
      personaje.affiliation = data.affiliation;
      personaje.deletedAt = data.deletedAt;
      personaje.description = data.description;
      personaje.gender = data.gender;
      personaje.id = data.id;
      personaje.image = data.image;
      personaje.ki = data.ki;
      personaje.maxKi = data.maxKi;
      personaje.name = data.name;
      personaje.race = data.race;
      personajes.push(personaje);
  //});
}

function addCards(){
  personajes.forEach(element  => {
    //addEventeditButton(element);

    let div = document.createElement("div");
    let classes = "col-10 col-sm-6 col-md-4 col-lg-3 col-xl-2 bg-white text-dark card";
    div.classList.add(...classes.split(" "));
    div.id = element.id;
    div.innerHTML = '<img src="'+element.image+'" class="card-img-top '+element.race+'" alt="...">'+
    '<div class="card-body mt-3"">'+
     '<h5 class="card-title">'+element.name+'</h5>'+
     '<p class="card-text"><span">ki: '+element.ki+'</span></p>'+
      '<div class="row gap-3 justify-content-center">'+
      '<a class="btn btn-primary mg w-75 col border-0 " id ="mga'+element.id+'"><i id="mg'+element.id+'" class="far fa-heart"></i></a>'+
      '<a href="" id="edit'+element.id+'" class="btn btn-primary mg w-75 col border-0 " value="'+element.id+'">editar</a>'+
      '<div>'+
    '</div>'; 
    contenedor.appendChild(div);
    // let mgElement = document.getElementById("mg"+element.id);
    let mgElement = document.getElementById("mga"+element.id);
    addEventListenerMgButttons(mgElement, element.id);

  });
}

// funcionalidad, cuando hago hover que el color de la sombra sea referente a la raza del personaje



function addEventListenerMgButttons(mgElement, id) {
  let clas1 = "far fa-heart";
  let clas2 = "fas fa-heart";
  let child = document.getElementById("mg"+id);
//tenemos que hacer que cuando ocurra 
    mgElement.addEventListener("click", () =>  {
        if(child.classList.contains("far")){
          child.classList.remove(...clas1.split(" "));
          child.classList.add(...clas2.split(" "));
            console.log("clic");
            //establecemos la cookie con el id que nos viene , seria del personaje.
            setCookie(id);
            //tenemos que hacer que cuando ocurra esta parte del if se añada a index db

          }else if(child.classList.contains("fas")){
            child.classList.remove(...clas2.split(" "));
            child.classList.add(...clas1.split(" "));
          //en esta linea hacemos que dicho elemento lo eliminamos de la indexdb
          }
       });
  
}

// function addEventeditButton(element){
//   let editElement = document.getElementById("edit");
//   editElement.addEventListener("click", () =>  {
//       window.location.href = "";
//       setCookie(element.id);
// });
// }


function setCookie(id) {
  document.cookie = "id ="+id;
}


function activeNavA(){
    let transformaciones = document.getElementById("transformaciones"); 
    let favoritos = document.getElementById("favoritos"); 
    
    let lista = [transformaciones,favoritos];
    lista.forEach(element => {
        element.addEventListener("click", () => {
            element.classList.add("activado");
        });
    });
}
