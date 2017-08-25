import Content from './Content'

export default class StructureInfoContent extends Content {
  constructor ({demandFunction, texts}) {
    super()

    this.demandFunction = demandFunction
    this.texts = texts
  }

  createSections () {
    this.text(this.texts.structureInfo)

    let structure = this.owner.stateValue('selectedTile').structure
    switch (structure.structureType.type) {
      case 'producer_structure':
        this.primaryProducerInfo(stype)
        break
      case 'refinery':
        this.refineryInfo(stype)
        break
      case 'special':
        this.specialInfo(stype)
        break
      default:
        this.errorInfo(stype)
    }
  }

  primaryProducerInfo () {

  }

  refineryInfo () {

  }

  specialInfo () {

  }

  errorInfo () {

  }
}