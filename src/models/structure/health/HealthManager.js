import { createCircle } from '../../logic/Functions'
import TimeWindowRandomizer from '../../logic/TimeWindowRandomizer'

export default class HealthManager {
  constructor ({ purchaseManager, health, minRuinTime, 
      maxRuinTime, buildingCost, priceMultiplier, currentTime }) {
    this.purchaseManager = purchaseManager

    this.timeWindow = new TimeWindowRandomizer({
      min: minRuinTime,
      max: maxRuinTime
    })
    this.timeWindow.calculateNext(currentTime)
    this.health = health

    this.maxCost = buildingCost * priceMultiplier
    this.priceFunction = createCircle(0, 1, 1, false)
  }

  checkRuin (timeEvent) {
    if (this.timeWindow.tryNext(timeEvent)) {
      this.health.loseOne()
      return this.health.warn()
    }
    return false
  }

  fix () {
    if (!this.purchaseManager.purchase(this.fixPrice())) return
    this.health.fill()
  }

  fixPrice () {
    return Math.floor(
      this.priceFunction(1 - this.health.percent()) * this.maxCost
    )
  }
}
