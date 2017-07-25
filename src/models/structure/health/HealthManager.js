import { createCircle } from '../../logic/Functions'

export default class HealthManager {
  constructor ({ purchaseManager, health, minRuinTime, maxRuinTime, buildingCost, maxPrice }) {
    this.purchaseManager = purchaseManager

    this.health = health
    this.min = minRuinTime
    this.difference = maxRuinTime - minRuinTime

    this.buildingCost = buildingCost
    this.priceFunction = createCircle(0, maxPrice, maxPrice, false)
  }

  calculateNextRuin (timeEvent) {
    this.nextRuin = timeEvent.serialNumber + this.min + Math.floor(this.rand() * (this.difference + 1))
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
    this.calculateNextRuin()
  }

  fixPrice () {
    return this.priceFunction() * this.buildingCost
  }

  rand () { return Math.random() }
}
