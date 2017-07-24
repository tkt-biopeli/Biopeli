import config from '../../../../config'
/**
 * Base class for producers. Producers determine what amount of
 * turnips a structure produces at given week
 */
export default class PrimaryProducerDecorator {
  constructor ({ tile, producer }) {
    this.tile = tile
    this.producer = producer
  }

  produce (timeEvent) {
    return this.producer.produce(timeEvent) * this.tile.flowers / config.maxFlowers
  }
}
