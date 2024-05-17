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
  const containerArtistImg = document.getElementById('containerArtistImg')
  document.querySelector("#container-overImg h1").innerHTML = nomeArtista;
  document.getElementById("artistNameHeader").innerHTML = nomeArtista;
  document.getElementsByTagName("title")[0].innerHTML =
    nomeArtista + " | Spotify";

    containerArtistImg.innerHTML = `
                                    <img id="imgArtist" class="ps-sm-3 object-fit-cover position-absolute top-0"
                                    src="${thumbnailArtista}" alt="artist img" onload="start()"
                                    crossorigin="anonymous" />

                                   `
  
  // document.getElementById("imgArtist").setAttribute("src", thumbnailArtista);
  // start()

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

const getTracks =  function () {
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


/////////////////////////////////////////////////////////////////////////////////////////////////////

 /////////////////////// funzione per luminosità colore ///////////////////////////////////

 function hexToRgb(hex) {
  
  // Converte il valore esadecimale in RGB
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}

function rgbToLuminance(r, g, b) {
  // Normalizza i valori RGB
  r /= 255;
  g /= 255;
  b /= 255;

  // Calcola la luminanza relativa
  r = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  g = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  b = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

  // Calcola la luminanza
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function adjustColorIfTooLight(hexColor) {
  const rgb = hexToRgb(hexColor);
  const luminance = rgbToLuminance(rgb.r, rgb.g, rgb.b);

  // Soglia di luminosità, 0.7 può essere regolata a seconda delle necessità
  const threshold = 0.5;

  if (luminance > threshold) {
      return '3c3c3b'; // Colore troppo chiaro, ritorna nero
  } else {
      return hexColor; // Colore sufficientemente scuro, ritorna il colore originale
  }
}

// Esempi di utilizzo:
console.log(adjustColorIfTooLight("FFFFFF")); // Troppo chiaro, restituisce #000000
console.log(adjustColorIfTooLight("000000")); // Sufficientemente scuro, restituisce #000000
console.log(adjustColorIfTooLight("ffffff")); // Dipende dalla luminosità, potrebbe restituire il colore originale o nero

/////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////funzione per scroll///////////////////////////////////////////////////

const scroll = function(hex) {
  let mainContainer = document.getElementById('main')
  let playHeader = document.getElementById('playHeader')
  let artistNameHeader = document.getElementById('artistNameHeader')
  let header = document.getElementById('header')
  let newHex = hex
  mainContainer.addEventListener('scroll', function (e) {
    let scroll = e.target.scrollTop;
    //console.log('scroll main =', scroll);       //260 
    if (scroll > 300) {
      playHeader.classList.add('d-sm-inline')
      artistNameHeader.classList.add('d-sm-inline')
      header.setAttribute('style', `background-color: #${newHex}`)
    } else {
      playHeader.classList.remove('d-sm-inline')
      artistNameHeader.classList.remove('d-sm-inline')
      header.removeAttribute('style', `background-color: #${newHex}`)
    }
  })
  console.log('colore barra=', newHex);
}
  /////////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////funzione colore medio//////////////////////////////////////

// crea un canvas con l'immagine e ne ritorno il context 2d
const draw = function (img) {
  let canvas = document.createElement('canvas')
  let c = canvas.getContext('2d')
  c.width = canvas.width = img.clientWidth
  c.height = canvas.height = img.clientHeight
  c.clearRect(0, 0, c.width, c.height)
  c.drawImage(img, 0, 0, img.clientWidth, img.clientHeight)
  return c
}

// scompone pixel per pixel e ritorna un oggetto con una mappa della loro frequenza nell'immagine
const getColors = function (c) {
  let col,
    colors = {}
  let pixels, r, g, b, a
  r = g = b = a = 0
  pixels = c.getImageData(0, 0, c.width, c.height)
  for (let i = 0, data = pixels.data; i < data.length; i += 4) {
    r = data[i]
    g = data[i + 1]
    b = data[i + 2]
    a = data[i + 3]
    if (a < 255 / 2) continue
    col = rgbToHex(r, g, b)
    if (!colors[col]) colors[col] = 0
    colors[col]++
  }
  return colors
}

// trova il colore più ricorrente data una mappa di frequenza dei colori
const findMostRecurrentColor = function (colorMap) {
  let highestValue = 0
  let mostRecurrent = null
  for (const hexColor in colorMap) {
    if (colorMap[hexColor] > highestValue) {
      mostRecurrent = hexColor
      highestValue = colorMap[hexColor]
    }
  }
  return mostRecurrent
}

// converte un valore in rgb a un valore esadecimale
const rgbToHex = function (r, g, b) {
  if (r > 255 || g > 255 || b > 255) {
    throw 'Invalid color component'
  } else {
    return ((r << 16) | (g << 8) | b).toString(16)
  }
}

// inserisce degli '0' se necessario davanti al colore in esadecimale per renderlo di 6 caratteri
const pad = function (hex) {
  return ('000000' + hex).slice(-6)
}

//const generateImage = function () {
  // genero dinamicamente un tag <img /> in un <div> vuoto

//   let imageSrc =
//     'https://e-cdns-images.dzcdn.net/images/artist/7f6e8be161417ad8ce8f09b45721544f/500x500-000000-80-0-0.jpg'

//   let reference = document.getElementById('container')

//   // l'event listener "onload" nel tag <img /> si occupa di lanciare la funzione "start()" solamente
//   // al termine del caricamento della src
//   reference.innerHTML = `
//     <img
//       src=${imageSrc}
//       id="img"
//       crossorigin="anonymous"
//       onload="start()"
//     />`
// }

const start = function () {
  // prendo il riferimento all'immagine del dom
  let imgReference = document.getElementById('imgArtist')

  // creo il context 2d dell'immagine selezionata
  let context = draw(imgReference)

  console.log('context', context)
  
  // creo la mappa dei colori più ricorrenti nell'immagine
  let allColors = getColors(context)

  
  console.log('allcolors', allColors)
  // trovo colore più ricorrente in esadecimale
  let mostRecurrent = findMostRecurrentColor(allColors)

  console.log('mostRecurrent', mostRecurrent);

  // se necessario, aggiunge degli '0' per rendere il risultato un valido colore esadecimale
  let mostRecurrentHex = pad(mostRecurrent)

  // console.log del risultato
  console.log('mostRecurrentHex=media colore', mostRecurrentHex)

  let newHex = adjustColorIfTooLight(mostRecurrentHex)

  scroll(newHex)

  console.log('colore' ,newHex);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////




 