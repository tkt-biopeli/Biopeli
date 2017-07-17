/**
 * Base class for producers. Producers determine what amount of
 * turnips a structure produces at given week
 */
export default class Producer {
  constructor ({ tile, turnipYield }) {
    this.tile = tile
    this.turnipYield = turnipYield
  }

  produce (timeEvent) {
    return this.productionThisWeek(timeEvent) * this.tile.flowers / 5
  }
}
