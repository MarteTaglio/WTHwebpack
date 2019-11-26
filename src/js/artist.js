"use strict";

import axios from "axios";

import generateListArtist from "./generateListArtist.js";
import utils from "./utils.js";

export default function searchArt() {
  var inpDiv = document.getElementById("cercartista");
  var inp = document.getElementById("artist");
  var but = document.getElementById("botArt");
  var value = inp.value;

  if (value < 1947 || value > 2016) {
    /* if (value == 1900) {
      document.classList
    } else if (value == 2016) {
  
    } */

    utils.setInputError(inp, inpDiv, but, "Inserisci un anno corretto");
  } else {
    utils.removeInputError(inp, inpDiv, but);

    var search;

    search = {
      from: ["canzone", "artista"],
      select: ["titolo as h1", "nome as artista", "anno", "punteggio"],
      orderby: "punteggio",
      desc: true,
      limit: 50
    };

    search.where = {
      nome: value
    };

    // faccio una richiesta ASINCRONA al server di whatsthehit
    axios
      .post("https://whatsthehit.herokuapp.com/api/select", search)
      .then(function(response) {
        // UNA VOLTA CHE LA RICHIESTA è ANDATA A BUON FINE
        generateListArtist(response.data);
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}
