let lastUserEventTimes = Array.from(
  document.querySelectorAll('.last-activity')
).map((_, index, array) => {
  if (index === array.length - 2) {
    return new Date().getTime() - 14 * 60 * 60 * 1000
  } else if (index === array.length - 1) {
    return new Date().getTime() - 3 * 60 * 60 * 1000
  } else {
    return new Date().getTime()
  }
})

window.addEventListener('click', () => {
  lastUserEventTimes = lastUserEventTimes.map(() => new Date().getTime())
})

function updateBadgeTime() {
  const badges = document.querySelectorAll('.last-activity')

  badges.forEach((badge, index) => {
    const lastUserEventTime = lastUserEventTimes[index]
    const currentTime = new Date().getTime()
    const timeDifference = Math.floor((currentTime - lastUserEventTime) / 1000)

    if (index < 2) {
      // Se l'utente è il primo o il secondo, calcola il tempo trascorso dall'ultimo evento e visualizzalo come minuti o ore fa
      const minutesAgo = Math.floor(timeDifference / 60)
      if (minutesAgo === 0) {
        badge.innerText = 'Online'
        badge.classList.remove('bg-dark')
        badge.classList.add('bg-success')
      } else if (minutesAgo === 1) {
        badge.innerText = '1 min fa'
        badge.classList.remove('bg-dark')
        badge.classList.add('bg-success')
      } else if (minutesAgo < 60) {
        badge.innerText = minutesAgo + ' min fa'
        badge.classList.remove('bg-dark')
        badge.classList.add('bg-success')
      } else {
        const hoursAgo = Math.floor(minutesAgo / 60)
        if (hoursAgo === 1) {
          badge.innerText = '1 ora fa'
        } else {
          badge.innerText = hoursAgo + ' ore fa'
        }

        // Se sono passati esattamente 60 secondi, cambia il colore del badge
        if (timeDifference === 60) {
          badge.classList.remove('bg-success')
          badge.classList.add('bg-dark')
        }
      }
    } else {
      // Se l'utente è il terzo, quarto o quinto e non è passato più di un'ora dall'ultimo evento, consideralo online
      if (timeDifference < 3600) {
        badge.innerText = 'Online'
        badge.classList.remove('bg-dark')
        badge.classList.add('bg-success')
      } else {
        // Altrimenti, visualizza l'ultimo evento come "Offline"
        badge.innerText = 'Offline'
        badge.classList.remove('bg-success')
        badge.classList.add('bg-dark')
      }
    }
  })
}

updateBadgeTime()

setInterval(updateBadgeTime, 60000)
