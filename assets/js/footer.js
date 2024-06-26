const audioPlayer = document.getElementById('audioPlayer')
const progress = document.getElementById('progress')
const progressContainer = document.getElementById('progressContainer')
const currentTimeElement = document.getElementById('current-time')
const durationElement = document.getElementById('duration')

document.addEventListener("DOMContentLoaded", function() {
  if (audioPlayer) {
    audioPlayer.volume = 0.5;  // allo start volume è 50% troppo forte al 100 ahahha
  }
});



audioPlayer.addEventListener('loadedmetadata', () => {
  durationElement.textContent = formatTime(audioPlayer.duration)
})

audioPlayer.addEventListener('timeupdate', updateProgress)

function togglePlay() {
  const audioPlayer = document.getElementById('audioPlayer')
  const playIcon = document.querySelector('#bottoneplay i')

  if (audioPlayer.paused || audioPlayer.ended) {
    audioPlayer.play()
    playIcon.classList.remove('bi-play-circle-fill')
    playIcon.classList.add('bi-pause-circle-fill')
  } else {
    audioPlayer.pause()
    playIcon.classList.remove('bi-pause-circle-fill')
    playIcon.classList.add('bi-play-circle-fill')
  }
}

function updateProgress() {
  const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100
  progress.style.width = `${percentage}%`
  currentTimeElement.textContent = formatTime(audioPlayer.currentTime)
}

function formatTime(time) {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

progressContainer.addEventListener('click', setProgress)

function setProgress(e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const duration = audioPlayer.duration
  audioPlayer.currentTime = (clickX / width) * duration
}

function setVolume(value) {
  const audioPlayer = document.getElementById('audioPlayer')
  const volumeSlider = document.getElementById('volumeSlider')
  audioPlayer.volume = value

  // Aggiorna il colore in tempo reale
  const percentage = value * 100
  volumeSlider.style.background = `linear-gradient(to right, green 0%, green ${percentage}%, #333 ${percentage}%, #333 100%)`

  updateVolumeIcon(percentage) // Aggiorna l'icona del volume
}

document.getElementById('volumeSlider').addEventListener('input', function () {
  const percentage = this.value * 100
  this.style.background = `linear-gradient(to right, green 0%, green ${percentage}%, #333 ${percentage}%, #333 100%)`
  updateVolumeIcon(percentage) // Aggiorna l'icona del volume durante l'input
})

document
  .getElementById('volumeSlider')
  .addEventListener('mouseout', function () {
    const percentage = this.value * 100
    this.style.background = `linear-gradient(to right, white 0%, white ${percentage}%, #333 ${percentage}%, #333 100%)`
  })

document
  .getElementById('volumeSlider')
  .addEventListener('mouseover', function () {
    const percentage = this.value * 100
    this.style.background = `linear-gradient(to right, green 0%, green ${percentage}%, #333 ${percentage}%, #333 100%)`
  })

function updateVolumeIcon(percentage) {
  const volumeIconContainer = document.getElementById(
    'cambioIconaInBaseAlVolume'
  )
  volumeIconContainer.innerHTML = getVolumeIcon(percentage) // Imposta l'icona appropriata
}


//funzione per la giusta icona del volume 
function getVolumeIcon(percentage) {
  if (percentage === 0) {
    return '<i class="bi bi-volume-mute  fs-5"></i>'
  } else if (percentage < 15) {
    return '<i class="bi bi-volume-off  fs-5"></i>'
  } else if (percentage < 50) {
    return '<i class="bi bi-volume-down fs-5"></i>'
  } else {
    return '<i class="bi bi-volume-up fs-5"></i>'
  }
}

// Gestione del clic sull'icona del volume per mutare/demutare
cambioIconaInBaseAlVolume.addEventListener('click', () => {
  if (audioPlayer.volume > 0) {
    audioPlayer.volume = 0
    volumeSlider.value = 0
    updateVolumeIcon(0) // Aggiorna l'icona a mutato
  } else {
    let lastVolume = 0.5
    audioPlayer.volume = lastVolume
    volumeSlider.value = lastVolume
    updateVolumeIcon(lastVolume * 100) // Ripristina l'icona e il volume al 50%
  }
})


// comportamento footer svg

function toggleColor(element) {
  const isGreen = element.getAttribute('fill') === '#00FF00'; // Verde
  element.setAttribute('fill', isGreen ? '#FFFFFF' : '#00FF00'); // Cambia tra bianco e verde
}