// PLAYLIST SUGGERITE

const showPlaylist = function (object) {
  let numeroConsigliati = 10;
  arrayPlaylist = object.data;
  const divPlaylist = document.getElementById("div-playlist");
  divPlaylist.innerHTML = "";

  for (let i = 0; i < numeroConsigliati; i++) {
    let singolaPlaylist = document.createElement("div");
    singolaPlaylist.classList.add("d-flex", "gap-3");
    singolaPlaylist.innerHTML = `<img src="${arrayPlaylist[i].album.cover_small}" class="object-fit-cover p-1 img-fluid"/>
  <div class="text-white d-none d-md-block">
    <h5>${arrayPlaylist[i].title_short}</h5>
    <p>${arrayPlaylist[i].artist.name}</p>
  </div>`;
    divPlaylist.appendChild(singolaPlaylist);
  }
};

const recomendedPlaylist = function () {
  fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=pop", {})
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore caricamento playlist");
      }
    })
    .then((obj) => {
      showPlaylist(obj);
      console.log(obj);
    })
    .catch((err) => {
      console.log("Error", err);
    });
};

recomendedPlaylist();

// RECUPERA ARTISTI

const addressBarContent = new URLSearchParams(location.search);
let artistId = addressBarContent.get("artistId");
if (!artistId) {
  artistId = "412";
}

// FUNZIONE PER USARE IL PLAYER

const artistPlayer = function () {
  const srcPlayer = document.querySelector("#song source");
  const imgPlayer = document.querySelector(".image-container img");
  const tagAudio = document.getElementById("song");
  const titoloPlayer = document.querySelector(".title");
  const artistaPlayer = document.querySelector(".artist");
  console.log(this);
  srcPlayer.src = this.getAttribute("id");
  imgPlayer.src = this.querySelector("img").getAttribute("src");
  titoloPlayer.innerText = this.querySelector("h4").innerText;
  artistaPlayer.innerText = this.getAttribute("title");
  tagAudio.load();
};

// MAIN PAGINA ARTISTI

let indirizzoTracks;
const displayedSongs = 10;

const unpackArtist = function (object) {
  const nomeArtista = object.name;
  const thumbnailArtista = object.picture_xl;
  const thumbnailArtistaSmall = object.picture_small;
  const ascoltatoriMensili = object.nb_fan;
  const tracklistUrl = object.tracklist;
  indirizzoTracks = tracklistUrl;
  console.log("artist", object);

  document.querySelector("#container-overImg h1").innerHTML = nomeArtista;
  document.getElementById("artistNameHeader").innerHTML = nomeArtista;
  document.getElementsByTagName("title")[0].innerHTML =
    nomeArtista + " | Spotify";
  document.getElementById("imgArtist").setAttribute("src", thumbnailArtista);
  document
    .getElementById("imgArtistSmall")
    .setAttribute("src", thumbnailArtistaSmall);
  document.getElementById("listener-mth").innerHTML =
    ascoltatoriMensili + " ascoltatori mensili";
};

const getArtist = function () {
  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`,
    {}
  ) //qui va inserita la variabile con l'indirizzo+id
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore caricamento catalogo");
      }
    })
    .then((obj) => {
      unpackArtist(obj);
      getTracks();
    })
    .catch((err) => {
      console.log("Error", err);
    });
};

/* FETCH TRACKLIST */

const unpackTracks = function (object) {
  const divPopolari = document.querySelector("#popTrack .row.my-1");
  divPopolari.innerHTML = "";
  for (let i = 0; i < displayedSongs; i++) {
    const divBrano = document.createElement("div");
    divBrano.classList.add("d-flex", "justify-content-between", "mt-3");
    divBrano.setAttribute("id", `${object.data[i].preview}`);
    divBrano.setAttribute("title", `${object.data[i].artist.name}`);
    divBrano.innerHTML = `
    <div class="col-1 d-flex align-items-center justify-content-center">
        <p class="m-0">${i + 1}</p>
    </div>
    <div class="col-10 d-flex  mb-1">
        <img src="${object.data[i].album.cover_small}" alt="img album">
        <div class="ms-3">
            <h4 class="m-0">${object.data[i].title}</h4>
            <p class="m-0 opacity-75">${object.data[i].rank}</p>
        </div>
    </div>
    <div class="col-1 d-flex align-items-center justify-content-center">
        <i class="bi bi-three-dots-vertical fs-4 opacity-75"></i>
    </div>
    `;
    console.log(object.data[i]);
    divBrano.addEventListener("click", artistPlayer);
    divPopolari.appendChild(divBrano);
  }
};

const getTracks = function () {
  fetch(indirizzoTracks, {})
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore caricamento catalogo");
      }
    })
    .then((obj) => {
      unpackTracks(obj);
    })
    .catch((err) => {
      console.log("Error", err);
    });
};

getArtist();

//funzione per scroll
let mainContainer = document.getElementById("main");
let playHeader = document.getElementById("playHeader");
let artistNameHeader = document.getElementById("artistNameHeader");
let header = document.getElementById("header");
mainContainer.addEventListener("scroll", function (e) {
  let scroll = e.target.scrollTop;
  if (scroll > 312) {
    playHeader.classList.add("d-sm-inline");
    artistNameHeader.classList.add("d-sm-inline");
    header.classList.add("bg-black");
  } else {
    playHeader.classList.remove("d-sm-inline");
    artistNameHeader.classList.remove("d-sm-inline");
    header.classList.remove("bg-black");
  }
});
//
