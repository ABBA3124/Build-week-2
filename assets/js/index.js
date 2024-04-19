const params = new URLSearchParams(window.location.search)
const id = params.get('albumId')
const id2 = params.get('artistId')
const URL_ARTIST = `https://deezerdevs-deezer.p.rapidapi.com/search?q=` + id2
const URL_API = 'https://deezerdevs-deezer.p.rapidapi.com/album/' + id
const KEY = 'bc10829072mshb658932a6a8dddep1366a1jsn27a0e20c2896'
const HOST = 'deezerdevs-deezer.p.rapidapi.com'

//const riguardanti "avanti indietro"
const id3 = params.get('search')
const value = params.get('value')

// controllo sulla homepage
// aggiunto questo nuovo metodo di manipolazione dell'url tramite il limit cosi da poterlo adattare come vogliamo noi ⚠️
const limitTrack = 64 // con questa constante posso cambiare il numero di Track da visualizzare nella homepage ⚠️
const limitArtist = 8 // con questa constante posso cambiare il numero di Artist da visualizzare nella homepage ⚠️
//quest'ultima siccome usa sempre lo stesso parametro di quantità manipolerà sia homepage che search 🚀🚀🚀🚀🚀
const limitAlbumAndSearch = 24 // con questa constante posso cambiare il numero di Album da visualizzare nella homepage ⚠️

//controllo sul cerca (SEARCH)
const limitTrackSearch = 64 // con questa constante posso cambiare il numero di Track QUANDO SI CERCA da visualizzare nella SEARCH ⚠️
const limitArtistSearch = 24 // con questa constante posso cambiare il numero di Artist QUANDO SI CERCA da visualizzare nella SEARCH ⚠️
const limitAlbumSearch = 24 // con questa constante posso cambiare il numero di Album QUANDO SI CERCA da visualizzare nella SEARCH ⚠️

// da qui al caricamento del dom iniziamo ad avviare funzioni che si occupano di far spawnare home page
// document.addEventListener("DOMContentLoaded", () => {
//   if (id) {
//     // console.log(URL_API)
//     createAlbum()
//   } else if (id2) {
//     // console.log(URL_ARTIST)
//     searchItemsAlbum()
//     // createAlbum2()
//   } else {
//     searchRandomTracks()
//   }
// })

document.addEventListener('DOMContentLoaded', () => {
  if (id) {
    createAlbum()
  } else if (id2) {
    searchItemsAlbum()
    // Gestione cambio pagine
    indietro.addEventListener('click', () => {
      window.location.href = 'index.html'
    })
  } else if (id3) {
    inputCerca.value = id3
    searchItems()
  } else {
    searchRandomTracks()
    avanti.addEventListener('click', () => {
      window.location.href = `index.html?search=${value}`
    })
  }
})

//quando si preme sul home ricarica la pagina come al caricamento del dom tramite la searchRandomTracks()
// non toccare Pena distruzione di molte funzioni
homeButton.addEventListener('click', function () {
  searchRandomTracks()
  let searchArea = document.getElementById('searchArea')
  searchArea.style.display = 'none'
})

//creo un piccolo array dove che usamo come queri iniziali per far spawnare la homepage "casuale"
function searchRandomTracks() {
  const randomQueries = ['sfera', 'classical', 'metal']
  const query = randomQueries[Math.floor(Math.random() * randomQueries.length)]
  const urlTrack = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodeURIComponent(query)}&limit=${limitTrack}` //URL MANIPOLATO TRAMITE LIMIT questo manipola track homepage
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '50cb9d0834msh6916f2733fc1e75p1d758cjsnb17cfee22a1d',
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
    },
  }

  //fetch manipolata per track con url limit
  fetch(urlTrack, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error('nessuna risposta riguardo TRACK HOMEPAGE')
      }
      return response.json()
    })
    .then((result) => {
      // console.log(result.data)
      console.log('TRACK HOMEPAGE ha funzionato! sono stati caricati con successo')
      displayResults2(result.data, query) //avvia la funzione che fa vedere le track sulla homepage
    })
    .catch((error) => {
      console.error('Fetch error:', error.message)
    })

  //fetch manipolata per artist con url limit
  const urlArtist = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodeURIComponent(query)}&limit=${limitArtist}` //URL MANIPOLATO TRAMITE LIMIT questo manipola artist homepage

  fetch(urlArtist, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error('nessuna risposta riguardo ARTIST HOMEPAGE')
      }
      return response.json()
    })
    .then((result) => {
      // console.log(result.data)
      console.log('ARTIST HOMEPAGE ha funzionato! sono stati caricati con successo')
      displayArtistResults2(result.data, query) //avvia la funzione che fa vedere le artist sulla homepage
    })
    .catch((error) => {
      console.error('Fetch error:', error.message)
    })

  //fetch manipolata per album con url limit
  const urlAlbum = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodeURIComponent(query)}&limit=${limitAlbumAndSearch}` //URL MANIPOLATO TRAMITE LIMIT questo manipola album homepage

  fetch(urlAlbum, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error('nessuna risposta riguardo ALBUM HOMEPAGE')
      }
      return response.json()
    })
    .then((result) => {
      // console.log(result.data)
      console.log('ALBUM HOMEPAGE ha funzionato! sono stati caricati con successo')
      displayAlbumResults2(result.data, query) //avvia la funzione che fa vedere le album sulla homepage
    })
    .catch((error) => {
      console.error('Fetch error:', error.message)
    })
}

//funzione che fa vedere le track sulla homepage tramite innerhtml
function displayResults2(results, query) {
  const containerTitoli = document.getElementById('containerTitoli')
  let output = `
                <div id="martucci" class="mt-3 row overflow-scroll overflow-x-hidden" style="height: 280px" >`
  results.forEach((element) => {
    output += `<div class="col-12 col-sm-6 col-md-4 col-lg-3 ">
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

//funzione che fa vedere le artist sulla homepage tramite innerhtml
function displayArtistResults2(results, query) {
  console.log('risultati per ${query}:', results)
  const containerArtist = document.getElementById('containerArtist')

  let output = `<h3 class="mt-4">Artisti</h3>`
  output += `<div class="row row-cols-8">`
  const artistList = artistFilter(results)
  artistList.forEach((element) => {
    output += `<a class="col" href="../../../index.html?artistId=${element.artist.name}">
                <div class="my-2 py-1 px-2 rounded cardContainer">
                <img style="border-radius: 50%; aspect-ratio:1/1; display:block;" class="w-100"  src="${element.artist.picture}" >
                <p class="fw-bold m-0 mb-2" style="font-size: 15px;">${element.artist.name}</p>
                <p class="m-0" style="font-size: 12px;">Artista</p>
              </div></a>`
  })
  output += `</div>`
  containerArtist.innerHTML = output
}

//funzione che fa vedere le album sulla homepage tramite innerhtml
function displayAlbumResults2(results, query) {
  console.log('risultati per ${query}:', results)
  const containerAlbum = document.getElementById('containerAlbum')

  let output = `<h3 class="mt-4">Album</h3>`
  output += `<div class="row row-cols-6" >`
  const albumList = artistFilter(results)
  albumList.forEach((element) => {
    output += `<a class="col albumCard" href="../../../index.html?albumId=${element.album.id}">
    <div class=" rounded cardContainer text-left">
      <img style="border-radius: 6px; display:block; aspect-ratio:1/1; " class="w-100" src="${element.album.cover}" >
      <p class="mb-1 fw-bold " style="font-size: 12px;">${element.album.title}</p>
      <p class="mt-0" style="font-size: 10px;">2018 • ${element.artist.name}</p>
    </div>
  </a>`
  })
  output += `</div>`
  containerAlbum.innerHTML = output
}
// fine logica homepage

// inizio logica cerca tramite bottone al click
//funziona  simile a quella di homepage tranna qualcosina
const btnCerca = document.getElementById('searchTrigger')
const inputCerca = document.getElementById('searchGeneral')

// Funzione per gestire la ricerca quando si clicca sul bottone cerca posto nella homepage
function searchItems() {
  const queries = inputCerca.value.trim().split()
  queries.forEach((query) => {
    const urlTrackSearch = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodeURIComponent(query)}&limit=${limitTrackSearch}`
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '50cb9d0834msh6916f2733fc1e75p1d758cjsnb17cfee22a1d',
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
      },
    }

    fetch(urlTrackSearch, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error('nessuna risposta riguardo Track HOMEPAGE')
        }
        return response.json()
      })
      .then((result) => {
        // console.log(result.data)
        //Gestione dei pulsanti avanti indietro
        avanti.addEventListener('click', () => {
          if (value === 'album') {
            window.location.href = `index.html?albumId=${result.data[0].album.id}`
          } else if (value === 'artist') {
            window.location.href = `index.html?artistId=${result.data[0].artist.name}`
          }
        })
        indietro.addEventListener('click', () => {
          window.location.href = `index.html?value=${id3}`
        })
        console.log('TRACK SEARCH ha funzionato! sono stati caricati con successo')
        displayResults(result.data, query)
      })
      .catch((error) => {
        console.error('Fetch error:', error.message)
      })

    const urlArtistSearch = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodeURIComponent(query)}&limit=${limitArtistSearch}`
    fetch(urlArtistSearch, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error('nessuna risposta riguardo ARTIST HOMEPAGE')
        }
        return response.json()
      })
      .then((result) => {
        // console.log(result.data)
        console.log('ARTIST SEARCH ha funzionato! sono stati caricati con successo')
        displayArtistResults(result.data, query)
      })
      .catch((error) => {
        console.error('Fetch error:', error.message)
      })

    const urlAlbumSearch = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodeURIComponent(query)}&limit=${limitAlbumAndSearch}`
    fetch(urlAlbumSearch, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error('nessuna risposta riguardo ALBUM HOMEPAGE')
        }
        return response.json()
      })
      .then((result) => {
        // console.log(result.data)
        console.log('ALBUM SEARCH ha funzionato! sono stati caricati con successo')
        displayAlbumResults(result.data, query)
      })
      .catch((error) => {
        console.error('Fetch error:', error.message)
      })
  })
}

// Ascolta l'evento di input sul campo di ricerca
inputCerca.addEventListener('input', searchItems)

// da qui inizia a
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

  // <h3 style="font-weight: 800;">Brani</h3><div class="d-flex" style="height: 260px">
  let output = `
  <h2 class="fs-6">Risultato più rilevante: <span class="fw-bold">${inputCerca.value.trim()}</span></h2>
  <div class="d-flex" style="height: 260px">
  <div id="martucciTrackSearch" class="ms-3 mt-2 p-4 me-3 position-relative rounded icon-play-overlay3" style="width:41%;">
  <button class="icon-da-sistemare rounded-circle p-2 bg-success border-0 search-result-item" data-audio-src="${results[0].preview}" data-title="${
    results[0].title
  }" data-artist="${results[0].artist.name}" data-album-cover="${
    results[0].album.cover
  }"> <svg data-encore-id="icon" role="img" fill="black" aria-hidden="true" viewBox="0 0 24 24" " height="50" class="">
    <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
  </svg>
  </button>
    <span class="search-result-item" data-audio-src="${results[0].preview}" data-title="${results[0].title}" data-artist="${results[0].artist.name}" data-album-cover="${
    results[0].album.cover
  }"><img class="rounded-circle" src="${results[0].album.cover}" alt="immagine inerente al brano" height="100px"></span>
    <p class="m-0 fs-5" style="font-size: 12px; font-weight:bold; ">${results[0].artist.name}</p>
    <p class="fw-bold m-0 mb-2 fs-3" style="font-size: 15px;">${results[0].title}</p>
    <h6 class="text-secondary">Artista</h6>
  </div>
  <div class="d-flex flex-column flex-grow-1">
  <h3 class="ms-3" style="font-weight: 800;">Brani</h3>
  <div id="martucci" class="overflow-scroll overflow-x-hidden d-flex flex-column align-items-baseline" style="height: 259px">`
  const songs = results.slice(1)
  songs.forEach((element) => {
    output += `<ul class="w-100"><li class="search-result-item" data-audio-src="${element.preview}" data-title="${element.title}" data-artist="${element.artist.name}" data-album-cover="${element.album.cover}">

                <div class="d-flex" style="cursor: pointer;">
                  <img src="${element.album.cover}" alt="immagine inerente al brano" height="50">
                  <i class="bi bi-play-fill icon-play-overlay2"></i>
                  <div class="ms-2 m-auto">
                    <p class="fw-bold m-0 mb-2" style="font-size: 15px;">${element.title}</p>
                    <p class="m-0" style="font-size: 12px;">${element.artist.name}</p>
                  </div>
                  <div class="me-2">${element.duration}</div>
                </div>
              </li></ul>`
  })
  output += `</div></div></div>`
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
  let output = `<h3 class="mt-4" style="font-weight: 800;">Artisti</h3>`
  output += `<div class="row row-cols-6">`
  //logica per filtrare gli artisti
  const artistList = artistFilter(results)
  artistList.forEach((element) => {
    output += `<a class="col" href="../../../index.html?artistId=${element.artist.name}">
                <div class="my-2 py-1 px-2 rounded cardContainer">
                <img style="border-radius: 50%; display:block; aspect-ratio:1/1;" class="w-100"  src="${element.artist.picture}" >
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

//logica per filtrare gli artisti
const artistFilter = (results) => {
  const list = []
  results.forEach((song) => {
    list.push(song.artist.id)
  })
  const artistList = results.filter((song, index, self) => self.findIndex((e) => e.artist.id === song.artist.id) === index)
  return artistList
}

function displayAlbumResults(results, query) {
  console.log('risultati per ${query}:', results)
  const containerAlbum = document.getElementById('containerAlbum')
  if (results.length === 0) {
    containerAlbum.innerHTML = ``
    return
  }
  let output = `<h3 class="mt-4" style="font-weight: 800;">Album</h3>`
  output += `<div class="row row-cols-6" >`
  //logica per filtrare gli album
  const albumList = artistFilter(results)
  albumList.forEach((element) => {
    output += `<a class="col" href="../../../index.html?albumId=${element.album.id}">
                <div class=" rounded cardContainer text-left">
                  <img style="border-radius: 6px; aspect-ratio:1/1;" class="w-100 d-block" src="${element.album.cover}" >
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

//logica per filtrare gli album
const albumFilter = (results) => {
  const list = []
  results.forEach((song) => {
    list.push(song.album.id)
  })
  const albumList = results.filter((song, index, self) => self.findIndex((e) => e.album.id === song.album.id) === index)
  return albumList
}

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

const albumhomepage = document.getElementById('albumhomepage1')
const albumhomepage2 = document.getElementById('albumhomepage2')
const albumhomepage3 = document.getElementById('albumhomepage3')
const albumhomepage4 = document.getElementById('albumhomepage4')

btnCerca.addEventListener('click', function () {
  let searchArea = document.getElementById('searchArea')
  if (searchArea.style.display === 'none' || searchArea.style.display === '') {
    searchArea.style.display = 'flex'
    albumhomepage.style.display = 'none'
    albumhomepage2.style.display = 'none'
    albumhomepage3.style.display = 'none'
    albumhomepage4.style.display = 'none'
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
// tutto quello che succete quando si preme sull'album

const createAlbum = () => {
  if (albumhomepage.style.display === 'none' || albumhomepage.style.display === '') {
    searchArea.style.display = 'flex'
    albumhomepage.style.display = 'none'
    albumhomepage2.style.display = 'none'
    albumhomepage3.style.display = 'none'
    albumhomepage4.style.display = 'none'
  } else {
    searchArea.style.display = 'none'
  }

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
  <div class="col-3 col-md-2"><svg data-encore-id="icon" role="img" fill="#ffff" height="20" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 dYnaPI mb-1">
  <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
  <path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"></path>
</svg>
</div>
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
      // console.log(data_response)
      // Gestione cambio pagine avanti indietro
      console.log()
      indietro.addEventListener('click', () => {
        window.location.href = `index.html?value=album&search=${data_response.title}`
      })

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

      data_response.tracks.data.forEach((song, index) => {
        generateSong(index + 1, song.title, song.artist.name, song.rank, song.duration, song.preview, song.album.cover)
      })
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
      console.log(result.data)
      // Gestione cambio pagine avanti indietro
      indietro.addEventListener('click', () => {
        window.location.href = `index.html?value=artist&search=${result.data[0].artist.name}`
      })

      if (result.data.length > 0) {
        const firstItem = result.data[0]
        createArtist(firstItem.artist.picture_medium, firstItem.album.title, firstItem.artist.name, firstItem.rank, firstItem.duration, firstItem.preview, firstItem.album.cover)
      }
      let index = 1
      result.data.forEach((query) => {
        generateSongAlbum(index, query.title, query.artist.name, query.rank, query.duration, query.preview, query.album.cover)
        index++
      })
    })
    .catch((error) => {
      console.error('Fetch error:', error.message)
    })
}

const createArtist = (artistImage, posizione, titolo, artista, riproduzioni, durata, previewUrl, coverUrl) => {
  if (albumhomepage.style.display === 'none' || albumhomepage.style.display === '') {
    searchArea.style.display = 'flex'
    albumhomepage.style.display = 'none'
    albumhomepage2.style.display = 'none'
    albumhomepage3.style.display = 'none'
    albumhomepage4.style.display = 'none'
  } else {
    searchArea.style.display = 'none'
  }
  const pos = document.getElementById('containerLaunchHomePage')
  pos.innerHTML = `

  <div id="hero" class="d-flex mt-3 mt-md-5 ms-md-4">
    <div class="img ms-3 me-3 me-md-4" id="">
      <img src="${artistImage}" alt="Immagine dell'artista" id="img-cover" class="rounded" />
    </div>
    <div class="info d-flex flex-column justify-content-between">
      <p class="display-6 mt-5" style="font-size: 80px; font-weight :900;">${titolo} </p>
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
    <div class="col-3 col-md-2"><svg data-encore-id="icon" role="img" fill="#ffff" height="20" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 dYnaPI mb-1">
    <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
    <path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"></path>
  </svg></div>
  </div>
  <div id="songs"></div>`
}

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

// comportamento footer svg

function toggleColor(element) {
  const isGreen = element.getAttribute('fill') === '#00FF00' // Verde
  element.setAttribute('fill', isGreen ? '#FFFFFF' : '#00FF00') // Cambia tra bianco e verde
}
