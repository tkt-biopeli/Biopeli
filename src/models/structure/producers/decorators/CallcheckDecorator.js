export default class CallcheckDecorator {
  constructor ({producer}) {
    this.producer = producer
    this.refinery = null
    this.refineryDistance = null
  }

  produce (timeEvent, ownerCall) {
    if (this.refinery != null && !ownerCall) {
      return 0
    }

    return this.producer.produce(timeEvent)
  }
}
