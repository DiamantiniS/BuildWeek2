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

// MAIN HOMEPAGE

const albumSelezionato = function () {
  window.location.href = `album.html?albumId=${this.id}`;
};

const fullHomepage = function (object) {
  const arrayHome = object.data;
  console.log("arrayHome", arrayHome);
  //BRANI ASCOLTATI
  const divAscolatati = document.getElementById("ascoltati");
  divAscolatati.innerHTML = "";
  for (let i = 0; i < 8; i++) {
    let colonnaAscolatati = document.createElement("div");
    colonnaAscolatati.classList.add("col-6", "col-lg-3", "mb-2", "px-0");
    colonnaAscolatati.innerHTML = `<div class="d-flex align-items-center last-listen me-2 pe-4">
    <img src=${arrayHome[i].album.cover_small} class="w-25" />
    <h5 class="ps-3">${arrayHome[i].title_short}</h5>
    <i
      class="bi bi-play-circle-fill text-green-spotyfy ms-auto play fs-5"
    ></i>
  </div>`;
    colonnaAscolatati.setAttribute("id", `${arrayHome[i].album.id}`);
    colonnaAscolatati.addEventListener("click", albumSelezionato);
    divAscolatati.appendChild(colonnaAscolatati);
  }
  //NUOVO BRANO
  const rowNuovo = document.getElementById("nuovo-brano");
  rowNuovo.innerHTML = "";
  rowNuovo.innerHTML = `<div class="col-12"><h4>Nuovi brani aggiunti</h4></div>
  <div class="col-4">
    <img src=${arrayHome[8].album.cover_big} class="img-fluid" id="${arrayHome[8].album.id}"/>
  </div>
  <div class="col-8">
    <div
      class="d-flex flex-column justify-content-between h-100 px-1 py-1 w-100"
    >
      <div>
        <h5>${arrayHome[8].title}</h5>
        <p>${arrayHome[8].album.title}</p>
      </div>
      <div class="d-flex justify-content-between mt-auto">
        <div class="d-flex">
          <button class="btn text-white">
            <i class="bi bi-plus-circle"></i>
          </button>

          <button class="btn text-white">
            <i
              class="bi bi-check-circle-fill text-green-spotyfy d-none"
            ></i>
          </button>
        </div>
        <button class="btn">
          <i
            class="bi bi-play-circle-fill text-green-spotyfy fs-1"
          ></i>
        </button>
      </div>
    </div>
  </div>`;
  const newTrackImg = document.getElementById(arrayHome[8].album.id);
  newTrackImg.addEventListener("click", albumSelezionato);
  //ALBUM PREFERITI
  const divPreferiti = document.getElementById("album-preferiti");
  divPreferiti.innerHTML = "";
  for (let i = 9; i < 13; i++) {
    let colonnaPreferiti = document.createElement("div");
    colonnaPreferiti.classList.add(
      "col-6",
      "col-sm-4",
      "col-md-3",
      "mycard",
      "pt-2",
      "position-relative",
      "effect",
      "rounded-3"
    );
    colonnaPreferiti.innerHTML = `<div class="card bg-transparent border border-0 text-white">
    <a href="#" class="text-decoration-none text-white">
      <img
        src=${arrayHome[i].album.cover_big} 
        class="card-img-top"
        alt="album cover"
      />
      <button class="btn icona">
        <i
          class="bi bi-play-circle-fill text-green-spotyfy fs-1"
        ></i>
      </button>
      <div class="card-body ps-1">
        <h5 class="card-title">${arrayHome[i].album.title} </h5>
        <p class="card-text">Album • ${arrayHome[i].artist.name} </p>
      </div></a
    >
  </div>`;
    colonnaPreferiti.setAttribute("id", `${arrayHome[i].album.id}`);
    colonnaPreferiti.addEventListener("click", albumSelezionato);
    divPreferiti.appendChild(colonnaPreferiti);
  }
  //ALBUM CONSIGLIATI
  const divConsigliati = document.getElementById("album-consigliati");
  divConsigliati.innerHTML = "";
  for (let i = 13; i < 17; i++) {
    let colonnaConsigliati = document.createElement("div");
    colonnaConsigliati.classList.add(
      "col-6",
      "col-sm-4",
      "col-md-3",
      "mycard",
      "pt-2",
      "position-relative",
      "effect",
      "rounded-3"
    );
    colonnaConsigliati.innerHTML = `<div class="card bg-transparent border border-0 text-white">
    <a href="#" class="text-decoration-none text-white">
      <img
        src=${arrayHome[i].album.cover_big} 
        class="card-img-top"
        alt="album cover"
      />
      <button class="btn icona">
        <i
          class="bi bi-play-circle-fill text-green-spotyfy fs-1"
        ></i>
      </button>
      <div class="card-body ps-1">
        <h5 class="card-title">${arrayHome[i].album.title} </h5>
        <p class="card-text">Album • ${arrayHome[i].artist.name} </p>
      </div></a
    >
  </div>`;
    colonnaConsigliati.setAttribute("id", `${arrayHome[i].album.id}`);
    colonnaConsigliati.addEventListener("click", albumSelezionato);
    divConsigliati.appendChild(colonnaConsigliati);
  }
};

const loadHomepage = function () {
  fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=california",
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
      fullHomepage(obj);
    })
    .catch((err) => {
      console.log("Error", err);
    });
};

loadHomepage();
