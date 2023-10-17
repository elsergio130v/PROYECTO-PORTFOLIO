var img = document.createElement('img');
const diasElement = document.getElementById('dias');
const hoursElement = document.getElementById('horas');
const minsElement = document.getElementById('min');
const secondsElement = document.getElementById('seg');
const upcomingImg = document.getElementById('upcoming-img');
const fondoImg = document.getElementById('fondos');

const diaEstacionPriVer = 21;
const diaEstacionOtoño = 23;
const diaEstacionInvierno = 22;
const mesEstacionPrimavera = 3;
const mesEstacionVerano = 6;
const mesEstacionOtono = 9;
const mesEstacionInvierno = 12;

let birthdias = new Date("2024-09-03");
let totalSeg,dias,horas,min,segundos;


let dive = document.createElement("div");

document.body.appendChild(dive);

let countdownInterval = setInterval(cuentaAtras, 1000);
cuentaAtras();

function cuentaAtras() {
    var fechaActual = new Date();
    if (fechaActual.getMonth) {
      
    }
    totalSeg = (birthdias - fechaActual) / 1000;    
  
    // Condición para comprobar si ha llegado la hora establecida
    if (Math.floor(totalSeg) <= 0) {
      showProduct();
      secondsElement.innerHTML = 0;
      return;
    }
  
    //Para saber el equivalente de 1 segundo - dias se dividen los segundos entre 86400 
    // o entre 3600 y luego entre 24
    //Para saber el equivalente de 1 segundo - horas se dividen los segundos entre 3600
    //Para saber el equivalente de 1 segundo - minutos se dividen los segundos entre 60
  
    dias = Math.floor(totalSeg / 3600 / 24);
    horas = Math.floor(totalSeg / 3600) % 24;
    min = Math.floor(totalSeg / 60) % 60;
    segundos = Math.floor(totalSeg) % 60;



  
    diasElement.innerHTML =" Dias - " +dias;
    hoursElement.innerHTML = "  Horas - "+horas;
    minsElement.innerHTML = " min - " + min;
    secondsElement.innerHTML = " sec - "+segundos;
    comprobarEstacion();
  };
  
  function showProduct() {
    clearInterval(countdownInterval);
  }

  function comprobarEstacion() {  
    var diaActual =  new Date();
    var dia = diaActual.getDate();
    var mes = diaActual.getMonth()+1;
    var mesCumple = birthdias.getMonth()+1;
    var diaCumple = birthdias.getDate();

    let estacion = '';

    if ((mes == 3 && dia >= 21) || (mes > 3 && mes < 6) || (mes == 6 && dia < 21)) {
        console.log("Primavera");
        document.body.style.backgroundImage = "url('img/primavera.jpg')";
        optimizartImg();
      } else if ((mes == 6 && dia >= 21) || (mes > 6 && mes < 9) || (mes == 9 && dia < 22)) {
        console.log("Verano");
        document.body.style.backgroundImage = "url('img/verano.jpg')";
        optimizartImg();
      } else if ((mes == 9 && dia >= 22) || (mes > 9 && mes < 12) || (mes == 12 && dia < 21)) {
        console.log("Otoño");
        document.body.style.backgroundImage = "url('img/otono.jpg')";
        optimizartImg();
        
      } else {
      console.log("invierno");
      document.body.style.backgroundImage = "url('img/invierno.jpg')";
      optimizartImg();
    }if (mes == mesCumple && dia == diaCumple) {
      showProduct();
    
    console.log("dia: " + dia+" mes: " + mes);
    


  }
}

function optimizartImg(){
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundAttachment = 'fixed';

}
  function showProduct(){
    clearInterval(countdownInterval);
  var img = document.createElement('img');
  img.src = 'img/cumple.jpg';
  document.body.appendChild(img);
  }
