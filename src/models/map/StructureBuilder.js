import Structure from '../models/map/Structure'

export default class StructureBuilder {
  constructor ({tile, structureTypes}) {
    this.tile = tile
    this.structureTypes = structureTypes
  }


  buildGranary() {
    this.tile.structure = new Structure({
      tile: tile,
      structureType: this.structureTypes.granary
    }
  }

  buildFarm() {
    this.tile.structure = new Structure({
      tile: tile,
      structureType: this.structureTypes.farm
    }
  }
}