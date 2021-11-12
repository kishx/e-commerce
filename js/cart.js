
const URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
let num = [];
let envio = 0.15;
let currency = "$";
let subtotalGlobal = 0
let credit = false
let bank = false

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      num = resultObj.data.articles;
      showCarrito();
    }
  });
});

var getJSONData = function (url) {
  var result = {};
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      return result;
    });
};


//funcion para actualizar en suma de productos 

function update(id) {
  var x = document.getElementById(id).value;
  document.getElementById("subtotal" + id).innerHTML = x * num[id - 1].unitCost;
  sumaTotal()
  costoFinal()
}


function showCarrito() {
  let html = "";
  for (let i = 0; i < num.length; i++) {

    html = `  
    <tr>

            <th scope="row">${i + 1}</th>

            <td><img src= ${num[i].src} style= "max-width:30%"</td>

            <td> ${num[i].name}</td>
            
            <td><input type="number" min=1 onchange="update(${i + 1});" value="${num[i].count}" name="" id="${i + 1}" /></td>

            <td>${num[i].currency} ${num[i].unitCost}</td>

            <td id="subtotal${i + 1}">UYU ${num[i].count * num[i].unitCost}</td>

          </tr>`;

    document.getElementById("carrito").innerHTML += html;
  }
  sumaTotal()
}

//la suma de los productos

function sumaTotal() {
  let subtotal = 0;
  for (let i = 0; i < num.length; i++) {
    let x = document.getElementById(`${i + 1}`).value;
    subtotal += x * num[i].unitCost;
  }
  document.getElementById("suma").innerHTML = currency + " " + subtotal;
  subtotalGlobal = subtotal
}

//para que salte el tool tip en cvv

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})


//mostrar la tarjeta o cuenta bancaria

function showCredit() {
  let element = document.getElementById("net-banking");
  let credit = document.getElementById("credit-card")

  element.style.display = 'none';
  credit.style.display = 'block';

  credit = true
  bank = false

}

function showBank() {
  let element = document.getElementById("credit-card");
  let credit = document.getElementById("net-banking")

  element.style.display = 'none';
  credit.style.display = 'block';

  bank = true
  credit = false

}






//costo de envio + subtotal

function costoFinal() {
  let total = 0;
  let costoEnvio = 0

  costoEnvio = Math.round(subtotalGlobal * envio);
  total = Math.round(subtotalGlobal + costoEnvio);
  document.getElementById("costoFinal").innerHTML = currency + total;
  document.getElementById("porcentaje").innerHTML = currency + costoEnvio;


}


//los tipos de envio



document.addEventListener("DOMContentLoaded", function (e) {

  document.getElementById("premium").addEventListener("change", function () {
    envio = 0.15;
    costoFinal();
  });

  document.getElementById("express").addEventListener("change", function () {
    envio = 0.07;
    costoFinal();
  });

  document.getElementById("standard").addEventListener("change", function () {
    envio = 0.05;
    costoFinal();
  });

})


function validarCompra() {
  if (validarPagar()) {


    let nombre = document.getElementById("username").value;
    let tarjeta = document.getElementById("cardNumber").value;
    let mes = document.getElementById("month").value;
    let año = document.getElementById("year").value;
    let tip = document.getElementById("year").value;
    let banco = document.getElementById("ccmonth").value;
    let cuenta = document.getElementById("cuentaBank").value;


    if (((nombre !== "") && (tarjeta !== "") && (mes !== "") && (año !== "") && (tip !== "")) || ((banco !== "") && (cuenta !== ""))) {

      alert("La compra se realizó con éxito!")
      window.location.href = "cart.html"
    }
    else {

      alert("Completar forma de pago!")
    }
  }
}



function validarPagar() {
  let calle = document.getElementById("calle").value;
  let numres = document.getElementById("numerores").value;
  let esquina = document.getElementById("esquina").value;
  let pais = document.getElementById("pais").value;
  let premium = document.getElementById("premium").value;
  let express = document.getElementById("express").value;
  let standard = document.getElementById("standard").value;
  

  if ((calle !== "") && (numres !== "") && (esquina !== "") && (pais !== "") && ((premium !== "") || (express !== "") || (standard !== ""))) {
    $("#contidionsModal").modal('show');
    return true
  }
  else {
    
    $("#contidionsModal").modal('hide');
    alert("Debe completar los campos!")
    
    return false;
  }


}

