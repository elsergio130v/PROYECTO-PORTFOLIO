//El texto cifrado deberá contener sólo letras en mayúscula.
//Reemplazar cada letra por la que sigue según abecedario, excepto Z que se
//deberá reemplazar con la letra A.
//Reemplazar cada dígito encontrado por el siguiente número excepto el 9 que
//deberá ser reemplazado por el 0.
//El carácter blanco no se codifica.

const numELement = document.getElementById("num");
let mensaje = prompt();
let mensaje2 = "";
let maxNum = 57;
let maxLett = 90;
let minNum = 48;
let minLett = 65;

//no entiendo por que no me taransforma el mensaje si paso la variable mensaje por parametro.
pasarAMayusculas();
tranformarCadena();

function pasarAMayusculas() {
    mensaje = mensaje.toUpperCase();
}

function tranformarCadena() {
    let code;
    let b;
    for (var i = 0; i < mensaje.length; i++) {

        if( mensaje.charCodeAt(i)==maxNum){
            b = String.fromCharCode(minNum);
            mensaje2 += b;
        }else if(mensaje.charCodeAt(i)==maxLett){
            b = String.fromCharCode(minLett);
            mensaje2 += b;
        }else{

            code =mensaje.charCodeAt(i) + 1;
            b= String.fromCharCode(code);
            mensaje2 += b;
            console.log(mensaje);   
        }
    }

}

function mostrarMensaje(){
    numELement.innerText = mensaje2;
}

alert(mensaje2);
console.log(mensaje);
console.log("2 "+mensaje2);
mostrarMensaje(); 