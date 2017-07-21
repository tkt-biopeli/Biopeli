import PrimaryProducer from './PrimaryProducer'

/**
 * Produces turnips every week
 */
export default class ContinuousProducer extends PrimaryProducer {
  productionThisWeek () {
    return this.turnipYield
  }
}
