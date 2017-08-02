import { createCircle } from '../../logic/Functions'

export default class HealthManager {
  constructor ({ purchaseManager, health, minRuinTime, 
      maxRuinTime, buildingCost, priceMultiplier }) {
    this.purchaseManager = purchaseManager

    this.health = health
    this.min = minRuinTime
    this.difference = maxRuinTime - minRuinTime

    this.maxCost = buildingCost * priceMultiplier
    this.priceFunction = createCircle(0, 1, 1, false)
  }

  calculateNextRuin (timeEvent) {
    this.nextRuin = timeEvent.serialNumber + this.min + 
      Math.floor(this.rand() * (this.difference + 1))
  }

  checkRuin (timeEvent) {
    if (timeEvent.serialNumber >= this.nextRuin) {
      this.health.loseOne()
      this.calculateNextRuin(timeEvent)
    }
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

  rand () { return Math.random() }
}
