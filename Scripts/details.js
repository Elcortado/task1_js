let eventos = data.events;
let query = location.search 
let params = new URLSearchParams(query) 
let id_query = Number(params.get('_id')) 

function defineDetails(detalle) { 
  let cardQuantity = "";
  if (detalle.assistance) { 
    cardQuantity += "Assistance: " + detalle.assistance;
  }
  if (detalle.estimate) {
    cardQuantity += (cardQuantity ? " || " : "") + "Estimate: " + detalle.estimate; 
  }
  let cardDetails = 
      `<div class="col-md-12">
      <img src="${detalle.image}" class="img-fluid rounded-start img-detail" alt="${detalle.name}">
  </div>
  <div class="col-md-12">
      <div class="card-body">
          <h5 class="card-title">${detalle.name}</h5>
          <p class="card-text"><small class="text-muted">${detalle.date}</small></p>
          <p class="card-text">${detalle.description}</p>
          <p class="card-text">Price: $${detalle.price}</p>
          <div class="d-flex justify-content-around">
              <p class="card-text"><small class="text-muted">Category: ${detalle.category}</small></p>
              <p class="card-text"><small class="text-muted">Place:  ${detalle.place}</small></p>
              <p class="card-text"><small class="text-muted">Capacity: ${detalle.capacity}</small></p>
              <p class="card-text"><small class="text-muted"> ${cardQuantity}</small></p>
          </div>
      </div>
  </div>`;
  
  return cardDetails;
}

function printDetalle(id,det,array_events) {
  let container = document.querySelector(id); 
  let dato = array_events.find(each => each._id === det);
  let details = defineDetails(dato); 
  container.innerHTML = details; 
}

printDetalle('#detail', id_query, eventos);
