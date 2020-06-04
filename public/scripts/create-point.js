function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json() )
    .then( states => {
      for ( state of states ) {
        ufSelect.innerHTML += `<option value=${state.id}>${state.nome}</option>`
      }      
    })
}

populateUFs();

function getCities(event) {
  const citySelect = document.querySelector("[name=city]")
  const stateInput = document.querySelector("[name=state]")

  const ufValue = event.target.value

  const indexOfSelected = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelected].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
  
  citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
  citySelect.disabled = true

  fetch(url)
    .then(res => res.json() )
    .then( cities => {      
      for ( city of cities ) {
        citySelect.innerHTML += `<option value=${city.nome}>${city.nome}</option>`
      }        
      citySelect.disabled = false
    })   

}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)

// Itens de coleta
// pegar todos os li

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("[name=items]")

let selectedItems = [];

function handleSelectedItem(event) {  
  const itemLi = event.target

  // adiciona ou remove a classe do javascript
  itemLi.classList.toggle("selected")

  const itemId = itemLi.dataset.id
  
  const alreadySelected = selectedItems.findIndex( item => item == itemId)

  if (alreadySelected != -1) {
    const filteredItems = selectedItems.filter( item => {
      const itemIsDifferent = item != itemId
      return itemIsDifferent
    })

    selectedItems = filteredItems
  } else {
    selectedItems.push(itemId)
  }
  
  collectedItems.value = selectedItems
}
