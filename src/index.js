// Importo il mio file di stile scss personale
import "./scss/main.scss";

// Import axios per la chiamata al server whatsthehit
import axios from "axios";

function fetchTest() {
  // ? se sei in locale occorre inserire URL intero con https
  // ? test di inserimento in whatsthehit
  // ? nella cartella WHATSTHEHIT /api/select
  axios
    .post("https://whatsthehit.herokuapp.com/api/select", {
      from: ["canzone", "artista"],
      select: ["titolo as canzone", "nome as artista"],
      where: {
        anno: "1980"
      },
      orderby: "punteggio",
      desc: true,
      limit: 50
    })
    .then(function(response) {
      document.body.innerText = JSON.stringify(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
}

document.getElementById("bottone").addEventListener("click", fetchTest);

document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

});


var modal = document.getElementById('modal');
  var elements = document.getElementsByClassName('toggle-modal');
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', toggleClass);
  }

  function toggleClass() {
    modal.classList.toggle('is-active');
  }