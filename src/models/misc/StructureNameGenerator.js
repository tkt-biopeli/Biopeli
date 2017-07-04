export default class StructureNameGenerator {
  constructor () {
    this.names = [
      'Pekan',
      'Jukan',
      'Kallen',
      'Piippolan',
      'Vaarin',
      'Kyöstin',
      'Jaakon',
      'Mummon',
      'Sallan',
      'Reetan',
      'Martan',
      'Eevan'
    ]
    this.frontAdjectives = [
      'Juoppo',
      'Ison',
      'Pikku',
      'Hullun',
      'Sekopää',
      'Pelle',
      'Piippu',
      'Mustan',
      'Pihi',
      'Läski',
      'Laihan' 
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
      'huonon tuurin',
      'pahan päivän',
      'surkea',
      'likainen',
      'kallis',
      'ylihinnoiteltu',
      'luomumainen',
      'aito',
      'feikki'
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