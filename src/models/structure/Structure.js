
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
    structureName, structureType, foundingYear, producer, bordercolCode }) {
    this.tile = tile
    this.structureType = structureType

    this.health = health
    this.healthManager = healthManager

    this.producer = producer

    this.ownerName = ownerName
    this.structureName = structureName
    this.foundingYear = foundingYear

    this.ownedTiles = []
    this.bordercolCode = bordercolCode
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

  size () {
    let type = this.structureType.type
    if (type === 'refinery') {
      return this.producer.producer.producerHolders.length
    } else if (type === 'producer_structure') {
      return this.ownedTiles.length
    } else {
      return this.producer.producer.zone.values.length
    }
  }

  /**
   * Returns the asset of the structure type
   */
  asset () {
    return this.structureType.asset
  }
}
