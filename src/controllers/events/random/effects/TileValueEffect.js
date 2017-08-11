import TileEffect from './TileEffect'

export default class TileValueEffect extends TileEffect {
  constructor ({fertilityChange, moistureChange, flowerChange}) {
    super()
    this.fertility = fertilityChange != null ? fertilityChange : 0
    this.moisture = moistureChange != null ? moistureChange : 0
    this.flowers = flowerChange != null ? flowerChange : 0
  }

  happenForOne (tile) {
    tile.flowers += this.flowers
    tile.moisture += this.moisture
    tile.fertility += this.fertility
  }
}