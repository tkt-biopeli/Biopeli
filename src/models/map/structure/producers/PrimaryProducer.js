import config from '../../../../config'
import Producer from './Producer'
/**
 * Base class for producers. Producers determine what amount of
 * turnips a structure produces at given week
 */
export default class PrimaryProducer extends Producer {
  constructor ({ tile, turnipYield }) {
    super()
    this.tile = tile
    this.turnipYield = turnipYield
  }

  produce (timeEvent) {
    return this.productionThisWeek(timeEvent) * this.tile.flowers / config.maxFlowers
  }
}
