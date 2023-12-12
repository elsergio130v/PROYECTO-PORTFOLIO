const url = "https://dragonball-api.com/api/transformations";
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
};


//proceso ejecucion 
request(url);



//funciones
async function request(url) {
  var response = await fetch(url);
  var data = await response.json();
  completarPersonajes(data);
  console.log(data);
  addCards();
  return data;
}

//en esta funcion tras haber hecho el fetch si todo va bien, rellenamos un objeto con el personajes data,
//que es el json del fetch. tenemos nuestra lista personajes de objetos personaje para manejar lo que queramos. 
function completarPersonajes(data){
  data.forEach(element => {
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

function addCards(){
  personajes.forEach(element  => {

    let div = document.createElement("div");
    let classes = "col-10 col-sm-6 col-md-4 col-lg-3 col-xl-2 bg-white text-dark card";
    div.classList.add(...classes.split(" "));
    div.id = element.id;
    div.innerHTML = '<img src="'+element.image+'" class="card-img-top" alt="...">'+
    '<div class="card-body">'+
     '<h5 class="card-title">'+element.name+'</h5>'+
      '<p class="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>'+
      '<div class="row gap-3 justify-content-center">'+
      '<a href="#" class="btn btn-primary mg w-75 col border-0 "><i class="far far fa-heart"></i></a>'+
      '<a href="" class="btn btn-primary mg w-75 col border-0 " value="'+element.id+'">editar</a>'+
      '<div>'+
    '</div>'; 
    contenedor.appendChild(div);

  });
}


