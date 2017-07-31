export default class AllDecorator {
  constructor ({producer, tile}) {
    this.producer = producer
    this.refinery = null
    this.refineryDistance = null
  }

  initialize (structure) {
    this.structure = structure
    this.producer.initialize(structure)
  }

  produce (timeEvent, ownerCall) {
    if (this.refinery != null && !ownerCall) {
      return 0
    }

    if (this.health == null) {
      this.health = this.structure.health
    }

    return this.producer.produce(timeEvent) * this.health.percent()
  }
}
