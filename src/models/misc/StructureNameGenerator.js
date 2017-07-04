export default class StructureNameGenerator {
  constructor () {
    this.names = [
      'Pekan',
      'Jukan',
      'Kallen',
      'Piippolan',
      'Vaarin',
      'Kyöstin',
      'Jaakon'
    ]
    this.adjectives = [
    ]
  }
  createName (structureType) {
    var type = this.findType(structureType)
    var name = 'test ' + type
    return name
  }
  findType(structureType) {
      var type
      if (structureType == 'farm') {
          type = 'farmi'
      }
      return type
  }


}