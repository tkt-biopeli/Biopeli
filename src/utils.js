

/**
 * Utility functions
 */
export default {
  centerGameObjects: (objects) => {
    objects.forEach(function (object) {
      object.anchor.setTo(0.5)
    })
  },
  randomNoBounds: () => {
    return Math.random()
  },
  randomWithBounds: (lower, upper) => {
    return Math.floor(Math.random() * upper + lower)
  },

  submitScore: (body, server) => {
    var xhr = new XMLHttpRequest()
    xhr.open('POST', server + '/submit_score', true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(body))
  },

  fetchScores: (server) => { 
    var xhr = new XMLHttpRequest()
    xhr.open("GET", server + 'scores.json', false)
    xhr.send()

    var scores = JSON.parse(xhr.responseText)
    scores.sort((a, b) => {return b.points - a.points})

    return scores 
  }
}
