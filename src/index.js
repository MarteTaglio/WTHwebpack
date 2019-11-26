"use strict";

// SINTASSI ES6 formalmente ES2015

// Importo il mio file di stile scss personale
import "./scss/main.scss";

// Import axios per la chiamata al server whatsthehit
import axios from "axios";
import simpleParallax from "simple-parallax-js";

import utils from "./js/utils.js";
import generateList from "./js/generateList.js";
import searchIta from "./js/searchIta.js";
import searchArt from "./js/artist.js";
import generateRandom from "./js/generateRandom.js";

function WTHSearch(json) {
  axios
    .post("https://whatsthehit.herokuapp.com/api/select", json)
    .then(function(response) {
      generateList(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function cerca() {
  var inpDiv = document.getElementById("cerca");
  var inp = document.getElementById("ricerca");
  var value = inp.value;
  var option = document.getElementById("song");
  var but = document.getElementById("bottone");

  if (value < 1900 || value > 2016) {
    /* if (value == 1900) {
      document.classList
    } else if (value == 2016) {
  
    } */

    utils.setInputError(inp, inpDiv, but, "Inserisci un anno corretto");
  } else {
    utils.removeInputError(inp, inpDiv, but);

    var search;

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

    WTHSearch(search);
  }
}

function random (){
var search;
      search = {
        from: ["canzone", "artista"],
        select: ["titolo as h1", "nome as artista", "anno"],
        orderby: "rand",
        desc: true,
        limit: 1
      };
      // faccio una richiesta ASINCRONA al server di whatsthehit
    axios
      .post("https://whatsthehit.herokuapp.com/api/select", search)
      .then(function(response) {
        // UNA VOLTA CHE LA RICHIESTA è ANDATA A BUON FINE
        generateRandom(response.data);
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

random();

function setupBurgerMenu() {
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
}

/* var recordList = [];
 */
document.addEventListener("DOMContentLoaded", () => {
  setupBurgerMenu();

  var modal = document.getElementById("modal");

  var bottoniChiusuraModali = document.getElementsByClassName("toggle-modal");
  for (var i = 0; i < bottoniChiusuraModali.length; i++) {
    bottoniChiusuraModali[i].addEventListener("click", () => {
      modal.classList.toggle("is-active");
    });
  }

  //ricerca anni bottone
  var but = document.getElementById("bottone");
  but.addEventListener("click", cerca);
  //ricerca anni invio
  document.getElementById("ricerca").addEventListener("keypress", e => {
    if (e.keyCode == 13) {
      cerca();
    }
  });
  
  //ricerca artista bottone
  var butArt = document.getElementById("botArt");
  butArt.addEventListener("click", searchArt);
  //ricerca artista invio
  document.getElementById("artist").addEventListener("keypress", e => {
    if (e.keyCode == 13) {
      searchArt();
    }
  });

  //ricerca italia bottone
  var butIta = document.getElementById("bottoneIta");
  butIta.addEventListener("click", searchIta);
  //ricerca italia invio
  document.getElementById("ricita").addEventListener("keypress", e => {
    if (e.keyCode == 13) {
      searchIta();
    }
  });

  //Parallax effect code
  var image = document.getElementsByClassName("thumbnail");
  new simpleParallax(image, {
    scale: 1.4
  });
});
