//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function setUser(){
    let nombre = document.getElementById("inputUser").value;
    localStorage.setItem("user", nombre)
  }





function validar(){
    let nombre = document.getElementById("user").value;
    let pass  = document.getElementById("password").value;
    if ((nombre !== "") && (pass !== "")){
      setUser();
      window.location.href = "menu.html"
    }
    else {
      
    alert("Debe completar los campos")
    }
  }
  