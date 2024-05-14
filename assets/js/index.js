const fullHomepage = function (object) {
  const arrayHome = object.data;
};

const loadHomepage = function () {
  fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=pop", {})
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
