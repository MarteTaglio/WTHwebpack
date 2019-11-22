"use strict";

import axios from "axios";

//import generateList from "./generateList.js";

export default function searchIta() {
  var input = document.getElementById("ricita");
  var valueita = input.value;
  var search;

    search = {
      from: ["artisti_italia"],
      select: ["titolo", "artista", "anno"],
      orderby: "posizione",
      desc: true,
      limit: 30
    };

    search.where = {
      anno: valueita
    };
  } 

  // faccio una richiesta ASINCRONA al server di whatsthehit
  axios
    .post("https://whatsthehit.herokuapp.com/api/select", search)
    .then(function(response) {
      // UNA VOLTA CHE LA RICHIESTA è ANDATA A BUON FINE
      //generateListIta(response.data);
      console.log(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });


var butIta = document.getElementById("bottoneIta");
butIta.addEventListener("click", searchIta);