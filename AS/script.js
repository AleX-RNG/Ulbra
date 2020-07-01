// fetch dos estados
const selectStates = document.querySelector("#states");

function populateStateSelect() {
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => res.json())
    .then((states) => {
      states.sort((a, b) => (a.nome < b.nome ? -1 : a.nome === b.nome ? 0 : 1));
      states.map((nome) => {
        const option = document.createElement("option");
        option.textContent = nome.nome;
        selectStates.appendChild(option);
      });
    });
}
populateStateSelect();

// fetch das cidades
const selectCities = document.querySelector("#cities");

function populateCitieSelect() {
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/municipios")
    .then((res) => res.json())
    .then((cities) => {
      cities.sort((a, b) => a.nome.localeCompare(b.nome));
      cities.map((nome) => {
        const option = document.createElement("option");
        option.textContent = nome.nome;

        selectCities.appendChild(option);
      });
    });
}
populateCitieSelect();

// loop p/ previnir submit
(function () {
  "use strict";
  window.addEventListener(
    "load",
    function () {
      var forms = document.getElementsByClassName("needs-validation");
      var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    false
  );
})();

// restrição de input
function setInputFilter(textbox, inputFilter) {
  [
    "input",
    "keydown",
    "keyup",
    "mousedown",
    "mouseup",
    "select",
    "contextmenu",
    "drop"
  ].forEach(function (event) {
    textbox.addEventListener(event, function () {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}

// ativacao dos filtros
setInputFilter(document.getElementById("ceptextbox"), function (value) {
  return /^-?\d*[-]?\d*$/.test(value);
});