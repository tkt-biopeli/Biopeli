export default class AllDecorator {
  constructor ({producer, tile}) {
    this.producer = producer
    this.tile = tile
    this.refinery = null
    this.refineryDistance = null
  }

  produce (timeEvent, ownerCall) {
    if (this.refinery != null && !ownerCall) {
      return 0
    }

    if (this.health == null) {
      this.health = this.tile.structure.health
    }

    return this.producer.produce(timeEvent) * this.health.percent()
  }
}
