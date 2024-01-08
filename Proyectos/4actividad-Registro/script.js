let campoUsuario = document.getElementById("usuario");
let campoTfo = document.getElementById("tfo");
let campoPassword = document.getElementById("password");
let campoPasswordConfirm = document.getElementById("passwordConfirm");
let CheckConditions = document.getElementById("checkConditions");
let btnElement = document.getElementById("btn");
let validacionNombre = false;
let validacionTfo = false;
let validacionContrasena = false;
let validacionContrasenaConfirmada = false;
let marcado = false;

//ejecuciones
campoUsuario.addEventListener("blur", validarCampoNombre);
campoTfo.addEventListener("blur", validarTfo);
campoPassword.addEventListener("blur", validarPassword);
campoPasswordConfirm.addEventListener("blur", validarConfirmPassword);
CheckConditions.addEventListener("input", isMarcado);

function validarCampoNombre() {
  //scarrozac01
  let regexNombre = "^[a-zA-Z0-9_]{4,20}$";
  let usuario = campoUsuario.value;
  console.log(usuario);
  if (usuario.match(regexNombre) != null) {
    validacionNombre = true;
    console.log("Nombres y Apellidos Válido");
  } else {
    validacionNombre = false;
  }
  campoUsuario.className = validacionNombre ? "success" : "error";
  habilitarBoton();
}

function validarTfo() {
  //640645251
  let tfo = campoTfo.value;
  validacionTfo = tfo.length == 9 ? true : false;
  campoTfo.className = validacionTfo ? "success" : "error";
  habilitarBoton();
}

function validarPassword() {
  //     Contrasena1
  let password = campoPassword.value;
  let regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  validacionContrasena = password.match(regex) != null ? true : false;
  campoPassword.className = validacionContrasena ? "success" : "error";
  habilitarBoton();
}

function validarConfirmPassword() {
  let password = campoPassword.value;
  let confirm = campoPasswordConfirm.value;
  validacionContrasenaConfirmada = password === confirm ? true : false;
  campoPasswordConfirm.className = validacionContrasenaConfirmada
    ? "success"
    : "error";

  habilitarBoton();
}

function isMarcado() {
  marcado = CheckConditions.checked ? true : false;
  habilitarBoton();
}

function habilitarBoton() {
  if (
    validacionNombre &&
    validacionTfo &&
    validacionContrasena &&
    validacionContrasenaConfirmada &&
    marcado
  ) {
    btnElement.classList.remove("notAvailable");
  } else {
    btnElement.classList = "notAvailable";
  }
}
