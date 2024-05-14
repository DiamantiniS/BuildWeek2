let indirizzoTracks;
const displayedSongs = 5;

const unpackArtist = function (object) {
  const nomeArtista = object.name;
  const thumbnailArtista = object.picture;
  const ascoltatoriMensili = object.nb_fan;
  const tracklistUrl = object.tracklist;
  indirizzoTracks = tracklistUrl;
  console.log(nomeArtista, thumbnailArtista, ascoltatoriMensili, tracklistUrl);
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
  console.log("ciao");
  for (let i = 0; i < displayedSongs; i++) {
    object.data[i];
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
