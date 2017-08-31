import Content from './Content'

export default class BuildMenuContent extends Content {
  constructor ({ structureTypes }) {
    super() /* istanbul ignore next */
    this.structureTypes = structureTypes
  }

  createSections () {
    if (this.owner.stateValue('whatType') === 'buildProducer') {
      this.createBuildStructureCategoryButtons('producer_structure')
    } else if (this.owner.stateValue('whatType') === 'buildRefinery') {
      this.createBuildStructureCategoryButtons('refinery')
    } else if (this.owner.stateValue('whatType') === 'buildSpecial') {
      this.createBuildStructureCategoryButtons('special')
    }
  }

  createBuildStructureCategoryButtons (category) {
    this.section('actions')
    var tile = this.owner.stateValue('selectedTile')
    var allowedStructures = tile.tileType.allowedStructures
    for (let structureTypeName of allowedStructures) {
      var structureType = this.structureTypes[structureTypeName]
      this.addStructureTypeButton(structureType, category)
    }
  }

  addStructureTypeButton (structureType, category) {
    if (structureType.type !== category) return null
    this.owner.changeButton(
      structureType.nameWithLanguage, 2,
      this.owner.wrapFunction(
        this.owner.addState, this.owner, 'structureType', structureType),
      this, 'smallButton'
    )
  }
}
