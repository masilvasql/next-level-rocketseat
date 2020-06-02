function populateUfs() {
  const ufSelect = document.querySelector("select[name=uf]");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => res.json())
    .then((states) => {
      for (state of states) {
        ufSelect.innerHTML +=
          `<option value = ${state.id}>${state.nome}</option>`;
      }
    });
}

populateUfs();

function getCities(ev) {
  let id = ev.target.value;
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]");
  const indexOfSelectedState = ev.target.selectedIndex;

  stateInput.value = ev.target.options[indexOfSelectedState].text;

  fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`,
  )
    .then((res) => res.json())
    .then((cities) => {
      for (city of cities) {
        citySelect.innerHTML +=
          `<option value = ${city.id}>${city.nome}</option>`;
      }
      citySelect.disabled = false;
    });
}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities);
