import axios from "axios";
import searchYouTube from "youtube-api-search";
import wiki from "wikijs";

export default class Record {
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

      this.renderYT();
      this.renderWiki();
    });

    list.appendChild(ance);
  }

  renderYT() {
    const API_KEY = "AIzaSyCIg1kM6x9ISrl_fXtlq6e0ayrqVFJHGt8";

    searchYouTube(
      { key: API_KEY, term: this.settings.h1, maxResults: 1 },
      videos => {
        console.log(videos);
        var iframe = document.getElementById("searchYTchart");
        iframe.src = "https://www.youtube.com/embed/" + videos[0].id.videoId;
      }
    );
  }

  renderWiki() {
    wiki({ apiUrl: "https://it.wikipedia.org/w/api.php" })
      .page(this.settings.artista)
      .then(page => {
        console.log(page);
        return page.summary();
      })
      .then(summary => {
        console.log(summary);
      });
  }

  renderGenre(genre) {
    document.getElementById("genere").classList.remove("is-loading");
    document.getElementById("genere").innerText = genre;
  }
}
