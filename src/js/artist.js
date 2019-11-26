"use strict";

import axios from "axios";

import generateListArtist from "./generateListArtist.js";

export default function searchArt() {
  var inp = document.getElementById("artist");
  var value = inp.value;

  var search;

  search = {
    from: ["canzone", "artista"],
    select: ["titolo as h1", "nome", "anno", "punteggio"],
    orderby: "punteggio",
    desc: true,
    limit: 50
  };

  search.where = {
    nome: value
  };

  // faccio una richiesta ASINCRONA al server di whatsthehit
  axios
    .get("https://whatsthehit.herokuapp.com/api/select", search)
    .then(function(response) {
      // UNA VOLTA CHE LA RICHIESTA è ANDATA A BUON FINE
      generateListArtist(response.data);
      console.log(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
}
