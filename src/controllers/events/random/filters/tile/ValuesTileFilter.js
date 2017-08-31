import TileFilter from '../baseclasses/TileFilter'

export default class ValuesTileFilter extends TileFilter {
  constructor ({ gameState, json }) {
    super(gameState) /* istanbul ignore next */
    this.constructLimits(gameState, json)
  }

  constructLimits (gameState, json) {
    this.fertilityLimits = this.checkLimits(json.fertilityLimits, 100)
    this.moistureLimits = this.checkLimits(json.moistureLimits, 100)
    this.flowerLimits = this.checkLimits(json.flowerLimits, 
      gameState.config.gameplaySettings.tiles.maxFlowers)
  }

  checkLimits (limits, theoreticalMax) {
    if (limits == null) return { min: 0, max: theoreticalMax }

    if (limits.min == null) limits.min = 0
    if (limits.max == null) limits.max = theoreticalMax

    limits.min = Math.max(limits.min, 0)
    limits.max = Math.min(limits.max, theoreticalMax)
    return limits
  }

  isValid (tile) {
    return this.isInRange(tile.fertility, this.fertilityLimits) &&
      this.isInRange(tile.moisture, this.moistureLimits) &&
      this.isInRange(tile.flowers, this.flowerLimits)
  }

  isInRange (value, limits) {
    return value >= limits.min && value <= limits.max
  }
}
