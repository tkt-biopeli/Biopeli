export default class StructureNameGenerator {
  constructor ({ frontAdjectives, names, endAdjectives, hyperboles }) {
    this.frontAdjectives = frontAdjectives
    this.names = names
    this.endAdjectives = endAdjectives
    this.hyperboles = hyperboles
  }

  createOwnerName () {
    var front = this.getRandom(this.frontAdjectives.length)
    var name = this.getRandom(this.names.length)
    return this.frontAdjectives[front] + ' ' + this.names[name]
  }

  createBuildingName (structureType) {
    var end = this.getRandom(this.endAdjectives.length)
    var type = this.findType(structureType)
    var hyper = this.getRandom(this.hyperboles.length)
    if (Math.random() < 0.25) {
      var tmp = this.endAdjectives[end].toLowerCase()
      return this.hyperboles[hyper] + '-' + tmp + ' ' + type
    }
    return this.endAdjectives[end] + ' ' + type
  }

  findType (structureType) {
    var type = ''
    if (structureType === 'farm') {
      type = 'tila'
    }
    if (structureType === 'dairy farm') {
      type = 'navetta'
    }
    if (structureType === 'berry farm') {
      type = 'marjatila'
    }
    return type
  }

  getRandom (max) {
    return Math.floor(Math.random() * max)
  }
}
