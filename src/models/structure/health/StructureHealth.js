export default class StructureHealth {
  constructor ({ maxHealth }) {
    this.maxHealth = maxHealth
    this.currentHealth = maxHealth
    this.warned = false
  }

  fill () {
    this.currentHealth = this.maxHealth
    this.warned = false
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

  warn () {
    if (this.percent() > 0.5 || this.warned) return false
    this.warned = true
    return true
  }
}
