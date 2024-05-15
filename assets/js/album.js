const unpackAlbum = function (object) {
  const titoloAlbum = object.title;
  const coverAlbum = object.cover;
  const autore = object.artist.name;
  const durataInMinuti = parseInt(object.duration / 60);
  const annoDiPubblicazione = object.release_date.slice(0, 4);
  const arrayTracks = object.tracks.data;
  console.log(
    titoloAlbum,
    coverAlbum,
    autore,
    durataInMinuti,
    annoDiPubblicazione,
    arrayTracks
  );
};

const getAlbum = function () {
  fetch("https://striveschool-api.herokuapp.com/api/deezer/album/75621062", {})
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore caricamento catalogo");
      }
    })
    .then((obj) => {
      unpackAlbum(obj);
    })
    .catch((err) => {
      console.log("Error", err);
    });
};

getAlbum();
