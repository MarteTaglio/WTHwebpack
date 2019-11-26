"use strict";

import axios from "axios";

import generateListIta from "./generateListIta.js";
import utils from "./utils.js";

export default function searchIta() {
  var inpDiv = document.getElementById("cercaita");
  var inp = document.getElementById("ricita");
  var but = document.getElementById("bottoneIta");
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
    from: ["artisti_italia"],
    select: ["titolo", "artista", "anno", "posizione"],
    orderby: "posizione",
    desc: false,
    limit: 50
  };

  search.where = {
    anno: value
  };

  // faccio una richiesta ASINCRONA al server di whatsthehit
  axios
    .post("https://whatsthehit.herokuapp.com/api/select", search)
    .then(function(response) {
      // UNA VOLTA CHE LA RICHIESTA è ANDATA A BUON FINE
      generateListIta(response.data);
      console.log(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
}

}
