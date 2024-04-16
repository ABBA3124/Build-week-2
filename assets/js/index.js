// start home page automatica random
document.addEventListener('DOMContentLoaded', () => {
  searchRandomTracks();
});


homeButton.addEventListener('click', function () {
  searchRandomTracks()
  let searchArea = document.getElementById('searchArea')
  searchArea.style.display = 'none'
})
 const limit = 16;

function searchRandomTracks() {
  const randomQueries = ['italian', 'sfera', 'travisscott', 'jazz', 'classical', 'metal' ];  
  const query = randomQueries[Math.floor(Math.random() * randomQueries.length)];
  const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodeURIComponent(query)}&limit=${limit}`;
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
          displayResults2(result.data, query);
          displayArtistResults2(result.data, query)
          displayAlbumResults2(result.data, query)
      })
      .catch(error => {
          console.error('Fetch error:', error.message);
      });
}

function displayResults2(results, query) {
  const containerTitoli = document.getElementById('containerTitoli');
  let output = `
                <div class="mt-3 row " >`;
  results.forEach(element => {
      output += `<div class="col-12 col-sm-6 col-md-4 col-lg-3">
                    <li class="search-result-item" data-audio-src="${element.preview}" data-title="${element.title}" data-artist="${element.artist.name}" data-album-cover="${element.album.cover}">
                      <div class="d-flex" style="cursor: pointer;">
                        <img src="${element.album.cover}" alt="Copertina dell'album" height="60">
                        <i class="bi bi-play-fill icon-play-overlay"></i>
                        <div class="ms-2">
                          <p class="fw-bold m-0 mb-2" style="font-size: 12px;">${element.title}</p>
                          <p class="m-0" style="font-size: 12px;">${element.artist.name}</p>
                        </div>
                      </div>
                    </li>
                 </div>`;
  });
  output += `</div>`;
  containerTitoli.innerHTML = output;

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

function displayArtistResults2(results, query) {
  console.log('risultati per ${query}:', results)
  const containerArtist = document.getElementById('containerArtist')
  
  let output = `<h3 class="mt-4">Artisti</h3>`
  output += `<div class="row row-col">`
  results.forEach((element) => {
    output += `<a class="col" href="assets/html/artistpage.html?artistId=${element.artist.id}">
                <div class="my-2 py-1 px-2 rounded cardContainer">
                <img style="border-radius: 50%;" src="${element.artist.picture}" height="100">
                <p class="fw-bold m-0 mb-2" style="font-size: 15px;">${element.artist.name}</p>
                <p class="m-0" style="font-size: 12px;">Artista</p>
              </div></a>`
  })
  output += `</div>`
  containerArtist.innerHTML = output
}




function displayAlbumResults2(results, query) {
  console.log('risultati per ${query}:', results)
  const containerAlbum = document.getElementById('containerAlbum')
  
  let output = `<h3 class="mt-4">Album</h3>`
  output += `<div class="row" >`
  results.forEach((element) => {
    output += `<a class="col-3" href="assets/html/albumpage.html?albumId=${element.album.id}">
                <div class=" rounded cardContainer text-left">
                  <img style="border-radius: 6px;" src="${element.album.cover}" height="150px">
                  <p class="mb-1 fw-bold " style="font-size: 12px;">${element.album.title}</p>
                  <p class="mt-0" style="font-size: 10px;">2018 • ${element.artist.name}</p>
                </div>
              </a>`
  })
  output += `</div>`
  containerAlbum.innerHTML = output
}
// fine home page automatica random








// start abba
// START CERCA 
const btnCerca = document.getElementById('searchTrigger') // Assumi che questo sia il bottone per mostrare/nascondere la barra di ricerca
const inputCerca = document.getElementById('searchGeneral')

// Funzione per gestire la ricerca
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
  let output = `<h3 class="mt-4">Artisti</h3>`
  output += `<div class="row row-col">`
  results.forEach((element) => {
    output += `<a class="col" href="assets/html/artistpage.html?artistId=${element.artist.id}">
                <div class="my-2 py-1 px-2 rounded cardContainer">
                <img style="border-radius: 50%;" src="${element.artist.picture}" height="100">
                <p class="fw-bold m-0 mb-2" style="font-size: 15px;">${element.artist.name}</p>
                <p class="m-0" style="font-size: 12px;">Artista</p>
              </div></a>`
  })
  output += `</div>`
  containerArtist.innerHTML = output

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

function displayAlbumResults(results, query) {
  console.log('risultati per ${query}:', results)
  const containerAlbum = document.getElementById('containerAlbum')
  if (results.length === 0) {
    containerAlbum.innerHTML = `<p>Non ci sono risultati della ricerca</p>`
    return
  }
  let output = `<h3 class="mt-4">Album</h3>`
  output += `<div class="row" >`
  results.forEach((element) => {
    output += `<a class="col-3" href="assets/html/albumpage.html?albumId=${element.album.id}">
                <div class=" rounded cardContainer text-left">
                  <img style="border-radius: 6px;" src="${element.album.cover}" height="150px">
                  <p class="mb-1 fw-bold " style="font-size: 12px;">${element.album.title}</p>
                  <p class="mt-0" style="font-size: 10px;">2018 • ${element.artist.name}</p>
                </div>
              </a>`
  })
  output += `</div>`
  containerAlbum.innerHTML = output

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

function playSelectedTrack(src, title, artist, albumCover) {
  const audioPlayer = document.getElementById('audioPlayer')
  audioPlayer.src = src
  audioPlayer.play()
  updatePlayButton()
  updateNowPlayingInfo(title, artist, albumCover)
}

function updateNowPlayingInfo(title, artist, albumCover) {
  document.querySelector('.sizeTitoloSong').textContent = title
  document.querySelector('.sizeDescrizioneSong').textContent = artist
  const imgElement = document.querySelector('#immagineBranoInRiproduzione img')
  imgElement.src = albumCover
  imgElement.alt = `Immagine di: ${title}`
}

function updatePlayButton() {
  const playIcon = document.querySelector('#bottoneplay i')
  playIcon.classList.remove('bi-play-circle-fill')
  playIcon.classList.add('bi-pause-circle-fill')
}

btnCerca.addEventListener('click', function () {
  let searchArea = document.getElementById('searchArea')
  if (searchArea.style.display === 'none' || searchArea.style.display === '') {
    searchArea.style.display = 'flex'
  } else {
    searchArea.style.display = 'none'
  }
})

clearIcon.addEventListener('click', function () {
  document.getElementById('searchGeneral').value = ''
  searchRandomTracks()
})

// end abba

// start yahia
//FUNZIONE PER AGGIUNGERE UNA PLAYLIST CON EFFETTO DI FADE-IN
function addPlaylistWithFadeIn(playlistHTML) {
  const playlistContainer = document.getElementById('playlistContainer')
  const newPlaylist = document.createElement('div')
  newPlaylist.innerHTML = playlistHTML
  newPlaylist.classList.add(
    'playlist',
    'row',
    'align-items-center',
    'gx-3',
    'my-4'
  )
  newPlaylist.style.opacity = 0
  playlistContainer.appendChild(newPlaylist)
  setTimeout(() => {
    newPlaylist.style.opacity = 1
  }, 100)
}

// //FUNZIONE PER RIMUOVERE UNA PLAYLIST CON EFFETTO DI FADE-OUT
function removePlaylistWithFadeOut(playlist) {
  playlist.style.transition = 'opacity 0.3s ease'
  playlist.style.opacity = 0
  setTimeout(() => {
    playlist.remove()
  }, 300)
}

// //BOTTONI PER ELIMNARE LE PLAYLISTE//

document.querySelectorAll('.playlist').forEach((item) => {
  item.addEventListener('mouseenter', () => {
    item.querySelector('.delete-playlist').classList.remove('d-none')
  })

  item.addEventListener('mouseleave', () => {
    item.querySelector('.delete-playlist').classList.add('d-none')
  })
})

document.querySelectorAll('.playlist').forEach((item) => {
  const deleteBtn = item.querySelector('.delete-playlist')
  deleteBtn.addEventListener('click', () => {
    item.remove() // Rimuove la playlist quando si fa clic sulla "x"
  })

  item.addEventListener('mouseenter', () => {
    deleteBtn.classList.remove('d-none')
  })

  item.addEventListener('mouseleave', () => {
    deleteBtn.classList.add('d-none')
  })
})
// end yahia
