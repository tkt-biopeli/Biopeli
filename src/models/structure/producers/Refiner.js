export default class Refiner {
  constructor ({ zone, inputTypes, multiplier, takesOwnership }) {
    this.zone = zone
    this.producerHolders = []

    this.inputTypes = inputTypes
    this.takesOwnership = takesOwnership

    this.multiplier = multiplier
  }

  initialize (structure) {
    this.structure = structure
    this.findProducers()
  }

  produce (timeEvent) {}
  producedAmount () {
    var productionSum = 0
    for (let producerHolder of this.producerHolders) {
      productionSum += this.productionFunction(producerHolder)
    }
    return Math.round(productionSum * this.multiplier)
  }

  productionFunction (producerHolder) {
    return producerHolder.producer.producedAmount(true)
  }

  findProducers () {
    for (let capsule of this.zone) {
      if (capsule.tile.structure != null) {
        let structure = capsule.tile.structure
        let producer = structure.producer
        let distance = capsule.distance
        if (this.canRefineOutputOf(structure) && this.isCloser(producer, distance)) {
          this.takeControlOf(producer, distance)
        }
      }
    }
  }

  canRefineOutputOf (structure) {
    var stype = structure.structureType
    if (this.inputTypes === 'all') {
      if (stype.type === 'refinery' && (stype.buysFrom === 'all' || 
        stype.buysFrom.includes(this.structure.structureType.name))) {
        return false // So that no infinite loops form
      }
      return true
    }
    return this.inputTypes.includes(stype.name)
  }

  findTileInZone (tile) {
    for (let capsule of this.zone) {
      if (tile.equals(capsule.tile)) return capsule
    }
    return null
  }

  isCloser (producer, distance) {
    if (!this.takesOwnership) return true
    return producer.refineryDistance === null ||
      producer.refineryDistance > distance
  }

  /**
   * Listens to new structures built by the user
   * @param {*} tile
   */
  structureCreated (tile) {
    if (this.canRefineOutputOf(tile.structure)) {
      let capsule = this.findTileInZone(tile)
      if (capsule !== null) {
        let producer = capsule.tile.structure.producer

        if (this.isCloser(producer, capsule.distance)) {
          this.takeControlOf(producer, capsule.distance)
        }
      }
    }
  }

  takeControlOf (producer, distance) {
    this.producerHolders.push({
      distance: distance,
      producer: producer
    })

    if (!this.takesOwnership) return null

    if (producer.refinery != null) {
      let another = producer.refinery
      another.loseControlOf(producer)
    }

    producer.refinery = this
    producer.refineryDistance = distance
  }

  loseControlOf (producer) {
    for (let i = 0; i < this.producerHolders.length; i++) {
      let capsule = this.producerHolders[i]
      if (capsule.producer === producer) {
        this.producerHolders.splice(i, 1)
        break
      }
    }
  }
}
