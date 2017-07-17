import Producer from './Producer'

/**
 * Produces turnips every week
 */
export default class ContinuousProducer extends Producer {
  productionThisWeek () {
    return this.turnipYield
  }
}
