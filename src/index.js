import "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
require("./mystyles.scss");
const axios = require('axios').default;

function fetchTest() {
  // TODO se sei in locale occorre inserire URL intero con https
  // ? test di inserimento in whatsthehit
  // ! nella cartella WHATSTHEHIT /api/select 
axios.post('https://whatsthehit.herokuapp.com/api/select', {
  "from": ["canzone", "artista"],
  "select": ["titolo as canzone", "nome as artista",],
  "where": {
    "anno": "1980"
  },
  "orderby": "punteggio",
  "desc": true,
  "limit":50
  })
  .then(function (response) {
    document.body.innerText = JSON.stringify(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}

document.getElementById("bottone").addEventListener("click", fetchTest);

