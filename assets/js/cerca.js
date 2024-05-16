const showPlaylist = function (object) {
  let numeroConsigliati = 10;
  arrayPlaylist = object.data;
  const divPlaylist = document.getElementById("div-playlist");
  divPlaylist.innerHTML = "";

  for (let i = 0; i < numeroConsigliati; i++) {
    let singolaPlaylist = document.createElement("div");
    singolaPlaylist.classList.add("d-flex", "gap-3");
    singolaPlaylist.innerHTML = `<img src="${arrayPlaylist[i].album.cover_small}" class="object-fit-cover img-fluid p-1"/>
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

//CAMBIO BOTTONE DA PLUS A CHECK E VICEVERSA
const plusElements = document.getElementsByClassName("plus");
const checkElements = document.getElementsByClassName("check");

//Il plus diventa check
Array.from(plusElements).forEach((plus, i) => {
  plus.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("diventa check");

    plus.classList.remove("d-block");
    plus.classList.add("d-none");

    const check = checkElements[i];
    check.classList.remove("d-none");
    check.classList.add("d-block");
  });
});

//Il check diventa plus
Array.from(checkElements).forEach((check, i) => {
  check.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("torna plus");

    check.classList.remove("d-block");
    check.classList.add("d-none");

    const plus = plusElements[i];
    plus.classList.remove("d-none");
    plus.classList.add("d-block");
  });
});

//IDENTIFICO IL BOTTONE DI RICERCA
const searchButton = document.getElementById("search");

//FUNZIONE CHE GENERA LE CANZONI
const generateSong = function (array) {
  const newRow = document.getElementById("riga");
  newRow.innerHTML = "";
  array.data.forEach((element) => {
    const newCol = document.createElement("div");
    newCol.classList.add("col-12");
    newCol.innerHTML = ` 
    <div class="row canzone align-items-center">
        <div class="col-3 col-sm-2">
            <img src="${
              element.album.cover_small
            }" alt="copertina canzone" class="img-fluid">
        </div>
        <div class="col">
            <p class="fs-4 m-0">${element.title_short}</p>
            <p class="name-artist"><a href="#" class="text-decoration-none text-white">${
              element.artist.name
            }</a> • <a href="#" class="text-decoration-none text-white">${
      element.album.title
    }</a></p>
        </div>
        
        <div class="col d-flex mt-2 justify-content-end align-items-center">
            <div class="d-flex align-content-center">
                <button class="btn text-white plus">
                    <i class="bi bi-plus-circle"></i>
                </button>
                <button class="btn text-white check d-none">
                    <i class="bi bi-check-circle-fill text-green-spotyfy"></i>
                </button>
            </div>
            <p class="minutes-song mb-0">${Math.floor(
              element.duration / 60
            )}:${Math.floor(element.duration % 60)} </p>
            <i class="bi bi-three-dots text-white mx-2"></i>
        </div>
    </div>   
    `;
    newRow.appendChild(newCol);
  });
};

//FUNZIONE CHE RECUPERA I DATI ALL'API
const getSong = function (choice) {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${choice}`)
    .then((response) => {
      if (response.ok) {
        console.log("OK", response);
        return response.json();
      } else {
        throw new Error("Errore nel caricamento");
      }
    })
    .then((array) => {
      console.log("Array", array);
      generateSong(array);
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};

//AL CLICK SUL BOTTONE CERCA ESTRAGGO IL TESTO INSERITO NEL CAMPO DI RICERCA
//LO PASSO POI COME PARAMETRO DELLA FUNZIONE CHE CHIEDE DATI ALL'API
searchButton.addEventListener("click", function (e) {
  e.preventDefault();
  let canzoni = document.getElementsByTagName("input")[0].value;
  getSong(canzoni);
  document.getElementsByTagName("input")[0].value = "";
});
