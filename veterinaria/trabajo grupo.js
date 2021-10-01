const LIST_URL = "https://api.npoint.io/89dfbc7824a6ef5ba341"

fetch(LIST_URL)

    .then(respuesta => respuesta.json())

    .then(array => {

        let htmlContentToAppend = "";
        for (let i = 0; i < array.length; i++) {
            let category = array[i];

            htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <h4 class="mb-1">`+ category.nombre + `</h4>
                </div>
                <div class="col-3">
                    <h4 class="mb-1">`+ `precio:` + category.precio + `</h4>
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ category.descripcion + `</h4>
                        </div>
                        <div class="col-3">
                        <h4 class="mb-1">`+ `Disponibilidad:` + category.disponible + `</h4>
                    </div>
                    <br>
                </div>
            </div>
        </div>
        `
            document.getElementById("main").innerHTML = htmlContentToAppend
        }
    }
    )


    