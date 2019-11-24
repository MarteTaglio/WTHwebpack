"use strict";

// SINTASSI ES6 formalmente ES2015

// Importo il mio file di stile scss personale
import "./scss/main.scss";

// Import axios per la chiamata al server whatsthehit
import axios from "axios";
import simpleParallax from "simple-parallax-js";

// Importo un file javascript locale
import generateList from "./js/generateList.js";
import searchIta from "./js/searchIta.js";

function cerca() {
  var inp = document.getElementById("ricerca");
  var value = inp.value;
  var search;
  var option = document.getElementById("song");

  // se l'option è checked
  if (option.checked) {
    // la ricerca è in base alla canzone
    search = {
      from: ["canzone", "artista"],
      select: ["titolo as h1", "nome as artista", "anno", "punteggio"],
      orderby: "punteggio",
      desc: true,
      limit: 50
    };

    search.where = {
      anno: value
    };
  } else {
    //... altrimenti in base all'album
    search = {
      from: ["album", "artista"],
      select: ["titolo as h1", "nome as artista", "anno", "punteggio"],
      orderby: "punteggio",
      desc: true,
      limit: 50
    };

    search.where = {
      anno: value
    };
  }

  // faccio una richiesta ASINCRONA al server di whatsthehit
  axios
    .post("https://whatsthehit.herokuapp.com/api/select", search)
    .then(function(response) {
      // UNA VOLTA CHE LA RICHIESTA è ANDATA A BUON FINE
      generateList(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  function toggleClass() {
    modal.classList.toggle("is-active");
  }

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }

  var modal = document.getElementById("modal");
  var elements = document.getElementsByClassName("toggle-modal");
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", toggleClass);
  }

  var but = document.getElementById("bottone");
  but.addEventListener("click", cerca);

  document.getElementById("ricerca").addEventListener("keypress", e => {
    if (e.keyCode == 13) {
      cerca();
    }
  });

  var butIta = document.getElementById("bottoneIta");
  butIta.addEventListener("click", searchIta);

  //Parallax effect code
  var image = document.getElementsByClassName("thumbnail");
  new simpleParallax(image, {
    scale: 1.4
  });
});
