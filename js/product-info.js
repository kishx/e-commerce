var product = {};
var comentarios = []
var puntuacion = 0
var allProducts = []

function showImagesGallery(array) {

    $('.carousel').carousel()

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("productCategory");
            let productCostHTML = document.getElementById("productCost")
            let productCurrencyHTML = document.getElementById("productCurrency")


            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;
            productCostHTML.innerHTML = product.cost
            productCurrencyHTML.innerHTML = product.currency


            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
            setProducts()
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comentarios = resultObj.data;

            showComments()

        }
    });
});


function showComments() {

    let htmlContentToAppend = "";

    for (let i = 0; i < comentarios.length; i++) {
        let comentario = comentarios[i];

        htmlContentToAppend += `
        <div>
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ comentario.user + `</h4>
                            <small class="text-muted">` + stars(comentario.score) + `</small>
                        </div>
                        <p>` + comentario.description + `</p>
                        <p>` + comentario.dateTime + ` </p>
                    </div>
                </div>
            </div>
        </div>
            `
        document.getElementById("comentarios").innerHTML = htmlContentToAppend;
    }
}


function stars(score) {
    var checked = "";
    var unChecked = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= score) {
            checked += `<span class="fa fa-star checked"></span>`
        } else {
            unChecked += `<span class="fa fa-star"></span>`
        }
    }
    var stars = checked + unChecked
    return stars;
}


const ratingStars = [...document.getElementsByClassName("rating__star")];

function rating(stars) {
    const starClassActive = "rating__star fas fa-star";
    const starClassInactive = "rating__star far fa-star";
    const starsLength = stars.length;
    let i;
    stars.map((star) => {
        star.onclick = () => {
            i = stars.indexOf(star);
            puntuacion = i+1

            if (star.className === starClassInactive) {
                for (i; i >= 0; --i) stars[i].className = starClassActive;
            } else {
                for (i; i < starsLength; ++i) stars[i].className = starClassInactive;
            }
        };
    });
}
rating(ratingStars);


function comentar() {
    var usuario = localStorage.getItem("user")
    var fecha = dateActual()
    var texto = document.getElementById("comentarionew").value
    
    let htmlContentToAppend = "";

        htmlContentToAppend = `
        <div>
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ usuario + `</h4>
                            <small class="text-muted">` + stars(puntuacion) + `</small>
                        </div>
                        <p>` + texto + `</p>
                        <p>` + fecha + ` </p>
                    </div>
                </div>
            </div>
        </div>
            `
        document.getElementById("comentarios").innerHTML += htmlContentToAppend;
    
}

function dateActual() {
    let date = new Date();
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let year = date.getFullYear().toString().padStart(2, '0');
    let hour = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let seconds = date.getSeconds().toString().padStart(2, '0');
    let dateTime = `${year}-${month}-${day} ${hour}:${minutes}:${seconds} `;
    return dateTime;

}


function setProducts(){
    getJSONData(PRODUCTS_URL)
    .then(allprod=>{
        allProducts = allprod.data;
        related(product.relatedProducts)
    })
}


function related (array){
    let htmlContentToAppend = " "

    for(let position of array){
        htmlContentToAppend += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="`+ allProducts[position].imgSrc + `" class="img-thumbnail"> </p>
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                        <p> ${allProducts[position].name} </p> 
                            
                        
                        </div>
                        <p> ${allProducts[position].description} </p> 

                    </div>
                </div>
            </div>
        </a>
            `
    }

        
    document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
}

