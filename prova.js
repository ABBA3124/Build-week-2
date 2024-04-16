// ricerca canzoni Cristian
const inputSearch = document.getElementById('searchGeneral')

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '50cb9d0834msh6916f2733fc1e75p1d758cjsnb17cfee22a1d',
    'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
  },
}

window.onload = () => {
  inputSearch.addEventListener('input', searchItems)
}

const searchItems = (event) => {
  const query = inputSearch.value.trim()
  const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=
                ${encodeURIComponent(query)}`
  if (query !== '') {
    handleFetch(url)
  }
}

const clearPage = () => {
  document.getElementById('containerTitoli').value = ''
  document.getElementById('containerArtist').value = ''
  document.getElementById('containerAlbum').value = ''
}

const handleFetch = async (url) => {
  try {
    const response = await fetch(url, options)
    if (response.ok) {
      const result = await response.json()
      // console.log(result.data)
      clearPage()
      if (result.data.length === 0) {
        const containerTitoli = document.getElementById('containerTitoli')
        containerAlbum.innerHTML = `<p>Non ci sono risultati della ricerca</p>`
      } else {
        displayTrackResults(result.data)
        displayAlbumResults(result.data)
        displayArtistResults(result.data)
      }
    } else {
      throw new Error('Errore nella fetch')
    }
  } catch (error) {
    console.error(error)
  }
}

const displayTrackResults = (results) => {
  const containerTitoli = document.getElementById('containerTitoli')
  let output = `<h2>Risultato più rilevante: <span class="fw-bold">${inputSearch.value.trim()}<span></h2>
  <h3>Brani:</h3>`
  output += `<div class="overflow-scroll overflow-x-hidden" style="height: 260px"><ul>`
  results.forEach((element) => {
    output += `<li class="rounded cardContainer">
                <div class="d-flex align-items-center py-2 ps-2">
                  <img style="border-radius: 4px;" src="${element.album.cover}" alt="immagine inerente al brano" height="50">
                  <div class="ms-2">
                    <p class="fw-bold m-0 mb-2" style="font-size: 15px;">${element.title}</p>
                    <p class="m-0" style="font-size: 12px;">${element.artist.name}</p>
                  </div>
                </div>
              </li>
    `
  })
  output += '</ul></div>'
  containerTitoli.innerHTML = output
}

const displayArtistResults = (results) => {
  const containerArtist = document.getElementById('containerArtist')
  let output = `<h3 class="mt-4">Artisti:</h3>`
  output += `<div class="overflow-scroll overflow-x-hidden d-flex flex-wrap justify-content-evenly" style="height: 165px">`
  results.forEach((element) => {
    output += `<div class="my-2 py-1 px-2 rounded cardContainer">
                <img style="border-radius: 50%;" src="${element.artist.picture}" height="100">
                <p class="fw-bold m-0 mb-2" style="font-size: 15px;">${element.artist.name}</p>
                <p class="m-0" style="font-size: 12px;">Artista</p>
              </div>`
  })
  output += '</div>'
  containerArtist.innerHTML = output
}

const displayAlbumResults = (results) => {
  const containerAlbum = document.getElementById('containerAlbum')
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
  output += '</div>'
  containerAlbum.innerHTML = output
}
// fine ricerca Cristian
