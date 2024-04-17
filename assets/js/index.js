const params = new URLSearchParams(window.location.search)
const id = params.get('albumId')
const id2 = params.get('artistId')
const URL_ARTIST = `https://deezerdevs-deezer.p.rapidapi.com/search?q=` + id2
const URL_API = 'https://deezerdevs-deezer.p.rapidapi.com/album/' + id
const KEY = 'bc10829072mshb658932a6a8dddep1366a1jsn27a0e20c2896'
const HOST = 'deezerdevs-deezer.p.rapidapi.com'

// start home page automatica random
document.addEventListener('DOMContentLoaded', () => {
  if (id) {
    console.log(URL_API)
    createAlbum()
  } else if (id2) {
    console.log(URL_ARTIST)
    searchItemsAlbum()
    // createAlbum2()
  } else {
    searchRandomTracks()
  }
})

homeButton.addEventListener('click', function () {
  searchRandomTracks()
  let searchArea = document.getElementById('searchArea')
  searchArea.style.display = 'none'
})
const limit = 16

function searchRandomTracks() {
  const randomQueries = ['italian', 'sfera', 'travisscott', 'jazz', 'classical', 'metal']
  const query = randomQueries[Math.floor(Math.random() * randomQueries.length)]
  const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodeURIComponent(query)}&limit=${limit}`
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
      displayResults2(result.data, query)
      displayArtistResults2(result.data, query)
      displayAlbumResults2(result.data, query)
    })
    .catch((error) => {
      console.error('Fetch error:', error.message)
    })
}

function displayResults2(results, query) {
  const containerTitoli = document.getElementById('containerTitoli')
  let output = `
                <div class="mt-3 row " >`
  results.forEach((element) => {
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
                 </div>`
  })
  output += `</div>`
  containerTitoli.innerHTML = output

  document.querySelectorAll('.search-result-item').forEach((item) => {
    item.addEventListener('click', function () {
      playSelectedTrack(this.dataset.audioSrc, this.dataset.title, this.dataset.artist, this.dataset.albumCover)
    })
  })
}

function displayArtistResults2(results, query) {
  console.log('risultati per ${query}:', results)
  const containerArtist = document.getElementById('containerArtist')

  let output = `<h3 class="mt-4">Artisti</h3>`
  output += `<div class="row row-col">`
  results.forEach((element) => {
    output += `<a class="col" href="../../../index.html?artistId=${element.artist.name}">
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
    output += `<a class="col-3 albumCard" href="../../../index.html?albumId=${element.album.id}">
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
    const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodeURIComponent(query)}`
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
    containerTitoli.innerHTML = `
    <div class="alert alert-info mt-5" role="alert">
    <p class="text-center mt-3 " style="font-weight:700;">Non ci sono risultati inerenti a: ${query}</p>
</div>
    `
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
      playSelectedTrack(this.dataset.audioSrc, this.dataset.title, this.dataset.artist, this.dataset.albumCover)
    })
  })
}

// adattamento comportamento cristian
function displayArtistResults(results, query) {
  console.log('risultati per ${query}:', results)
  const containerArtist = document.getElementById('containerArtist')
  if (results.length === 0) {
    containerArtist.innerHTML = ``
    return
  }
  let output = `<h3 class="mt-4">Artisti</h3>`
  output += `<div class="row row-col">`
  results.forEach((element) => {
    output += `<a class="col" href="../../../index.html?artistId=${element.artist.name}">
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
      playSelectedTrack(this.dataset.audioSrc, this.dataset.title, this.dataset.artist, this.dataset.albumCover)
    })
  })
}

function displayAlbumResults(results, query) {
  console.log('risultati per ${query}:', results)
  const containerAlbum = document.getElementById('containerAlbum')
  if (results.length === 0) {
    containerAlbum.innerHTML = ``
    return
  }
  let output = `<h3 class="mt-4">Album</h3>`
  output += `<div class="row" >`
  results.forEach((element) => {
    output += `<a class="col-3" href="../../../index.html?albumId=${element.album.id}">
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
      playSelectedTrack(this.dataset.audioSrc, this.dataset.title, this.dataset.artist, this.dataset.albumCover)
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
  newPlaylist.classList.add('playlist', 'row', 'align-items-center', 'gx-3', 'my-4')
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

// nikita parte album quando viene cliccato

const createAlbum = () => {
  const pos = document.getElementById('containerLaunchHomePage')
  pos.innerHTML = `
  <div id="hero" class="d-flex mt-3 mt-md-5 ms-md-4">
  <div class="img ms-3 me-3 me-md-4" id="hero-img">
    <img src="" alt="" id="img-cover" class="rounded"/>
  </div>
  <div class="info d-flex flex-column justify-content-between ">
    <p class="display-6 mt-3" style="font-size: 12px;">Album</p>
    <h1 id="album-title" style="font-weight: 700;"></h1>
    <div id="info-cantante" class="d-flex align-items-center">
      <img src="" alt="immagine cantante" id="img-artist" class="me-2" />
      <span id="info-album"></span>
    </div>
  </div>
</div>
<hr />
<button class="mb-3 ms-3 btn me-3" id="btn-play">
  <svg
    data-encore-id="icon"
    role="img"
    fill="white"
    aria-hidden="true"
    viewBox="0 0 24 24"
    class="Svg-sc-ytk21e-0 bneLcE"
  >
    <path
      d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"
    ></path>
  </svg>
</button>

<button class="mb-3 btn btn-secondary" id="btn-save">
  <svg
    data-encore-id="icon"
    role="img"
    aria-hidden="true"
    viewBox="0 0 24 24"
    class="Svg-sc-ytk21e-0 cqasRA"
    fill="white"
  >
    <path
      d="M5.21 1.57a6.757 6.757 0 0 1 6.708 1.545.124.124 0 0 0 .165 0 6.741 6.741 0 0 1 5.715-1.78l.004.001a6.802 6.802 0 0 1 5.571 5.376v.003a6.689 6.689 0 0 1-1.49 5.655l-7.954 9.48a2.518 2.518 0 0 1-3.857 0L2.12 12.37A6.683 6.683 0 0 1 .627 6.714 6.757 6.757 0 0 1 5.21 1.57zm3.12 1.803a4.757 4.757 0 0 0-5.74 3.725l-.001.002a4.684 4.684 0 0 0 1.049 3.969l.009.01 7.958 9.485a.518.518 0 0 0 .79 0l7.968-9.495a4.688 4.688 0 0 0 1.049-3.965 4.803 4.803 0 0 0-3.931-3.794 4.74 4.74 0 0 0-4.023 1.256l-.008.008a2.123 2.123 0 0 1-2.9 0l-.007-.007a4.757 4.757 0 0 0-2.214-1.194z"
    ></path>
  </svg>
</button>
<div class="row border-bottom border-secondary ms-2 mb-md-4">
  <div class="col-5 col-md-6"># Titolo</div>
  <div class="col-4 col-md-4">Riproduzioni</div>
  <div class="col-3 col-md-2">tempo</div>
</div>
<div id="songs"></div>                
  `
  fetchAlbum()
}

// js inerente elementi
const generateSong = (posizione, titolo, artista, riproduzioni, durata, previewUrl, coverUrl) => {
  const divSongs = document.getElementById('songs')
  const divCard = document.createElement('div')
  divCard.classList.add('row', 'card-song')
  divCard.style.cursor = 'pointer'

  // Titolo e artista con posizione
  const divTitle = document.createElement('div')
  divTitle.classList.add('col-5', 'col-md-6', 'my-md-1', 'fw-bold')

  divTitle.innerHTML = `
                        <div class="d-flex align-items-center justify-content-start">
                          <div class="align-middle opacity-50 text-end" style="width: 25px">${posizione}</div>
                          <img src="${coverUrl}" alt="Cover del brano" style="width: 50px; height: 50px; object-fit: cover; border-radius: 10%;" class="ms-3">
                          <div class="ms-3">
                            <div class="fw-bold">${titolo}</div>
                            <p class="fw-normal m-0 opacity-50 mb-2">${artista}</p>
                          </div>
                        </div>
                       `

  // Riproduzioni
  const divRiproduzioni = document.createElement('div')
  divRiproduzioni.classList.add('col-4', 'col-md-4')
  divRiproduzioni.innerText = riproduzioni.toLocaleString()
  divCard.appendChild(divTitle)
  divCard.appendChild(divRiproduzioni)

  // Durata
  const minuti = Math.floor(durata / 60)
  const secondi = durata % 60
  const tempoFormattato = `${minuti}:${secondi < 10 ? '0' + secondi : secondi}`
  const divDurataCanzone = document.createElement('div')
  divDurataCanzone.classList.add('col-3', 'col-md-2')
  divDurataCanzone.innerText = tempoFormattato
  divCard.appendChild(divDurataCanzone)

  divSongs.appendChild(divCard)

  // Aggiunge gestore del click per riproduzione e aggiornamento delle info
  divCard.addEventListener('click', () => {
    const audioPlayer = document.getElementById('audioPlayer')
    const playIcon = document.querySelector('#bottoneplay i')
    audioPlayer.src = previewUrl
    audioPlayer.play()
    playIcon.classList.remove('bi-play-circle-fill')
    playIcon.classList.add('bi-pause-circle-fill')
    updateNowPlayingInfo(titolo, artista, coverUrl)
  })
}

const fetchAlbum = () => {
  fetch(URL_API, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': KEY,
      'X-RapidAPI-Host': HOST,
    },
  })
    .then((response) => {
      return response.json()
    })
    .then((data_response) => {
      console.log(data_response)

      //   Immagine cover
      const imageLinkCover = data_response.cover_medium
      const imgCover = document.getElementById('img-cover')
      imgCover.setAttribute('src', imageLinkCover)

      // titolo Album
      const h1 = document.getElementById('album-title')
      h1.innerText = data_response.title

      // INFO ALBUM
      // IMMAGINE ARTISTA
      const IMG_LINK_ARTIST = data_response.artist.picture_small
      const imgArtist = document.getElementById('img-artist')
      imgArtist.setAttribute('src', IMG_LINK_ARTIST)
      // RESTO DELLE INFO DELL'ARTISTA
      const durationTracks = Math.floor(data_response.duration / 60)
      const remaningSeconds = data_response.duration % 60
      const formattedMinutes = durationTracks
      const formattedSeconds = remaningSeconds

      const tracks = data_response.nb_tracks
      const titoloCantante = data_response.artist.name
      const releaseDate = new Date(data_response.release_date).getFullYear()
      const spanInfoAlbum = document.getElementById('info-album')
      const spanTracks = document.createElement('span')
      const spanReleaseDate = document.createElement('span')
      const spanTitoloCantante = document.createElement('span')
      const spanTime = document.createElement('span')

      spanTracks.innerHTML = `<span style="font-weight: 400;">${tracks} Brani,</span> `
      spanTitoloCantante.innerHTML = `<span style="font-weight: 700;">${titoloCantante} •</span> `
      spanReleaseDate.innerHTML = `<span style="font-weight: 400;">${releaseDate} • </span>`
      spanTime.innerHTML = `<span style="font-weight: 400;"> ${formattedMinutes}min ${formattedSeconds}sec.</span>`
      spanInfoAlbum.appendChild(spanTitoloCantante)
      spanInfoAlbum.appendChild(spanReleaseDate)
      spanInfoAlbum.appendChild(spanTracks)
      spanInfoAlbum.appendChild(spanTime)

      // FINE PARTE INFO ALBUM

      // INIZIO PARTE TRACKS
      // genera tutte le card in base a quante canzoni cu sono nell'album

      data_response.tracks.data.forEach((song, index) => {
        generateSong(index + 1, song.title, song.artist.name, song.rank, song.duration, song.preview, song.album.cover)
      })

      // data_response.tracks.data.forEach((song) => {
      //   generateSong(song.title, song.artist.name, song.rank, song.duration)
      // })

      // FINE PARTE TRACKS

      // click su una traccia
      // Inserire la funzione qui
    })
}

// Artist page

const searchItemsAlbum = () => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '50cb9d0834msh6916f2733fc1e75p1d758cjsnb17cfee22a1d',
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
    },
  }
  fetch(URL_ARTIST, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error('nessuna risposta')
      }
      return response.json()
    })
    .then((result) => {
      console.log(result.data);
      const artistImage = result.data[0].artist.picture_medium; 
      createArtist(artistImage);
      let index = 1;
      result.data.forEach((query) => {
        generateSongAlbum(index, query.title, query.artist.name, query.rank, query.duration, query.preview, query.album.cover);
        index++;
      });
    })
    .catch((error) => {
      console.error('Fetch error:', error.message)
    })
}

const createArtist = (artistImage) => {
  const pos = document.getElementById('containerLaunchHomePage');
  pos.innerHTML = `
  <div id="hero" class="d-flex mt-3 mt-md-5 ms-md-4">
    <div class="img ms-3 me-3 me-md-4" id="">
      <img src="${artistImage}" alt="Immagine dell'artista" id="img-cover" class="rounded" />
    </div>
    <div class="info d-flex flex-column justify-content-between">
      <p class="display-6 mt-5" style="font-size: 50px; font-weith:900;">Artista</p>
      <h1 id="album-title" style="font-weight: 700;"></h1>
      <div id="info-cantante" class="d-flex align-items-center">
        
        <span id="info-album"></span>
      </div>
    </div>
  </div>
  <hr />
  <button class="mb-3 ms-3 btn me-3" id="btn-play">
    <svg
      data-encore-id="icon"
      role="img"
      fill="white"
      aria-hidden="true"
      viewBox="0 0 24 24"
      class="Svg-sc-ytk21e-0 bneLcE"
    >
      <path
        d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"
      ></path>
    </svg>
  </button>
  <button class="mb-3 btn btn-secondary" id="btn-save">
    <svg
      data-encore-id="icon"
      role="img"
      aria-hidden="true"
      viewBox="0 0 24 24"
      class="Svg-sc-ytk21e-0 cqasRA"
      fill="white"
    >
      <path
        d="M5.21 1.57a6.757 6.757 0 0 1 6.708 1.545.124.124 0 0 0 .165 0 6.741 6.741 0 0 1 5.715-1.78l.004.001a6.802 6.802 0 0 1 5.571 5.376v.003a6.689 6.689 0 0 1-1.49 5.655l-7.954 9.48a2.518 2.518 0 0 1-3.857 0L2.12 12.37A6.683 6.683 0 0 1 .627 6.714 6.757 6.757 0 0 1 5.21 1.57zm3.12 1.803a4.757 4.757 0 0 0-5.74 3.725l-.001.002a4.684 4.684 0 0 0 1.049 3.969l.009.01 7.958 9.485a.518.518 0 0 0 .79 0l7.968-9.495a4.688 4.688 0 0 0 1.049-3.965 4.803 4.803 0 0 0-3.931-3.794 4.74 4.74 0 0 0-4.023 1.256l-.008.008a2.123 2.123 0 0 1-2.9 0l-.007-.007a4.757 4.757 0 0 0-2.214-1.194z"
      ></path>
    </svg>
  </button>
  <div class="row border-bottom border-secondary ms-2 mb-md-4">
    <div class="col-5 col-md-6"># Titolo</div>
    <div class="col-4 col-md-4">Riproduzioni</div>
    <div class="col-3 col-md-2">tempo</div>
  </div>
  <div id="songs"></div>`;
};

const generateSongAlbum = (posizione, titolo, artista, riproduzioni, durata, previewUrl, coverUrl) => {
  const divSongs = document.getElementById('songs')
  const divCard = document.createElement('div')
  divCard.classList.add('row', 'card-song')
  divCard.style.cursor = 'pointer'

  // Titolo e artista con posizione e altri dati 
  const divTitle = document.createElement('div')
  divTitle.classList.add('col-5', 'col-md-6', 'my-md-1', 'fw-bold')

  divTitle.innerHTML = `
                        <div class="d-flex align-items-center justify-content-start">
                          <div class="align-middle opacity-50 text-end" style="width: 25px">${posizione}</div>
                          <img src="${coverUrl}" alt="Cover del brano" style="width: 50px; height: 50px; object-fit: cover; border-radius: 10%;" class="ms-3">
                          <div class="ms-3">
                            <div class="fw-bold">${titolo}</div>
                            <p class="fw-normal m-0 opacity-50 mb-2">${artista}</p>
                          </div>
                        </div>
                       `

  // Riproduzioni
  const divRiproduzioni = document.createElement('div')
  divRiproduzioni.classList.add('col-4', 'col-md-4')
  divRiproduzioni.innerText = riproduzioni.toLocaleString()
  divCard.appendChild(divTitle)
  divCard.appendChild(divRiproduzioni)

  // Durata
  const minuti = Math.floor(durata / 60)
  const secondi = durata % 60
  const tempoFormattato = `${minuti}:${secondi < 10 ? '0' + secondi : secondi}`
  const divDurataCanzone = document.createElement('div')
  divDurataCanzone.classList.add('col-3', 'col-md-2')
  divDurataCanzone.innerText = tempoFormattato
  divCard.appendChild(divDurataCanzone)

  divSongs.appendChild(divCard)

  
  divCard.addEventListener('click', () => {
    const audioPlayer = document.getElementById('audioPlayer')
    const playIcon = document.querySelector('#bottoneplay i')
    audioPlayer.src = previewUrl
    audioPlayer.play()
    playIcon.classList.remove('bi-play-circle-fill')
    playIcon.classList.add('bi-pause-circle-fill')
    updateNowPlayingInfo(titolo, artista, coverUrl)
  })
}
