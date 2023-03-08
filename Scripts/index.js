let eventos = data.events;

let cardsDelEvento = [] 
{
    for (let datos of eventos) { 
               let card = `<div class="card m-2 text-center" style="width:18rem"> 
                <img src="${datos.image}" class="fotos card-img-top" style="height:150px" alt="${datos.name}">
                <div class="card-body d-flex flex-column align-items-center text-center">
                    <h5 class="card-title">${datos.name}</h5>
                    <p class="card-text">${datos.description}</p>
                </div>
                <div class="card-footer d-flex flex-column align-items-center">
                    <small class="text-muted">Price $${datos.price}</small>
                    <a href="./details.html" class="btn btn-outline-secondary">Details</a>
                </div>
            </div>` 
        cardsDelEvento.push(card) 
    }
}

function printEvents() { 
    let card = document.getElementById('insertCards');
    card.innerHTML = cardsDelEvento.join('')
}

printEvents()

function defineDetalle(detalle){ 
   return `<div class="card m-2 text-center" style="width:18rem">
                <img src="${detalle.image}" class="fotos card-img-top" style="height:150px" alt="${detalle.name}">
                <div class="card-body d-flex flex-column align-items-center text-center">
                    <h5 class="card-title">${detalle.name}</h5>
                    <p class="card-text">${detalle.description}</p>
                </div>
                <div class="card-footer d-flex flex-column align-items-center">
                    <small class="text-muted">Price $${detalle.price}</small>
                    <a href="./details.html?_id=${detalle._id}" class="btn btn-outline-secondary">Details</a>
                </div>
            </div>`
}

function printDetalles(id,array_data) { 
  let container = document.querySelector(id);
  array_data = array_data.map(defineDetalle) 
  container.innerHTML = array_data.join('')
}

printDetalles('#insertCards', eventos);

let categorias = []; 

eventos.forEach((each) => { 
  if (!categorias.includes(each.category)) {
    categorias.push(each.category);
  }
});


function printcategoria() { 
  let categ = document.querySelector('#categoryCheck');
  categ.innerHTML = categorias.map((category) => { 
    return `
    <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="${category}" value="${category}">
              <label class="form-check-label" for="${category}">${category}</label>
    </div>
    `;
  }).join('');
}

printcategoria();


let checkboxes = document.querySelectorAll('input[type=checkbox]');


let searchInput = document.querySelector('input[type=search]');


let card = document.getElementById('insertCards');


checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', updateResults);
});

searchInput.addEventListener('input', updateResults);


function updateResults() {
  
  let checkedCategories = Array.from(checkboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  
  let searchTerm = searchInput.value.toLowerCase();

 
  let filteredEvents = eventos.filter((event) => {
    return (
      event.name.toLowerCase().includes(searchTerm) &&
      (checkedCategories.length === 0 || checkedCategories.includes(event.category))
    );
  });

  
  if (filteredEvents.length > 0) {
    let cardsDelEvento = filteredEvents.map((datos) => {
      
      return `<div class="card m-2 text-center" style="width:18rem">
      <img src="${datos.image}" class="fotos card-img-top" style="height:150px" alt="${datos.name}">
      <div class="card-body d-flex flex-column align-items-center text-center">
          <h5 class="card-title">${datos.name}</h5>
          <p class="card-text">${datos.description}</p>
      </div>
      <div class="card-footer d-flex flex-column align-items-center">
          <small class="text-muted">Price $${datos.price}</small>
          <a href="./details.html?_id=${datos._id}" class="btn btn-outline-secondary">Details</a>
      </div>
  </div>`;
    });
    card.innerHTML = cardsDelEvento.join('');
  } else {
    swal("No matches found");
    searchInput.value = ''; 
    setTimeout(() => {      
      location.reload(); 
    }, 2000); 
}
}