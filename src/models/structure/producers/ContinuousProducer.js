/**
 * Produces turnips every week
 */
export default class ContinuousProducer {
  constructor ({structureType}) {
    this.turnipYield = structureType.turnipYield
  }

  initialize (structure) {}

  produce () {
    return this.turnipYield
  }
}
