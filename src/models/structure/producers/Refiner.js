import { createLine } from '../../logic/Functions'

/**
 * Refiner takes production from given type buildingsnear it and enchancts their production
 */
export default class Refiner {
  constructor ({ zone, inputTypes, multiplier, radius }) {
    this.zone = zone
    this.inputTypes = inputTypes
    this.multiplier = multiplier
    this.radius = radius
    this.distancefunction = createLine(1, 1, radius, 1 / multiplier)
    this.producerHolders = []
    this.findProducers()
  }

  produce (timeEvent) {
    var productionSum = 0
    let size = this.producerHolders.length
    for (var i = 0; i < size; i++) {
      let producerHolder = this.producerHolders.shift()
      if (this.verifyOwnership(producerHolder)) {
        productionSum += this.distancefunction(producerHolder.distance) * producerHolder.producer.produce(timeEvent, true)
        this.producerHolders.push(producerHolder)
      }
    }
    return Math.round(productionSum * this.multiplier)
  }

  /**
   * Helper for produce method: before taking production check if some other refinery has claimed
   * the ownership of the producer
   * @param {*} producerHolder
   */
  verifyOwnership (producerHolder) {
    return producerHolder.producer.refinery === this
  }

  findProducers () {
    for (let capsule of this.zone) {
      if (capsule.tile.structure !== null) {
        let structure = capsule.tile.structure
        let producer = structure.producer
        let distance = capsule.distance

        if (this.canRefineOutputOf(structure) && this.isCloser(producer, distance)) {
          this.producerHolders.push({ distance: distance, producer: producer })
        }
      }
    }
  }

  canRefineOutputOf (structure) {
    return this.inputTypes.includes(structure.structureType.name)
  }

  isInZone (tile) {
    for (let capsule of this.zone) {
      if (tile === capsule.tile) { return capsule }
    }
  }

  isCloser (producer, distance) {
    if (producer.refineryDistance === null || producer.refineryDistance > distance) {
      producer.refinery = this
      producer.refineryDistance = distance
      return true
    }
  }

  /**
   * Listens to new structures built by the user
   * @param {*} tile
   */
  structureCreated (tile) {
    if (this.canRefineOutputOf(tile.structure)) {
      let match = this.isInZone(tile)
      if (match) {
        if (this.isCloser(match.tile.structure.producer, match.distance)) {
          this.producerHolders.push({ distance: match.distance, producer: match.tile.structure.producer })
        }
      }
    }
  }
}
