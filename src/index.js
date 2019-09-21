import "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
const axios = require('axios').default;

function fetchTest() {
axios.post('https://whatsthehit.herokuapp.com/api/select', {
  "from": "canzone",
  "select": "titolo",
  "where": {
    "anno": "1980"}
  })
  .then(function (response) {
    document.body.innerText = JSON.stringify(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}

document.getElementById("bottone").addEventListener("click", fetchTest);

