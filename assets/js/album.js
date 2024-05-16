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

// RECUPERA ALBUM

const addressBarContent = new URLSearchParams(location.search);
let albumId = addressBarContent.get("albumId");
if (!albumId) {
  albumId = "75621062";
}

// MAIN PAGINA ALBUM

const altroDiArtista = function (obj) {
  const albumArtista = document.getElementById("album-artista");
  albumArtista.innerHTML = "";
  for (let i = 0; i < 2; i++) {
    let cardAlbum = document.createElement("div");
    cardAlbum.setAttribute("style", "width: 10rem");
    cardAlbum.classList.add("card", "bg-dark", "me-2", "me-sm-4");
    cardAlbum.innerHTML = `<img
    src="${obj.data[i].album.cover_medium}"
    class="card-img-top"
    alt="album"
  />
  <div class="card-body">
    <p class="card-text text-white">${obj.data[i].album.title}</p>
    <p class="card-text text-white">ANNO USCITA</p>
  </div>
  <button class="button" style="font-size: 3em">
    <i
      class="bi bi-play-circle-fill text-green-spotyfy bg-black rounded-circle"
    ></i>
  </button>`;
    albumArtista.appendChild(cardAlbum);
  }
};

const fetchAltro = function (id) {
  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/artist/${id}/top?limit=50`,
    {}
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore caricamento catalogo");
      }
    })
    .then((obj) => {
      altroDiArtista(obj);
      //console.log(obj);
    })
    .catch((err) => {
      console.log("Error", err);
    });
};

// CAMBIO PAGINA, ARTISTA SELEZIONATO

const artistaSelezionato = function () {
  window.location.href = `artist.html?artistId=${this.title}`;
};

// FUNZIONE PER USARE IL PLAYER

const uploadPlayer = function () {
  const srcPlayer = document.querySelector("#song source");
  const imgPlayer = document.querySelector(".image-container img");
  const tagAudio = document.getElementById("song");
  const titoloPlayer = document.querySelector(".title");
  const artistaPlayer = document.querySelector(".artist");

  srcPlayer.src = this.getAttribute("id");
  imgPlayer.src = this.getAttribute("title");
  titoloPlayer.innerText = this.querySelector(".name-song").innerText;
  artistaPlayer.innerText = this.querySelector(".name-artist").innerText;
  tagAudio.load();
};

// INSERIMENTO TRACCE

const unpackAlbum = function (object) {
  const titoloAlbum = object.title;
  const coverAlbum = object.cover_big;
  const autore = object.artist.name;
  const artistImg = object.artist.picture_small;
  const durataInMinuti = parseInt(object.duration / 60);
  const numeroTracce = object.nb_tracks;
  const annoDiPubblicazione = object.release_date.slice(0, 4);
  const dataDiPubblicazione = object.release_date;
  const arrayTracks = object.tracks.data;

  document.querySelector("#hero-album img").setAttribute("src", coverAlbum);
  document.getElementById("titolo").innerHTML = titoloAlbum;
  document.querySelector("#info-album img").setAttribute("src", artistImg);
  document.getElementById("album-date").innerText = dataDiPubblicazione;
  document.querySelector("#info-album p").innerHTML =
    autore +
    " • " +
    annoDiPubblicazione +
    " • " +
    numeroTracce +
    " brani • " +
    durataInMinuti +
    " min";
  document
    .getElementById("info-album")
    .setAttribute("title", `${object.artist.id}`);
  document
    .getElementById("info-album")
    .addEventListener("click", artistaSelezionato);

  console.log(arrayTracks);
  const songList = document.getElementById("list-songs");
  songList.innerHTML = "";
  arrayTracks.forEach((element, index) => {
    const divCanzone = document.createElement("div");
    divCanzone.classList.add(
      "d-flex",
      "justify-content-between",
      "mt-3",
      "canzone"
    );
    divCanzone.setAttribute("id", `${element.preview}`);
    divCanzone.setAttribute("title", `${element.album.cover_small}`);
    divCanzone.innerHTML = `<div class="d-flex">
    <div class="px-4 py-3 number-song">${index + 1}</div>
    <div>
      <p class="fs-4 m-0 name-song">${element.title_short}</p>
      <p class="name-artist">${element.artist.name}</p>
    </div>
  </div>
  <div class="d-flex mt-2">
    <i class="bi bi-plus-circle me-4"></i>
    <p class="minutes-song">${Math.floor(element.duration / 60)}:${Math.floor(
      element.duration % 60
    )} </p>
    <i class="bi bi-three-dots text-white mx-2"></i>
  </div>`;
    divCanzone.addEventListener("click", uploadPlayer);
    songList.appendChild(divCanzone);
  });
  fetchAltro(arrayTracks[0].artist.id);
};

const getAlbum = function () {
  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`,
    {}
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore caricamento catalogo");
      }
    })
    .then((obj) => {
      unpackAlbum(obj);
      //console.log(obj);
    })
    .catch((err) => {
      console.log("Error", err);
    });
};

getAlbum();
