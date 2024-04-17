// DICHIARAZIONI GENERALI
const KEY = 'bc10829072mshb658932a6a8dddep1366a1jsn27a0e20c2896'
const HOST = 'deezerdevs-deezer.p.rapidapi.com'

const params = new URLSearchParams(window.location.search)
const id = params.get('albumId')
const URL_API = 'https://deezerdevs-deezer.p.rapidapi.com/album/' + id

const divSongs = document.getElementById('songs')

// funzione per la creazione delle card Canzoni

const generateSong = (titolo, artista, riproduzioni, tempo) => {
  // div generale della card
  const divCard = document.createElement('div')
  divCard.classList.add('row', 'card-song')

  // title della card
  const divTitle = document.createElement('div')
  divTitle.classList.add('col-5', 'col-md-6', 'my-md-1', 'fw-bold')
  divTitle.innerText = titolo
  const pArtista = document.createElement('p')
  pArtista.classList.add('fw-normal')
  pArtista.innerText = artista
  divTitle.appendChild(pArtista)
  divCard.appendChild(divTitle)
  // riproduzioni
  const divRiproduzioni = document.createElement('div')
  divRiproduzioni.classList.add('col-4', 'col-md-4')
  divRiproduzioni.innerText = riproduzioni
  divCard.appendChild(divRiproduzioni)

  // durata canzone
  tempo = Math.ceil(tempo / 60)
  const divDurataCanzone = document.createElement('div')
  divDurataCanzone.classList.add('col-3', 'col-md-2')
  divDurataCanzone.innerText = `${tempo} min`
  divCard.appendChild(divDurataCanzone)

  divSongs.appendChild(divCard)
}
// fine funzione

document.addEventListener('DOMContentLoaded', () => {
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

      //  INFO ALBUM
      // IMMAGINE ARTISTA
      const IMG_LINK_ARTIST = data_response.artist.picture_small
      const imgArtist = document.getElementById('img-artist')
      imgArtist.setAttribute('src', IMG_LINK_ARTIST)
      // RESTO DELLE INFO DELL'ARTISTA
      const durationTracks = (data_response.duration / 60).toString().split('.')
      let min = durationTracks[0]
      min = parseInt(min)

      let sec = durationTracks[1]
      sec = sec.substring(0, 2)
      sec = parseInt(sec)

      const tracks = data_response.nb_tracks
      const titoloCantante = data_response.artist.name
      const releaseDate = new Date(data_response.release_date).getFullYear()
      const spanInfoAlbum = document.getElementById('info-album')
      const spanTracks = document.createElement('span')
      const spanReleaseDate = document.createElement('span')
      const spanTitoloCantante = document.createElement('span')
      const spanTime = document.createElement('span')

      spanTracks.innerText = `${tracks} Brani ◦ `
      spanTitoloCantante.innerText = `${titoloCantante} ◦ `
      spanReleaseDate.innerText = `${releaseDate} ◦ `
      spanTime.innerText = `${min}min ${sec}sec`
      spanInfoAlbum.appendChild(spanTitoloCantante)
      spanInfoAlbum.appendChild(spanTracks)
      spanInfoAlbum.appendChild(spanReleaseDate)
      spanInfoAlbum.appendChild(spanTime)

      //   FINE PARTE INFO ALBUM

      // INIZIO PARTE TRACKS
      // genera tutte le card in base a quante canzoni cu sono nell'album
      data_response.tracks.data.forEach((song) => {
        generateSong(song.title, song.artist.name, song.rank, song.duration)
      })
      // FINE PARTE TRACKS

      // click su una traccia
      // Inserire la funzione qui
    })
})
