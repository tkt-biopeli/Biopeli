
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
  constructor ({ tile, health, healthManager, ownerName, 
      structureName, size, structureType, foundingYear, producer }) {
    this.tile = tile
    this.health = health
    this.healthManager = healthManager
    this.producer = producer
    this.ownerName = ownerName
    this.structureName = structureName
    this.size = size
    this.structureType = structureType
    this.foundingYear = foundingYear
    this.ownedTiles = []
    this.radiusForTileOwnership = structureType.radiusForTileOwnership
  }

  /**
   * checks whether this structure owns the tile at the given coordinates
   * @param {number} x
   * @param {number} y
   * @return {boolean}
   */
  ownsTileAt (x, y) {
    for (var i = 0; i < this.ownedTiles.length; i++) {
      let tile = this.ownedTiles[i]
      if (x === tile.x && y === tile.y) { return true }
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

  turnipProduction () {
    return this.lastProduce
  }

  /**
   * Returns the amount of turnips produced by this structure
   * @param {TimeEvent} timeEvent - Current ingame date
   * @return {number} - Turnips produced
   */
  produce (timeEvent) {
    this.lastProduce = this.producer === undefined 
      ? 0 
      : this.producer.produce(timeEvent)
    return this.lastProduce
  }
}
