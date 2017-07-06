export default class StructureNameGenerator {
  constructor({ frontAdjectives, names, endAdjectives }) {
    this.frontAdjectives = frontAdjectives
    this.names = names
    this.endAdjectives = endAdjectives
  }

  createOwnerName () {
    var front = this.getRandom(this.frontAdjectives.length)
    var name = this.getRandom(this.names.length)
    return this.frontAdjectives[front] + ' ' + this.names[name]
  }
  createBuildingName (structureType) {
    var end = this.getRandom(this.endAdjectives.length)
    var type = this.findType(structureType)
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
