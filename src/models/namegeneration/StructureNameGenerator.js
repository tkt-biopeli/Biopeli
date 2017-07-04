import StructureNameParts from './StructureNameParts'

export default class StructureNameGenerator {
  constructor () {
    this.frontAdjectives = StructureNameParts[1]
    this.names = StructureNameParts[0]
    this.endAdjectives = StructureNameParts[2]
  }
  createName (structureType) {
    var type = this.findType(structureType)
    var name = Math.floor(Math.random() * this.names.length)
    var frontAdj = Math.floor(Math.random() * this.frontAdjectives.length)
    var endAdj = Math.floor(Math.random() * this.endAdjectives.length)
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
}
