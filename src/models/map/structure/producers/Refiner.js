import { createLine } from '../../../logic/LinearFunction'
import Producer from './Producer'

/**
 * Refiner takes production from given type buildingsnear it and enchancts their production
 */
export default class Refiner extends Producer {
  constructor({ zone, inputTypes, multiplier, radius, tile }) {
    super()

    this.tile = tile

    this.zone = zone
    this.inputTypes = inputTypes
    this.multiplier = multiplier
    this.radius = radius

    this.distancefunction = createLine(1, 1, radius, 1 / multiplier)

    this.producerHolders = []
  }

  findProducers () {
    for (var capsule in this.zone) {
      let structure = capsule.tile.structure
      let producer = structure.producer
      let distance = capsule.distance

      if (this.canRefineOutputOf(structure) && this.isCloser(producer, distance)) {
        this.producerHolders.push({ distance: distance, producer: producer })
      }
    }
  }


  produce (timeEvent) {
    var productionSum = 0
    for (let producerHolder of this.producerHolders) {
      productionSum += this.distancefunction(producerHolder.distance) * producerHolder.producer.production(timeEvent, true)
    }

    return Math.round(productionSum * this.multiplier)
  }

  canRefineOutputOf (structure) {
    return this.inputTypes.includes(structure.structureType)
  }

  isCloser (producer, distance) {
    if (producer.refineryDistance > distance) {
      producer.refinery = this
      producer.refineryDistance = distance
      return true
    }
  }

  structureCreated(tile) {
    
  }
}
