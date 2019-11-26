import axios from "axios";
import Record from "./Record";
import searchYouTube from "youtube-api-search";
import wiki from "wikijs";

export default class RecordIta extends Record {
  render() {
    var list = document.getElementById("recordListIta");

    // Div esterno
    var ance = document.createElement("div");
    ance.setAttribute("class", "tile is-3 is-parent");

    var box = document.createElement("article");
    box.setAttribute("class", "tile is-child box");

    var pos = document.createElement("p");
    pos.setAttribute("class", "title");
    pos.innerText = this.settings.posizione;

    var h1 = document.createElement("h2");
    h1.setAttribute("class", "title is-4 has-text-info");
    h1.innerText = this.settings.titolo;

    var h2 = document.createElement("h3");
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
        this.settings.posizione + " - " + this.settings.artista;

      this.renderYT();

      this.renderWiki();

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

  renderYT() {
    const API_KEY = "AIzaSyCIg1kM6x9ISrl_fXtlq6e0ayrqVFJHGt8";

    searchYouTube(
      {
        key: API_KEY,
        term: this.settings.titolo + this.settings.artista,
        maxResults: 1
      },
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
        document.getElementById("modalContent").innerText = summary;
      });
      
  }

  renderGenre(genre) {
    document.getElementById("genere").classList.remove("is-loading");
    document.getElementById("genere").innerText = genre;
  }
}