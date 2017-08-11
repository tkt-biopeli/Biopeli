import TileEffect from './TileEffect'

export default class TileValueEffect extends TileEffect {
  constructor ({fertilityChange, moistureChange, flowerChange}) {
    super()
    this.fertility = fertilityChange
    this.moisture = moistureChange
    this.flowers = flowerChange
  }

  happenForOne (tile) {
    tile.flowers += this.flowers
    tile.moisture += this.moisture
    tile.fertility += this.fertility
  }
}