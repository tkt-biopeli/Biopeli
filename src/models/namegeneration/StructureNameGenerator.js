export default class StructureNameGenerator {
  constructor ({frontAdjectives, names, endAdjectives}) {
    this.frontAdjectives = frontAdjectives
    this.names = names
    this.endAdjectives = endAdjectives
  }
  createName (structureType) {
    var type = this.findType(structureType)
    var name = this.getRandom(this.names.length)
    var frontAdj = this.getRandom(this.frontAdjectives.length)
    var endAdj = this.getRandom(this.endAdjectives.length)
    var fullName = this.frontAdjectives[frontAdj] + ' ' + this.names[name] + ' ' + this.endAdjectives[endAdj] + ' ' + type
    return fullName
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
