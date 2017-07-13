export default class Producer {
  constructor({tile, turnipYield}){
    this.tile = tile
    this.turnipYield = turnipYield
  }

  produce (timeEvent) {
    this.productionThisWeek(timeEvent) * tile.flowers
  }
}