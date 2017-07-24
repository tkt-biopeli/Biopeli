export default class CallcheckDecorator {
  constructor ({producer}) {
    this.producer = producer
  }

  produce (timeEvent, ownerCall) {
    if (this.owner != null && !ownerCall) {
      return 0
    }

    return this.producer.produce(timeEvent)
  }
}
