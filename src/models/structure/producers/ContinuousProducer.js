/**
 * Produces turnips every week
 */
export default class ContinuousProducer {
  constructor ({turnipYield}) {
    this.turnipYield = turnipYield
  }

  initialize (structure) {}

  produce () {
    return this.turnipYield
  }
}
