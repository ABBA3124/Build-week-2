const btnCerca = document.getElementById("searchTrigger"); // Assumi che questo sia il bottone per mostrare/nascondere la barra di ricerca
const inputCerca = document.getElementById("searchGeneral");

// Funzione per gestire la ricerca
function searchItems() {
  const queries = inputCerca.value.trim().split();
  queries.forEach(query => {
    const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodeURIComponent(query)}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "50cb9d0834msh6916f2733fc1e75p1d758cjsnb17cfee22a1d",
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      },
    };

    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('nessuna risposta');
        }
        return response.json();
      })
      .then(data => {
        console.log(data.data);
        displayResults(data.data, query);
      })
      .catch(error => {
        console.error('Fetch error:', error.message);
      });
  });
}

// Ascolta l'evento di input sul campo di ricerca
inputCerca.addEventListener("input", searchItems);




function displayResults(results, query) {
  console.log("risultati per ${query}:", results)
  const containerTitoli = document.getElementById("containerTitoli");
  if (results.length === 0) {
    containerTitoli.innerHTML = `<p>Non ci sono risultati della ricerca</p>`;
    return;
  }
  let output = `<h2>Risultato più rilevante: <span class="fw-bold">${inputCerca.value.trim()}</span></h2>
  <h3>Brani:</h3><div class="overflow-scroll overflow-x-hidden" style="height: 500px">`;
  results.forEach(element => {
    output += `<ul><li class="search-result-item" data-audio-src="${element.preview}" data-title="${element.title}" data-artist="${element.artist.name}" data-album-cover="${element.album.cover}">
      <div class="d-flex" style="cursor: pointer;">
        <img src="${element.album.cover}" alt="immagine inerente al brano" height="50">
        <i class="bi bi-play-fill icon-play-overlay"></i>
        <div class="ms-2">
          <p class="fw-bold m-0 mb-2" style="font-size: 15px;">${element.title}</p>
          <p class="m-0" style="font-size: 12px;">${element.artist.name}</p>
        </div>
      </div>
    </li></ul>`;
  });
  output += `</div>`;
  containerTitoli.innerHTML = output;

  document.querySelectorAll('.search-result-item').forEach(item => {
    item.addEventListener('click', function() {
      playSelectedTrack(this.dataset.audioSrc, this.dataset.title, this.dataset.artist, this.dataset.albumCover);
    });
  });
}

function playSelectedTrack(src, title, artist, albumCover) {
  const audioPlayer = document.getElementById('audioPlayer');
  audioPlayer.src = src;
  audioPlayer.play();
  updatePlayButton();
  updateNowPlayingInfo(title, artist, albumCover);
}

function updateNowPlayingInfo(title, artist, albumCover) {
  document.querySelector('.sizeTitoloSong').textContent = title;
  document.querySelector('.sizeDescrizioneSong').textContent = artist;
  const imgElement = document.querySelector('#immagineBranoInRiproduzione img');
  imgElement.src = albumCover;
  imgElement.alt = `Immagine di: ${title}`;
}

function updatePlayButton() {
  const playIcon = document.querySelector('#bottoneplay i');
  playIcon.classList.remove('bi-play-circle-fill');
  playIcon.classList.add('bi-pause-circle-fill');
}



btnCerca.addEventListener('click', function() {
  let searchArea = document.getElementById('searchArea');
  if (searchArea.style.display === 'none' || searchArea.style.display === '') {
    searchArea.style.display = 'flex';
  } else {
    searchArea.style.display = 'none';
  }
});

   
    
clearIcon.addEventListener('click', function() {
  document.getElementById('searchGeneral').value = '';
})