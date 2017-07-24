/**
 * Produces turnips every week
 */
export default class ContinuousProducer{
  constructor ({turnipYield}) {
    this.turnipYield = turnipYield
  }

  produce () {
    return this.turnipYield
  }
}
