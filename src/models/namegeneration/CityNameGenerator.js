import cityNames from './CityNameList'

export default class CityNameGenerator {
  generateName () {
    var first = this.getRandomId()
    var second = this.getRandomId()
    if (second === first) {
      second++
      if (second === cityNames.length) {
        second = 0
      }
    }

    var name = this.getStart(first) + this.getEnd(second, first)

    return name
  }

  getStart (id) {
    var no = cityNames[id]

    if (no.full != null) {
      return no.name.slice(0, no.full)
    }

    return no.name.slice(0, no.point)
  }

  getEnd (id, first) {
    var no = cityNames[id]

    if (cityNames[first].full != null) {
      return no.name
    }

    return no.name.slice(no.point)
  }

  getRandomId () {
    var r = Math.random()
    return Math.floor(r * (cityNames.length))
  }
}
