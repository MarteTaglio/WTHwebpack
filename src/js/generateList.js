"use strict";

// Programmazione a oggetti
//Definisco una classe che utilizzo dopo
import Record from "./lib/Record";

// sintassi es2015 per far caricare una funzione quando si fa IMPORT di questo file
export default function(jsonList) {
  document.getElementById("recordList").innerText = "";

  var posizione = 1;

  jsonList.forEach(function(recordSettings) {
    // per ogni record creo un nuvoo oggetto recordo che aggiungo all'array dichiarato prima
    var record = new Record(recordSettings);
    record.settings.posizione = posizione;
    posizione++;
    record.render();
  });
}
