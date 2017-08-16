export default class StructureHealth {
  constructor ({ maxHealth }) {
    this.maxHealth = maxHealth
    this.currentHealth = maxHealth
  }

  fill () {
    this.currentHealth = this.maxHealth
  }

  changeHealth (amount) {
    this.currentHealth = Math.min(Math.max(0, this.currentHealth + amount), this.maxHealth)
  }

  loseOne () {
    this.changeHealth(-1)
  }

  toString () {
    return this.currentHealth + '/' + this.maxHealth
  }

  percent () {
    return this.currentHealth / this.maxHealth
  }
}
