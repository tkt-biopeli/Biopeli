
/**
 * Structure class consists of general attributes of a structure:
 * name, size, foundingYear, structureType, and productionInput,
 * and the function that calculates the value for production efficiency
 * (production unit / time period).
 */
export default class Structure {
  /**
   * tile, name, size, and structureType are given to the constructor as parameters.
   * the initial value of productionInput is 0.
   * @param {ModelTile} param.tile
   * @param {string} param.name
   * @param {integer} param.size
   * @param {StructureType} param.structureType
   * @param {integer} foundingYear
   * @param {function} produceFn
   */
  constructor ({ tile, ownerName, structureName, size, structureType, foundingYear, producer, cost }) {
    this.tile = tile
    this.ownerName = ownerName
    this.structureName = structureName
    this.size = size
    this.structureType = structureType
    this.foundingYear = foundingYear
    this.producer = producer
    this.cost = cost
    this.ownedTiles = []
    this.radiusForTileOwnership = structureType.radiusForTileOwnership
  }

  /**
   * checks whether this structure owns the given tile
   * @param {number} x
   * @param {number} y
   * @return {boolean}
   */
  ownsTileAt (x, y) {
    for (var i = 0; i < this.ownedTiles.length; i++) {
      var tile = this.ownedTiles[i]
      if(tile.x == x && tile.y == y)
        return true
    }
    return false
  }

  /**
   * Returns true if the structure produces throughout the year and false if
   * only during harvesting periods.
   */
  hasContinuousProduction () {
    return this.structureType.continuousProduction
  }

  /**
   * Returns the asset of the structure type
   */
  asset () {
    return this.structureType.asset
  }

  /**
   * (Currently not in use)
   * Calculates and returns the value of the structure's production efficiency
   * ie. number of production units per period
   */
  calculateProductionEfficiency () {
    // production efficiency is based on the potential of the tile, and size and input of structure
    // var value = this.productionInput * this.size * this.tile.potential
    // Fixed turnipYield for now
    var value = this.structureType.turnipYield
    return value
  }

  /**
   * Returns the amount of turnips produced by this structure
   * @param {TimeEvent} timeEvent - Current ingame date
   * @return {number} - Turnips produced
   */
  produce (timeEvent) {
    return this.producer === undefined ? 0 : this.producer.produce(timeEvent)
  }
}
