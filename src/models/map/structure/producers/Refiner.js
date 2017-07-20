import { createLine } from '../../../logic/LinearFunction'

/**
 * Refiner takes production from given type buildingsnear it and enchancts their production
 */
export default class Refiner {
  constructor ({ inputTypes, multiplier, radius, tile }) {
    this.tile = tile

    this.inputTypes = inputTypes
    this.multiplier = multiplier
    this.radius = radius

    this.distancefunction = createLine(1, 1, radius, 1 / multiplier)

    this.producerHolders = []
  }

  produce (timeEvent) {
    var productionSum = 0
    for (let producerHolder of this.producerHolders) {
      productionSum += this.distancefunction(producerHolder.distance) * producerHolder.producer.produce(timeEvent)
    }

    return Math.round(productionSum * this.multiplier)
  }
}
