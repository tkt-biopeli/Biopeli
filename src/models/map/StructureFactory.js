import Structure from './Structure'

export default class StructureFactory {
  constructor ({tile, structureTypes}) {
    this.tile = tile
    this.structureTypes = structureTypes
  }

  buildGranary () {
    this.buildBuilding(this.structureTypes.granary)
  }

  buildFarm () {
    this.buildBuilding(this.structureTypes.farm)
  }

  buildBuilding (structureType) {
    this.tile.structure = new Structure({
      tile: this.tile,
      structureType: structureType
    })
  }
}
