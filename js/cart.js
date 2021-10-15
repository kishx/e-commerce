
const URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
let num = [];

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

function update(id) {
  var x = document.getElementById(id).value;
  document.getElementById("subtotal"+id).innerHTML = x*num[id-1].unitCost;
}

function showCarrito() {
  let html = "";
  for (let i=0;i<num.length;i++) {

    html = `  
    <tr>

            <th scope="row">${i+1}</th>

            <td><img src= ${num[i].src} </td>

            <td> ${num[i].name}</td>
            
            <td><input type="number" min=1 onchange="update(${i+1});" value="${num[i].count}" name="" id="${i+1}" /></td>

            <td>${num[i].currency} ${num[i].unitCost}</td>

            <td id="subtotal${i+1}">UYU ${num[i].count * num[i].unitCost}</td>

          </tr>`;

    document.getElementById("carrito").innerHTML += html;
  }
}


