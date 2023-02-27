document.body.onload = agregarCards;

function agregarCards() {

    for (let evento of data.events) {
        let card = document.createElement("div");
        card.setAttribute("class", "col");
        card.innerHTML = `<div class="card">
                            <img src="${evento.image}" class="card-img-top" alt="${evento.name} Image">
                            <div class="card-body">
                                <h5 class="card-title">${evento.name}</h5>
                                <p class="card-text">${evento.description}</p>
                                <div class="d-flex justify-content-around">
                                    <p>Price: $${evento.price}</p>
                                    <a href="details.html">see more...</a>
                                </div>
                            </div>
                        </div>`;
        document.getElementById("insertCards").appendChild(card);
    }
}