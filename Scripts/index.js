const $main = document.getElementById('contenedorCartas')
const url = 'https://mindhub-xj03.onrender.com/api/amazing'
const $contenedorChecks = document.getElementById('checksID') 
const $botonBarraSearch = document.getElementById('botonBuscarTxt2')

fetch(url)
          .then(respuesta => {
          return respuesta.json()
          })
          .then(datos => {
          const datosCards = datos.events

          const listaEventos = datosCards.filter(evento => evento.category)
                                .map(evento => evento.category) 

          const categoriaFiltrada = Array.from( new Set(listaEventos))

           const checkBoxEventos = categoriaFiltrada.reduce( (acumulador, categoria, indice) => {
            return acumulador += `<div class="form-check">
              <input class="form-check-input" type="checkbox" value="${categoria}" id="flexCheck${indice}">
              <label class="form-check-label" for="flexCheck${indice}">
              ${categoria}
              </label>
              </div>`
              },'')

          $contenedorChecks.innerHTML += checkBoxEventos


          $contenedorChecks.addEventListener('change', e =>{
            agregarElementos(filtroCheckBox(datosCards), $main)
          })
          
          $botonBarraSearch.addEventListener('click', e =>{
            agregarElementos(filtroTexto(filtroCheckBox(datosCards)), $main)
          })

          agregarElementos(datosCards, $main)

          })

function filtroCheckBox(listaEventos){
  let seleccionadas = []
  const checkBoxChecked = document.querySelectorAll('input[type="checkbox"]:checked')
  seleccionadas = Array.from(checkBoxChecked).map( elemento => elemento.value)

  if(seleccionadas.length ===0){
    return listaEventos;
  } else {
    return listaEventos.filter( event =>
      seleccionadas.includes(event.category))
  }
}

function filtroTexto(filtroCheckBox){
  const textoEscrito = document.getElementById('textSearch').value.toLowerCase()

  if(textoEscrito === " "){
      return filtroCheckBox
  } else{
      return filtroCheckBox.filter( evento => evento.name.toLowerCase()
        .includes(textoEscrito))
  }
}

function NoCoincidenciaMensaje(){
  mensaje = `<h1>Events not found, please try again!</h1>`
   return mensaje
}

//-----------------------------------------------------------------------

function agregarElementos(datosCards, card){
    let template = '';
    if(datosCards.length === 0){
      card.innerHTML = NoCoincidenciaMensaje()
    } else{
     for(let elemento of datosCards){
        template += crearElemento(elemento);
     }
     card.innerHTML = template;
  }
}


function crearElemento(elemento){
 return `
<div class="card p-3 m-3 d-flex justify-content-start" style="width: 18rem;">
  <img src="${elemento.image}" class="card-img-top" Style="height: 25vh" alt="...">
  <div class="card-body d-flex justify-content-between flex-column">
    <h5 class="card-title">${elemento.name}</h5>
    <p class="card-text">${elemento.description}</p>
    <div class="d-flex justify-content-between align-items-center">
        <p>Price: ${elemento.price} $</p>
        <a href="./details.html?id=${elemento._id}" class="btn btn-secondary">Details</a>
    </div>
  </div>
</div>
    `
}
