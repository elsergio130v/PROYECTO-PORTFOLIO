const bodyElement = document.getElementById('body');




//let posicionInicio = [numAle(min,), anchuraPx];
var alturaMax = window.getComputedStyle(bodyElement).maxHeight;
var anchuraMax = window.getComputedStyle(bodyElement).maxWidth;
let anchuraMaxNum = parseInt(anchuraMax);
let intervaloCreacionElementos = 2;
let timeDead = 20;
console.log(posicionAleatoriaAncho(anchuraMaxNum));
console.log(posicionAleatoriaAncho(anchuraMaxNum).toString()+"px");
console.log();
crearEmoji();
let crearElemento = setInterval(crearEmoji, 1000);
let cuentaAtras = setInterval(moverElemento,1000); 


function posicionAleatoriaAncho(max){
    return Math.floor( Math.random()*(max+1));
}

function moverElemento(parrafo){
    let posicion = 54;
    posicion = parseInt(parrafo.style.top) + posicion;
    parrafo.style.top = posicion.toString()+"px";
    console.log(parrafo.style.top);
}



function crearEmoji(){
    //creamos un elemento 
    let parrafo = document.createElement('p');
    parrafo.classList.add("elemento");
    parrafo.innerHTML ="🍒";
    let inicioAncho = posicionAleatoriaAncho(anchuraMaxNum).toString();
    parrafo.style.left = inicioAncho+"px";
    parrafo.style.top = "0px";
    bodyElement.appendChild(parrafo);
    let posicion;
    
    //añadior el elemento arriba
    bodyElement.insertBefore(parrafo, bodyElement.firstChild);

    let cuentaAtras = setInterval(moverElemento,1000,parrafo); 
    function moverElemento(){
        let posicion = 54;
        let top = parseInt(parrafo.style.top);
        posicion = top + posicion;
        parrafo.style.top = posicion.toString()+"px";
        console.log(parrafo.style.top);
    }
    
    console.log(posicion);

    //con la siguiente funcion, le establecemos un tiempo de vida
    //que serian 10s por eso 10 por 1000ms, ya que 1000ms es un segundo, 
    //lo multiplicamos por los segundos que queremos
    setTimeout(function(){
        bodyElement.removeChild(parrafo);
        
},timeDead*1000);
    return parrafo;
}
 