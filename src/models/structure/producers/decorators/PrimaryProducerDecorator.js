import config from '../../../../config'
import Functions from '../../../logic/Functions'
/**
 * Base class for producers. Producers determine what amount of
 * turnips a structure produces at given week
 */
export default class PrimaryProducerDecorator {
  constructor ({ tile, producer }) {
    this.tile = tile
    this.producer = producer
    this.ownedFarmLand = []
    this.underFunction = createLine(0.5, 1, 1, increaseAtOne)
  }

  produce (timeEvent) {
    var value = 0
    this.ownedFarmLand.forEach(function (tile) {
      value += tile.flowers / config.maxFlowers
    }, this)
    if (this.tile.moisture < 20 || this.tile.moisture > 50) {
      value = value / 2
    }
    return this.producer.produce(timeEvent) * value
  }
}
