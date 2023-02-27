document.body.onload = agregarCards;

function agregarCards() {
   
    let fechaActual = new Date(data.currentDate);
    console.log("Fecha Actual: " + fechaActual.toLocaleDateString());

    for (let evento of data.events) {
        let fechaEvento = new Date(evento.date);
        console.log("Fecha Evento: " + fechaEvento.toLocaleDateString());
        if (fechaActual < fechaEvento) {
            console.log("Futuro");
            let card = document.createElement("div");
            card.setAttribute("class", "col");
            card.innerHTML = `<div class="card">
            <img src="${evento.image}" class="card-img-top" alt="${evento.name} Image">
            <div class="card-body">
            <h5 class="card-title">${evento.name}</h5>
            <p class="card-text">${evento.description}</p>
            <div class="d-flex justify-content-between">
            <p>Price: $${evento.price}</p>
            <a href="details.html">see more...</a>
            </div>
            </div>
            </div>`;
            document.getElementById("insertCards").appendChild(card);
        }
    }
}