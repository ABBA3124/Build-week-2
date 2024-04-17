
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
    const formattedMinutes = formatTime(durationTracks)
    const formattedSeconds = formatTime(remaningSeconds)
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

    spanTracks.innerHTML = `<span style="font-weight: 500;">${tracks} Brani,</span> `
    spanTitoloCantante.innerHTML = `<span style="font-weight: 700;">${titoloCantante} •</span> `
    spanReleaseDate.innerHTML = `<span style="font-weight: 500;">${releaseDate} • </span>`
    spanTime.innerHTML = `<span style="font-weight: 500;"> ${formattedMinutes}min ${formattedSeconds}sec.</span>`
    spanInfoAlbum.appendChild(spanTitoloCantante)
    spanInfoAlbum.appendChild(spanReleaseDate)
    spanInfoAlbum.appendChild(spanTracks)
    spanInfoAlbum.appendChild(spanTime)


}}