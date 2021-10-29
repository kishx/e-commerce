//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

//mostrar los datos una vez ya guardados en localstorage

document.addEventListener("DOMContentLoaded", function (e) {
    if (localStorage.getItem("info") != null) {
        var datos = JSON.parse(localStorage.getItem("info"))
            document.getElementById("Primnom").value = datos.nombre1;
            document.getElementById("Primape").value = datos.apellido1;
            document.getElementById("Segnom").value = datos.nombre2;
            document.getElementById("Segape").value = datos.apellido2;
            document.getElementById("numtel").value = datos.numero;
            document.getElementById("email").value = datos.email;
    }
});

//funcion para subir imagen

var dzoptions = {
    url: "/",
    autoQueue: false
};
var myDropzone = new Dropzone("div#file-upload", dzoptions);

//funcion para guardar en local storage

function guardar() {
    var info = {
        nombre1: document.getElementById("Primnom").value,
        apellido1: document.getElementById("Primape").value,
        nombre2: document.getElementById("Segnom").value,
        apellido2: document.getElementById("Segape").value,
        numero: document.getElementById("numtel").value,
        email: document.getElementById("email").value,
    }
    localStorage.setItem("info", JSON.stringify(info));
}