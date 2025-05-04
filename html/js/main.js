let btnLoad = document.getElementById("btnLoad");
const apiUrl = "https://api.escuelajs.co/api/v1/products";
const cajaProds = document.getElementById("cajaProds");

btnLoad.addEventListener("click", function(event){
    event.preventDefault();

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al obtener los productos");
        }
        return response.json();
    })
    .then(data => {
        cajaProds.innerHTML = '';

        data.slice(0, 9).forEach(product => {
            cajaProds.insertAdjacentHTML("beforeend", `
                <div class="col-md-4">
                 <div class="card mb-4 shadow-sm">
                 <img src="${product.images[1] || product.images[0]}" class="card-img-top" alt="${product.title}" >
                     <div class="card-body">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="card-text fw-bold">$${product.price}</p>
                        </div>
                    </div>
                </div>
            `);
        });
    })
    .catch(error => {
        cajaProds.innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
    });
});