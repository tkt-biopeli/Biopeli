import Producer from './Producer'

export default class ContinuousProducer extends Producer {
  productionThisWeek () {
    return this.turnipYield
  }
}
