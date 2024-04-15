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
  })
}
