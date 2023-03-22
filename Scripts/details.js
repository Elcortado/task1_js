const detailCard = document.querySelector('#detailCard');
const queryString = location.search;
const params = new URLSearchParams(queryString);
const id= params.get("id");
function detailsCard(event,place){
    let card = '';
    card += `
    <div class="text-center card card-d d-flex justify-content-center mx-4 bg-section-1">
    <div class="row align-items-center">
        <div class="col-md-6">
            <img src="${event.image}" alt="${event.name}" class="img-fluid rounded img-w">
        </div>
        <div class="col-md-6 py-4">
            <h2 class="card-title">${event.name}</h2>
            <h4 class="card-text">${event.description}</h4>
            <h6 class="card-subtitle mb-2 text-muted">Placce: ${event.place}</h6>
            </div>
            </div>
            </div>
            `

    place.innerHTML = card;
}


let eventsFetched = '';
async function getData(){
    //fetch('./API.json')
    await fetch('https://mindhub-xj03.onrender.com/api/amazing').then(response => response.json()).then(datosApi => {
      eventsFetched = datosApi;
      const detailEvent = eventsFetched.events.find(event => event._id === parseInt(id));
      detailsCard(detailEvent,detailCard);
    }).catch(error => console.log(error.message))
    }

getData();