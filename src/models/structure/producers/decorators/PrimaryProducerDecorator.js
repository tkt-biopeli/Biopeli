import config from '../../../../config'
/**
 * Base class for producers. Producers determine what amount of
 * turnips a structure produces at given week
 */
export default class PrimaryProducerDecorator {
  constructor ({ tile, producer }) {
    this.tile = tile
    this.producer = producer
    this.ownedFarmLand = []
  }

  produce (timeEvent) {
    var value = 0
    this.ownedFarmLand.forEach(function (tile) {
      value += tile.flowers / config.maxFlowers
    }, this)
    if (tile.moisture < 20) {
      value = 0
    }
    return this.producer.produce(timeEvent) * value
  }
}
