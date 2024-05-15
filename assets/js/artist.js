// PLAYLIST SUGGERITE

const showPlaylist = function (object) {
  let numeroConsigliati = 10;
  arrayPlaylist = object.data;
  const divPlaylist = document.getElementById("div-playlist");
  divPlaylist.innerHTML = "";

  for (let i = 0; i < numeroConsigliati; i++) {
    let singolaPlaylist = document.createElement("div");
    singolaPlaylist.classList.add("d-flex", "gap-3");
    singolaPlaylist.innerHTML = `<img src="${arrayPlaylist[i].album.cover_small}" class="object-fit-cover p-1"/>
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

// MAIN PAGINA ARTISTI

let indirizzoTracks;
const displayedSongs = 5;

const unpackArtist = function (object) {
  const nomeArtista = object.name;
  const thumbnailArtista = object.picture_xl;
  const ascoltatoriMensili = object.nb_fan;
  const tracklistUrl = object.tracklist;
  indirizzoTracks = tracklistUrl;
  console.log("artist", object);

  console.log(nomeArtista);
  document.querySelector("#container-overImg h1").innerHTML = nomeArtista;
  document.getElementById("imgArtist").setAttribute("src", thumbnailArtista);
  document.getElementById("listener-mth").innerHTML =
    ascoltatoriMensili + " ascoltatori mensili";
};

const getArtist = function () {
  fetch(" https://striveschool-api.herokuapp.com/api/deezer/artist/412", {})
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
    object.data[i];
    divPopolari.innerHTML += `<div class="col-1 d-flex align-items-center justify-content-center">
    <p class="m-0">${i + 1}</p>
</div>
<div class="col-10 d-flex  mb-1">
    <img src="${object.data[i].album.cover_small}" alt="img album">
    <div class="ms-3">
        <h4 class="m-0">${object.data[i].album.title}</h4>
        <p class="m-0 opacity-75">${object.data[i].rank}</p>
    </div>
</div>
<div class="col-1 d-flex align-items-center justify-content-center">
    <i class="bi bi-three-dots-vertical fs-4 opacity-75"></i>
</div>`;
    console.log(object.data[i]);
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
