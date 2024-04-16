// window.onload = () => {
//   handleFetch()
// }

// const handleFetch = async () => {
//   try {
//     const response = await fetch(url, options)
//     const result = await response.json()
//     read(result.data)
//   } catch (error) {
//     console.error(error)
//   }
// }

// const read = (result) => {
//   result.forEach((element) => {
//     const title = element.title
//     console.log(title)
//     const type = element.type
//     console.log(type)
//     const artist = element.artist.name
//     console.log(artist)
//   })
// }

const btnCerca = document.getElementById('btnSearchGeneral')
const inputCerca = document.getElementById('searchGeneral')

function searchItems() {
  const query = inputCerca.value.trim()
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
    .then(response => {
      if (!response.ok) {
        throw new Error('nessuna risposta')
      }
      return response.json()
    })
    .then(data => {
      console.log(data.data)
      displayResults(data.data)
    })
    .catch(error => {
      console.error('Fetch error:', error.message)
    })
}

btnCerca.addEventListener('click', searchItems)

function displayResults(results) {
  const containerTitoli = document.getElementById('containerTitoli')
  if (results.length === 0) {
    containerTitoli.innerHTML = `<p>Non ci sono risultati della ricerca</p>`
    return
  }
  let output = `<h2>Risultato più rilevante: <span class="fw-bold">${inputCerca.value.trim()}<span></h2>
  <h3>Brani:</h3>`
  output += `<div class="overflow-scroll overflow-x-hidden" style="height: 500px">`
  results.forEach(element => {
    output += '<ul>'
    output += `<li><div class="d-flex"><img style="border-radius: 4px;" src="${element.album.cover}" alt="immagine inerente al brano" height="50"><div class="ms-2"><p class="fw-bold m-0 mb-2" style="font-size: 15px;">${element.title}</p><p class="m-0" style="font-size: 12px;">${element.artist.name}</p></div></div></li>
    `
    output += '</ul>'
  })
  output += '</div>'
  containerTitoli.innerHTML = output
}

{
  /* <li><div><img src="${element.album.cover_small}" alt="immagine inerente al brano"><div><h3>${element.title}</h3><p>${element.artist.name}</p></div></div></li> */
}

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

//FUNZIONE PER RIMUOVERE UNA PLAYLIST CON EFFETTO DI FADE-OUT
function removePlaylistWithFadeOut(playlist) {
  playlist.style.transition = 'opacity 0.3s ease'
  playlist.style.opacity = 0
  setTimeout(() => {
    playlist.remove()
  }, 300)
}

//BOTTONI PER ELIMNARE LE PLAYLISTE//

document.querySelectorAll('.playlist').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.querySelector('.delete-playlist').classList.remove('d-none')
  })

  item.addEventListener('mouseleave', () => {
    item.querySelector('.delete-playlist').classList.add('d-none')
  })
})

document.querySelectorAll('.playlist').forEach(item => {
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
