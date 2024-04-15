const url = 'https://deezerdevs-deezer.p.rapidapi.com/search?q=maneskin'
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '50cb9d0834msh6916f2733fc1e75p1d758cjsnb17cfee22a1d',
    'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
  },
}

window.onload = () => {
  handleFetch()
}

const handleFetch = async () => {
  try {
    const response = await fetch(url, options)
    const result = await response.json()
    read(result.data)
  } catch (error) {
    console.error(error)
  }
}

const read = (result) => {
  result.forEach((element) => {
    const title = element.title
    console.log(title)
    const type = element.type
    console.log(type)
    const artist = element.artist.name
    console.log(artist)
    console.log('prova')
  })
}
