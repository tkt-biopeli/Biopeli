import Content from './Content'

export default class BuildMenuContent extends Content {
  constructor ({ structureTypes }) {
    super()
    this.structureTypes = structureTypes
  }

  createSections () {
    if (this.owner.stateValue('whatType') === 'buildProducer') {
      this.createBuildProducerButtons()
    } else if (this.owner.stateValue('whatType') === 'buildRefinery') {
      this.createBuildRefineryButtons()
    } else if (this.owner.stateValue('whatType') === 'buildSpecial') {

    }
  }

  createBuildProducerButtons () {
    this.section('actions')
    var tile = this.owner.stateValue('selectedTile')
    var allowedStructures = tile.tileType.allowedStructures
    for (let structureTypeName of allowedStructures) {
      var structureType = this.structureTypes[structureTypeName]
      if (structureType.type === 'producer_structure') {
        this.owner.changeButton(
          structureType.nameWithLanguage, 2,
          this.owner.wrapFunction(
            this.owner.addState, this.owner, 'structureType', structureType),
          this, 'smallButton'
        )
      }
    }
  }

  createBuildRefineryButtons () {
    this.section('actions')
    var tile = this.owner.stateValue('selectedTile')
    var allowedStructures = tile.tileType.allowedStructures
    for (let structureTypeName of allowedStructures) {
      var structureType = this.structureTypes[structureTypeName]
      if (structureType.type === 'refinery') {
        this.owner.changeButton(
          structureType.nameWithLanguage, 2,
          this.owner.wrapFunction(
            this.owner.addState, this.owner, 'structureType', structureType),
          this, 'smallButton'
        )
      }
    }
  }
}
