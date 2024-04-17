const URL = 'https://deezerdevs-deezer.p.rapidapi.com/artist/115'
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '50cb9d0834msh6916f2733fc1e75p1d758cjsnb17cfee22a1d',
    'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
  },
}

window.onload = () => {
  fetchArtist()
}

const fetchArtist = async () => {
  try {
    const response = await fetch(URL, options)
    const result = await response.json()
    console.log(result)
    console.log(result.tracklist)
    // createArtistPage(result)
  } catch (error) {
    console.error(error)
  }
}

const fetchListArtist2 = async (url) => {
  try {
    const response = await fetch(url)
    const result = await response.json()
    console.log(result)
  } catch (error) {
    console.error(error)
  }
}

const fetchListArtist = async () => {
  try {
    const response = await fetch('https://api.deezer.com/artist/115/top?limit=50')
    const result = await response.json()
    console.log(result)
  } catch (error) {
    console.error(error)
  }
}

const createArtistPage = (result) => {
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
  //   fetchListArtist(result.tracklist)
  console.log(result)
  fetchListArtist()
}

const url = 'https://api.deezer.com/artist/115/top?limit=50'

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    // Fai qualcosa con i dati
    console.log(data)
  })
  .catch((error) => {
    console.error('Errore nella richiesta:', error)
  })
