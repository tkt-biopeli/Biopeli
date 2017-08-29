import Effect from './Effect'

export default class TileValueEffect extends Effect {
  constructor ({json}) {
    super() /* istanbul ignore next */
    this.fertility = json.fertilityChange != null ? json.fertilityChange : 0
    this.moisture = json.moistureChange != null ? json.moistureChange : 0
    this.flowers = json.flowerChange != null ? json.flowerChange : 0
  }

  realizeEventForOneElement (tile) {
    tile.flowers += this.flowers
    tile.moisture += this.moisture
    tile.fertility += this.fertility
  }
}
