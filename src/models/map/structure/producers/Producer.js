export default class Producer {
  production (timeEvent, ownerCall) {
    if (this.owner != null && !ownerCall) {
      return 0
    }

    return this.produce(timeEvent)
  }
}
