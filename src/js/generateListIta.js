
// Programmazione a oggetti
//Definisco una classe che utilizzo dopo
class Record {
  // richiamata quando viene definito nuovo  record con NEW
  constructor(settings) {
    this.settings = settings;
  }

  // METODO render
  render() {
    var list = document.getElementById("recordListIta");

    // Div esterno
    var ance = document.createElement("div");
    ance.setAttribute("class", "tile is-4 is-parent");

    var box = document.createElement("article");
    box.setAttribute("class", "tile is-child box");

    var pos = document.createElement("p");
    pos.setAttribute("class", "title");
    pos.innerText = this.settings.posizione;

    var h1 = document.createElement("h1");
    h1.setAttribute("class", "title has-text-info");
    h1.innerText = this.settings.titolo;

    var h2 = document.createElement("h2");
    h2.setAttribute("class", "subtitle");
    h2.innerText = this.settings.artista;

    box.appendChild(pos);
    box.appendChild(h1);
    box.appendChild(h2);
    ance.appendChild(box);

    ance.addEventListener("click", () => {
      console.log(this.settings);

      document.getElementById("modal").classList.toggle("is-active");

      document.getElementById("modalcard").innerText =
        this.settings.posizione + " " + " - " + " " + this.settings.titolo;

      document.getElementById("modalContent").innerText = this.settings.artista;

    });

    list.appendChild(ance);
  }

}

// sintassi es2015 per far caricare una funzione quando si fa IMPORT di questo file
export default function(jsonList) {
  var recordArray = [];

  document.getElementById("recordListIta").innerText = "";
  jsonList.forEach(function(recordSettings) {
    // per ogni record creo un nuvoo oggetto recordo che aggiungo all'array dichiarato prima
    var record = new Record(recordSettings);
    record.render();

    recordArray.push(record);
  });
}
