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
//AGGIONRA SCRITTA BADGE
function updateBadgeTime() {
  const badges = document.querySelectorAll('.last-activity')

  badges.forEach((badge, index) => {
    const lastUserEventTime = lastUserEventTimes[index]
    const currentTime = new Date().getTime()
    const timeDifference = Math.floor((currentTime - lastUserEventTime) / 1000)

    if (index < 2) {
      const minutesAgo = Math.floor(timeDifference / 60)
      if (minutesAgo === 0) {
        badge.innerText = 'Online'
        badge.classList.remove('bg-dark')
        badge.classList.add('bg-success')
      } else if (minutesAgo === 1) {
        badge.innerText = '1 min fa'
      } else if (minutesAgo < 60) {
        badge.innerText = minutesAgo + ' min fa'
      } else {
        const hoursAgo = Math.floor(minutesAgo / 60)
        if (hoursAgo === 1) {
          badge.innerText = '1 ora fa'
        } else {
          badge.innerText = hoursAgo + ' ore fa'
        }
      }

      // DOPO 60 SEC, CAMBIA COLORE BACKGROUND
      if (timeDifference === 60) {
        badge.classList.remove('bg-success')
        badge.classList.add('bg-dark')
      }
    } else {
      if (timeDifference < 3600) {
        badge.innerText = 'Online'
        badge.classList.remove('bg-dark')
        badge.classList.add('bg-success')
      } else {
        // Altrimenti, visualizza l'ultimo evento come "Offline"
        if (index === lastUserEventTimes.length - 2) {
          badge.innerText = '14 ore fa' // Ultimo evento del penultimo utente 14 ore fa
        } else if (index === lastUserEventTimes.length - 1) {
          badge.innerText = '3 ore fa' // Ultimo evento dell'ultimo utente 3 ore fa
        } else {
          badge.innerText = 'Offline'
        }
        badge.classList.remove('bg-success')
        badge.classList.add('bg-dark')
      }
    }
  })
}

updateBadgeTime()

setInterval(updateBadgeTime, 60000)
