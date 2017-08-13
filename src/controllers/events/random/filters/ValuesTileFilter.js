import TileFilter from './TileFilter'

export default class ValuesTileFilter extends TileFilter {
  constructor ({gameState, json}) {
    super(gameState)
    
    this.fertilityLimits = this.checkLimits(json.fertilityLimits, 100)
    this.moistureLimits = this.checkLimits(json.moistureLimits, 100)
    this.flowerLimits = this.checkLimits(json.flowerLimits, gameState.config.gameplaySettings.tiles.maxFlowers)
  }

  checkLimits (limits, theoreticalMax) {
    if (limits == null) return {min: 0, max: theoreticalMax}

    if (limits.min == null) limits.min = 0
    else if (limits.max == null) limits.max = theoreticalMax
      
    return limits
  }

  isValidTile (tile) {
    return this.isInRange(tile.fertility, this.fertilityLimits) &&
      this.isInRange(tile.moisture, this.moistureLimits) &&
      this.isInRange(tile.flowers, this.flowerLimits)
  }

  isInRange (value, limits) {
    return value >= limits.min && value <= limits.max
  }
}