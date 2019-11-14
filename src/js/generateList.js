//import axios from "axios";

// Programmazione a oggetti
//Definisco una classe che utilizzo dopo
class Record {
    // richiamata quando viene definito nuovo record con NEW
  constructor(settings) {
    this.settings = settings;
  }

  // METODO render
  render() {
    var list = document.getElementById("recordList");

    // TODO migliore generazione dell'elemento
    // ? classi di bulma ?
    // jquery

    var p = document.createElement("p");
    p.innerText = this.settings.canzone + " - " + this.settings.nome;

    list.appendChild(p);
  }
}

// Programmazione funzionale
/* function RecordFunction(settings) {
  this.settings = settings;

  this.render = function() {
    // ...
  };
} */

// sintassi es2015 per far caricare una funzione quando si fa IMPORT di questo file
export default function(jsonList) {
  var recordArray = [];

  document.getElementById("recordList").innerText = "";
  jsonList.forEach(function(record) {
      // per ogni record creo un nuvoo oggetto recordo che aggiungo all'array dichiarato prima
    recordArray.push(new Record(record));
  });

  // TODO: ordina array di record

  // per ogni record nella LISTA scorro e richiamo console.log sul record
  recordArray.forEach(record => { // sintassi es2015 per la creazione di una funzione anonima
    console.log(record);
    /* axios
      .get(
        "https://whatsthehit.herokuapp.com/api/genre?name=" +
          record.settings.artista
      )
      .then(function(response) {
        record.settings.genere = response.data;
        record.render();
      })
      .catch(function(error) {
        console.log(error);
      }); */
  });
}
