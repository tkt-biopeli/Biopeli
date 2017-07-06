export default class CityNameGenerator {
  constructor ({cityNames}) {
    this.cityNames = cityNames
  }

  generateName () {
    var first = this.getRandomId()
    var second = this.getRandomId()

    if (second === first) {
      second++
      if (second === this.cityNames.length) {
        second = 0
      }
    }

    var name = this.getStart(first) + this.getEnd(second, first)

    return name
  }

  getStart (id) {
    var no = this.cityNames[id]

    if (no.full !== undefined) {
      return no.name.slice(0, no.full)
    }

    return no.name.slice(0, no.point)
  }

  getEnd (id, first) {
    var no = this.cityNames[id]

    if (this.cityNames[first].full !== undefined) {
      return no.name
    }

    return no.name.slice(no.point)
  }

  getRandomId () {
    var r = Math.random()
    return Math.floor(r * (this.cityNames.length))
  }
}
