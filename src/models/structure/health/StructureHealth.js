export default class StructureHealth {
  constructor ({ maxHealth }) {
    this.maxHealth = maxHealth
    this.currentHealth = maxHealth
  }

  fill () {
    this.currentHealth = this.maxHealth
  }

  loseHealth (amount) {
    this.currentHealth = Math.max(0, this.currentHealth - amount)
  }

  loseOne () {
    this.loseHealth(1)
  }

  toString () {
    return this.currentHealth + '/' + this.maxHealth
  }

  percent () {
    return this.currentHealth / this.maxHealth
  }
}
