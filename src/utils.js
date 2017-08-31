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
    return Math.floor(Math.random() * (upper - lower)) + lower
  },

  submitScore: (body, server, xhr) => {
    xhr.open('POST', server + '/submit_score', true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(body))
  },

  fetchScores: (server, xhr) => { 
    xhr.open('GET', server + 'scores.json', false)
    
    try {
      xhr.send()
    } catch (err) {
      return []
    }

    var scores = JSON.parse(xhr.responseText)
    scores.sort((a, b) => { return b.points - a.points })

    return scores 
  },

  wakeHeroku: (server, xhr) => { 
    xhr.open('GET', server + 'scores.json', true)
    xhr.send()
  }
}
