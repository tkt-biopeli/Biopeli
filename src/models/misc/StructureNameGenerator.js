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
    this.frontAdjectives = [
      'Juoppo',
      'Iso',
      'Pikku',
      'Hullu',
      'Sekopää',
      'Rauhanmies',
      'Piippu',
      'Mustan',
      'Pihi' 
    ]
    this.endAdjectives = [
      'pieni',
      'iso',
      'suuri',
      'kämänen',
      'siisti',
      'puhdas',
      'laadukas',
      'kurja',
      'huonon onnen',
      'pahan päivän',
      'surkea',
      'likainen',
      'kallis',
      'ylihinnoiteltu',
      'luomu'
    ]
  }
  createName (structureType) {
    var type = this.findType(structureType)
    var name = Math.floor(Math.random() * this.names.length)
    var frontAdj = Math.floor(Math.random() * this.frontAdjectives.length)
    var endAdj =  Math.floor(Math.random() * this.endAdjectives.length)
    var fullName = this.frontAdjectives[frontAdj] + ' ' + this.names[name] + ' ' + this.endAdjectives[endAdj] + ' ' + type
    return fullName
  }
  findType(structureType) {
      var type = ''
      if (structureType == 'farm') {
          type = 'farmi'
      }
      if (structureType == 'dairy farm') {
        type = 'navetta'
      }
      if (structureType == 'berry farm') {
        type = 'marjatila'
      }
      return type
  }


}