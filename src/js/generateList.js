"use strict";

import axios from "axios";

// Programmazione a oggetti
//Definisco una classe che utilizzo dopo
class Record {
  // richiamata quando viene definito nuovo  record con NEW
  constructor(settings) {
    this.settings = settings;
  }

  // METODO render
  render() {
    var list = document.getElementById("recordList");

    // TODO migliore generazione dell'elemento
    // ? classi di bulma ?
    // jquery

    // Div esterno
    var ance = document.createElement("div");
    ance.setAttribute("class", "tile is-4 is-parent");

    var box = document.createElement("article");
    box.setAttribute("class", "tile is-child box");

    /*var pos = document.createElement("p");
    pos.setAttribute("class", "title has-text-info");
    pos.innerText = Number(1);*/

    var h1 = document.createElement("h1");
    h1.setAttribute("class", "title has-text-info");
    h1.innerText = this.settings.h1;

    var h2 = document.createElement("h2");
    h2.setAttribute("class", "subtitle");
    h2.innerText = this.settings.artista;

    /* var g = document.createElement("p");
    g.innerText = this.settings.genere; */
    //box.appendChild(pos);
    box.appendChild(h1);
    box.appendChild(h2);
    /* box.appendChild(g); */
    ance.appendChild(box);

    ance.addEventListener("click", () => {
      console.log(this.settings);

      document.getElementById("genere").classList.add("is-loading");

      document.getElementById("modal").classList.toggle("is-active");

      document.getElementById("modalcard").innerText = this.settings.h1;

      document.getElementById("modalContent").innerText = this.settings.artista;

      axios
        .get(
          "https://whatsthehit.herokuapp.com/api/genre?name=" +
            this.settings.artista
        )
        .then(response => {
          this.settings.genere = response.data;
          this.renderGenre(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    });

    list.appendChild(ance);
  }

  renderGenre(genre) {
    document.getElementById("genere").classList.remove("is-loading");
    document.getElementById("genere").innerText = genre;
  }
}

// sintassi es2015 per far caricare una funzione quando si fa IMPORT di questo file
export default function(jsonList) {
  var recordArray = [];

  document.getElementById("recordList").innerText = "";
  jsonList.forEach(function(recordSettings) {
    // per ogni record creo un nuvoo oggetto recordo che aggiungo all'array dichiarato prima
    var record = new Record(recordSettings);
    record.render();

    recordArray.push(record);
  });
}
