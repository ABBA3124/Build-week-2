










document.addEventListener('DOMContentLoaded', () => {
    homePage()
  })
  
  
  const homePage = function () {
  function searchItemsHomePage() {

  }
}
  





document.addEventListener('DOMContentLoaded', () => {
    searchRandomTracks();
});

function searchRandomTracks() {
    const randomQueries = ['rock', 'pop', 'jazz', 'classical'];  // Sostituire con generi/artisti a tua scelta
    const query = randomQueries[Math.floor(Math.random() * randomQueries.length)];
    const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodeURIComponent(query)}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '50cb9d0834msh6916f2733fc1e75p1d758cjsnb17cfee22a1d',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
        },
    };

    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('nessuna risposta');
            }
            return response.json();
        })
        .then(result => {
            console.log(result.data);
            displayResults(result.data, query);
        })
        .catch(error => {
            console.error('Fetch error:', error.message);
        });
}

function displayResults(results, query) {
    const containerLaunchHomePage = document.getElementById('containerLaunchHomePage');
    if (results.length === 0) {
        containerLaunchHomePage.innerHTML = `<p>Non ci sono risultati della ricerca per ${query}</p>`;
        return;
    }
    let output = `<h2>Risultato più rilevante per il genere <span class="fw-bold">${query}</span>:</h2>
                  <h3>Brani:</h3>
                  <div class="overflow-scroll overflow-x-hidden" style="height: 260px;">`;
    results.forEach(element => {
        output += `<ul>
                      <li class="search-result-item" data-audio-src="${element.preview}" data-title="${element.title}" data-artist="${element.artist.name}" data-album-cover="${element.album.cover}">
                        <div class="d-flex" style="cursor: pointer;">
                          <img src="${element.album.cover}" alt="Copertina dell'album" height="50">
                          <i class="bi bi-play-fill icon-play-overlay"></i>
                          <div class="ms-2">
                            <p class="fw-bold m-0 mb-2" style="font-size: 15px;">${element.title}</p>
                            <p class="m-0" style="font-size: 12px;">${element.artist.name}</p>
                          </div>
                        </div>
                      </li>
                   </ul>`;
    });
    output += `</div>`;
    containerLaunchHomePage.innerHTML = output;
}




























function searchItems() {
    const queries = inputCerca.value.trim().split()
    queries.forEach((query) => {
      const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodeURIComponent(
        query
      )}`
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '50cb9d0834msh6916f2733fc1e75p1d758cjsnb17cfee22a1d',
          'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
        },
      }
  
      fetch(url, options)
        .then((response) => {
          if (!response.ok) {
            throw new Error('nessuna risposta')
          }
          return response.json()
        })
        .then((result) => {
          console.log(result.data)
          displayResults(result.data, query)
          displayArtistResults(result.data, query)
          displayAlbumResults(result.data, query)
        })
        .catch((error) => {
          console.error('Fetch error:', error.message)
        })
    })
  }
  
  // Ascolta l'evento di input sul campo di ricerca
  inputCerca.addEventListener('input', searchItems)
  
  function displayResults(results, query) {
    console.log('risultati per ${query}:', results)
    const containerTitoli = document.getElementById('containerTitoli')
    if (results.length === 0) {
      containerTitoli.innerHTML = `<p>Non ci sono risultati della ricerca</p>`
      return
    }
    let output = `<h2>Risultato più rilevante: <span class="fw-bold">${inputCerca.value.trim()}</span></h2>
    <h3>Brani:</h3><div class="overflow-scroll overflow-x-hidden" style="height: 260px">`
    results.forEach((element) => {
      output += `<ul><li class="search-result-item" data-audio-src="${element.preview}" data-title="${element.title}" data-artist="${element.artist.name}" data-album-cover="${element.album.cover}">
        <div class="d-flex" style="cursor: pointer;">
          <img src="${element.album.cover}" alt="immagine inerente al brano" height="50">
          <i class="bi bi-play-fill icon-play-overlay"></i>
          <div class="ms-2">
            <p class="fw-bold m-0 mb-2" style="font-size: 15px;">${element.title}</p>
            <p class="m-0" style="font-size: 12px;">${element.artist.name}</p>
          </div>
        </div>
      </li></ul>`
    })
    output += `</div>`
    containerTitoli.innerHTML = output
  
    document.querySelectorAll('.search-result-item').forEach((item) => {
      item.addEventListener('click', function () {
        playSelectedTrack(
          this.dataset.audioSrc,
          this.dataset.title,
          this.dataset.artist,
          this.dataset.albumCover
        )
      })
    })
  }
  
  // adattamento comportamento cristian
  function displayArtistResults(results, query) {
    console.log('risultati per ${query}:', results)
    const containerArtist = document.getElementById('containerArtist')
    if (results.length === 0) {
      containerArtist.innerHTML = `<p>Non ci sono risultati della ricerca</p>`
      return
    }
    let output = `<h3 class="mt-4">Artisti:</h3>`
    output += `<div class="overflow-scroll overflow-x-hidden d-flex flex-wrap justify-content-evenly" style="height: 165px">`
    results.forEach((element) => {
      output += `<a href="assets/html/artistpage.html?artistId=${element.artist.id}">
                  <div class="my-2 py-1 px-2 rounded cardContainer">
                  <img style="border-radius: 50%;" src="${element.artist.picture}" height="100">
                  <p class="fw-bold m-0 mb-2" style="font-size: 15px;">${element.artist.name}</p>
                  <p class="m-0" style="font-size: 12px;">Artista</p>
                </div></a>`
    })
    output += `</div>`
    containerArtist.innerHTML = output
  
    
  }
  
  function displayAlbumResults(results, query) {
    console.log('risultati per ${query}:', results)
    const containerAlbum = document.getElementById('containerAlbum')
    if (results.length === 0) {
      containerAlbum.innerHTML = `<p>Non ci sono risultati della ricerca</p>`
      return
    }
    let output = `<h3 class="mt-4">Album:</h3>`
    output += `<div class="overflow-scroll overflow-x-hidden d-flex flex-wrap justify-content-evenly" style="height: 120px">`
    results.forEach((element) => {
      output += `<a href="assets/html/albumpage.html?albumId=${element.album.id}">
                  <div class="py-2 px-2 rounded cardContainer">
                    <img style="border-radius: 4px;" src="${element.album.cover}" height="50px">
                    <p class="fw-bold m-0 mb-2" style="font-size: 15px;">${element.artist.name}</p>
                    <p class="m-0" style="font-size: 12px;">Album</p>
                  </div>
                </a>`
    })
    output += `</div>`
    containerAlbum.innerHTML = output
  
   
  }
  