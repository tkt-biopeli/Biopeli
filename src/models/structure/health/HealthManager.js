export default class HealthManager {
  constructor ({ health, minRuinTime, maxRuinTime }) {
    this.health = health
    this.min = minRuinTime
    this.difference = maxRuinTime - minRuinTime
  }

  calculateNextRuin (currentTime) {
    this.nextRuin = currentTime + this.min + Math.floor(this.rand() * (this.difference + 1))
  }

  checkRuin (timeEvent) {
    if (timeEvent.serialNumber >= this.nextRuin) {
      this.health.loseOne()
      this.calculateNextRuin()
    }
  }

  fix () {
    this.health.fill()
    this.calculateNextRuin()
  }

  rand () { return Math.random() }
}
