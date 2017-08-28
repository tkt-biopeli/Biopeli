/**
 * Produces turnips every week
 */
export default class ContinuousProducer {
  constructor ({structureType}) {
    this.structureType = structureType
  }

  initialize (structure) {}

  produce () { }

  producedAmount () {
    return this.structureType.turnipYield
  }
}
