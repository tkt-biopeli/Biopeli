import Content from './Content'

export default class BuildProducerContent extends Content {
  constructor ({ structureTypes }) {
    super()
    this.structureTypes = structureTypes
  }

  createSections () {


    this.createBuildProducerButtons()
  }

  tileInformation (tile) {
    this.sectionName('tile')
    this.text('Maatyyppi: ' + this.tile.tileType.nameWithLanguage)
    this.text('X: ' + this.tile.x + ', Y: ' + tile.y)
    this.text('Kukkia: ' + this.tile.flowers)
    this.text('Kosteus: ' + this.format(tile.moisture) + '%')
    this.text('Ravinteikkuus: ' + this.format(tile.fertility) + '%')
    if (tile.owner != null) {
      this.text('Maanomistaja: ' + this.tile.owner.ownerName)
    }
  }

  createBuildProducerButtons () {
    this.section('actions')
    var tile = this.owner.stateValue('tile')
    var allowedStructures = tile.tileType.allowedStructures
    for (let structureTypeName of allowedStructures) {
      var structureType = this.structureTypes[structureTypeName]
      if (structureType.type === "producer_structure") {
        this.owner.changeButton(
        structureType.nameWithLanguage, 2,
        this.owner.wrapFunction(
        this.owner.addState, this.owner, 'structureType', structureType),
        this, "smallButton"
        )
      } 
    }
  }
}
