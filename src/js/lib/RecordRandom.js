import searchYouTube from "youtube-api-search";

export default class Record {
  // richiamata quando viene definito nuovo  record con NEW
  constructor(settings) {
    this.settings = settings;
  }

  // METODO render
  render() {
    var list = document.getElementById("random");

    // Div esterno
    var t1 = document.createElement("div");
    t1.setAttribute("class", "tile is-4 is-vertical is-parent");

    var t2 = document.createElement("div");
    t2.setAttribute("class", "tile is-child");

    var tit = document.createElement("h1");
    tit.setAttribute("class", "title has-text-white");
    tit.innerText = "Una Canzone per te!";

    var p = document.createElement("p");
    p.setAttribute("class", "has-text-white");
    p.innerText = "Con la nostra web app avrai l'opportunità di ascoltare una canzone diversa ad ogni tuo accesso! Così da poter scoprire piccoli capolavori non in classifica";

    var t3 = document.createElement("div");
    t3.setAttribute("class", "tile is-child");

    var h1 = document.createElement("h2");
    h1.setAttribute("class", "title is-4 has-text-info");
    h1.innerText = this.settings.h1;

    var h2 = document.createElement("h3");
    h2.setAttribute("class", "subtitle has-text-white");
    h2.innerText = this.settings.artista;

    var anno = document.createElement("p");
    anno.setAttribute("class", "subtitle");
    anno.innerText = this.settings.anno;

    var t4 = document.createElement("dic");
    t4.setAttribute("class", "tile is-parent");

    var t5 = document.createElement("div");
    t5.setAttribute("class", "tile is-child");

    var t6 = document.createElement("div");
    t6.setAttribute("class", "iframe-container");

    var ifr = document.createElement("iframe");
    ifr.setAttribute("id", "searchYTrand");
    
    t6.appendChild(ifr);
    t5.appendChild(t6);
    t4.appendChild(t5);
    t3.appendChild(h1);
    t3.appendChild(h2);
    t3.appendChild(anno);
    t2.appendChild(tit);
    t2.appendChild(p);
    t1.appendChild(t2);
    t1.appendChild(t3);
    list.appendChild(t1);
    list.appendChild(t4);

    this.renderYT();
  }

  renderYT() {
    const API_KEY = "AIzaSyCIg1kM6x9ISrl_fXtlq6e0ayrqVFJHGt8";

    searchYouTube(
      { key: API_KEY, term: this.settings.h1 + this.settings.artista, maxResults: 1 },
      videos => {
        console.log(videos);
        var iframe = document.getElementById("searchYTrand");
        iframe.src = "https://www.youtube.com/embed/" + videos[0].id.videoId;
      }
    );
  }

}
