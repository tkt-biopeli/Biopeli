export default class AllDecorator {
  constructor ({producer, tile}) {
    this.producer = producer
    this.tile = tile
    this.refinery = null
    this.refineryDistance = null
  }

  initialize (structure) {
    this.structure = structure
    this.producer.initialize(structure)
  }

  /**
   * Calculates produce generated
   * @param {TimeEvent} timeEvent
   * @param {*} ownerCall
   * @return {number}
   */
  produce (timeEvent) {
    this.producer.produce(timeEvent)
  }

  producedAmount (ownerCall) {
    if (ownerCall || this.refinery == null) {
      return this.producer.producedAmount() * this.structure.health.percent()
    }

    return 0
  }
}
