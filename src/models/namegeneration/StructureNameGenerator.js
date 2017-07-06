export default class StructureNameGenerator {
  constructor({ frontAdjectives, names, endAdjectives }) {
    this.frontAdjectives = frontAdjectives
    this.names = names
    this.endAdjectives = endAdjectives
  }
  createName (structureType) {
    var front = this.getRandom(this.frontAdjectives.length)
    var name = this.getRandom(this.names.length)
    var end = this.getRandom(this.endAdjectives.length)
    var type = this.findType(structureType)
    var fullName
    if (front.length + name.length + end.length + type.length < 30) {
      fullName = this.frontAdjectives[front] + ' ' + this.names[name]
        + ' ' + this.endAdjectives[end] + ' ' + type
    } else {
      if (Math.random() < 0.5) {
        fullName = this.frontAdjectives[front] + ' ' + this.names[name] + ' ' + type
      } else {
        fullName = this.names[name] + ' ' + this.endAdjectives[end] + ' ' + type
      }
    } 
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
