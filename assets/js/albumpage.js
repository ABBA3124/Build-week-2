// DICHIARAZIONI GENERALI
const KEY = "bc10829072mshb658932a6a8dddep1366a1jsn27a0e20c2896";
const HOST = "deezerdevs-deezer.p.rapidapi.com";
const URL_API = "https://deezerdevs-deezer.p.rapidapi.com/album/75621062";
const divHeroImg = document.getElementById("hero-img");
const divInfoCantante = document.getElementById("info-cantante");

document.addEventListener("DOMContentLoaded", () => {
  fetch(URL_API, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": KEY,
      "X-RapidAPI-Host": HOST,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data_response) => {
      console.log(data_response);

      //   Immagine cover
      const img = document.createElement("img");
      const IMG_LINK = data_response.cover_medium;
      img.setAttribute("src", IMG_LINK);
      img.classList.add("mx-4");
      divHeroImg.appendChild(img);
      // titolo Album
      const p = document.getElementById("album-title");
      p.innerText = data_response.title;

      //   Informazioni album
      const imgArtist = document.createElement("img");
      const IMG_LINK_ARTIST = data_response.artist.picture_small;
      imgArtist.setAttribute("src", IMG_LINK_ARTIST);
      imgArtist.classList.add("imgLinkArtist", "me-2");
      divInfoCantante.appendChild(imgArtist);
      const titoloCantante = data_response.artist.name;
      const spanTitoloCantante = document.createElement("span");
      spanTitoloCantante.innerText = `${titoloCantante} ◦ `;
      divInfoCantante.appendChild(spanTitoloCantante);

      const releaseDate = new Date(data_response.release_date).getFullYear();
      const spanAnno = document.createElement("span");
      spanAnno.innerText = `${releaseDate} ◦ `;
      divInfoCantante.appendChild(spanAnno);

      const durationTracks = (data_response.duration / 60)
        .toString()
        .split(".");
      let min = durationTracks[0];
      min = parseInt(min);

      let sec = durationTracks[1];
      sec = sec.substring(0, 2);
      sec = parseInt(sec);

      const spanTracks = document.createElement("span");
      spanTracks.innerText = `Brani: ${data_response.nb_tracks}, ${min} min ${sec} sec.`;
      divInfoCantante.appendChild(spanTracks);
      //   FINE PARTE INFO ALBUM

      // INIZIO PARTE TRACKS

      // FINE PARTE TRACKS
    });
});
