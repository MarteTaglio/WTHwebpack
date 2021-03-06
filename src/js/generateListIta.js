"use strict";

// Programmazione a oggetti
//Definisco una classe che utilizzo dopo
import Record from "./lib/RecordIta"

// sintassi es2015 per far caricare una funzione quando si fa IMPORT di questo file
export default function(jsonList) {
  document.getElementById("recordListIta").innerText = "";
  jsonList.forEach(function(recordSettings) {
    // per ogni record creo un nuovo oggetto recordo che aggiungo all'array dichiarato prima
    var record = new Record(recordSettings);
    record.render();
  });
}
