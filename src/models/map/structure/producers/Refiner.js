import { createLine } from '../../../logic/LinearFunction'
import Producer from './Producer'

/**
 * Refiner takes production from given type buildingsnear it and enchancts their production
 */
export default class Refiner extends Producer {
  constructor ({ zone, inputTypes, multiplier, radius, tile }) {
    super()

    this.tile = tile

    this.zone = zone
    this.inputTypes = inputTypes
    this.multiplier = multiplier
    this.radius = radius

    this.distancefunction = createLine(1, 1, radius, 1 / multiplier)

    this.producerHolders = []
  }

  produce (timeEvent) {
    var productionSum = 0
    for (let producerHolder of this.producerHolders) {
      productionSum += this.distancefunction(producerHolder.distance) * producerHolder.producer.production(timeEvent, true)
    }

    return Math.round(productionSum * this.multiplier)
  }
}
