import Structure from '../models/map/Structure'

export default class StructureFactory {
  constructor (tile) {
    this.tile = tile
    }
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