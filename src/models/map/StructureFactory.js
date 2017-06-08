import Structure from './Structure'

export default class StructureFactory {
  constructor ({tile, structureTypes}) {
    this.tile = tile
    this.structureTypes = structureTypes
  }

  buildGranary() {
    this.tile.structure = new Structure({
      tile: tile,
      structureType: this.structureTypes.granary
    })
  }

  buildFarm() {
    this.tile.structure = new Structure({
      tile: tile,
      structureType: this.structureTypes.farm
    })
  }
}