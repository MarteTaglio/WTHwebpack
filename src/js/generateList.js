// Programmazione a oggetti
class Record {
  constructor(settings) {
    this.settings = settings;
  }

  render() {
    var list = document.getElementById("recordList");

    // TODO migliore generazione dell'elemento
    // ? classi di bulma ?
    // jquery

    var p = document.createElement("p");
    p.innerText = this.settings.canzone;

    list.appendChild(p);
  }
}

// Programmazione funzionale
function RecordFunction(settings) {
  this.settings = settings;

  this.render = function() {
      // ...
  }
}

export default function(jsonList) {
  var recordArray = [];

  document.getElementById("recordList").innerText = "";
  jsonList.forEach(function(record) {
    recordArray.push(new Record(record));
  });

  // TODO: ordina array di record

  recordArray.forEach(record => {
    record.render();
  });
}
