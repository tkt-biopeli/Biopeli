
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
   *
   * @param {object} param
   *
   * @param {ModelTile} param.tile
   * @param {string} param.name
   * @param {integer} param.size
   * @param {StructureType} param.structureType
   * @param {integer} productionInput - ????
   */
  constructor ({tile, name, size, structureType, foundingYear}) {
    this.tile = tile
    this.name = name
    this.size = size
    this.structureType = structureType
    this.productionInput = 1
    this.foundingYear = foundingYear

    this.produceFn = structureType.createConstantProductionFn()
    this.produceSeasonFn = structureType.createSeasonalProductionFn()
  }

  /**
   * Returns the asset of the structure type
   */
  asset () {
    return this.structureType.asset
  }

  /**
   * Calculates and returns the value of the structure's production efficiency
   * ie. number of production units per period
   */
  calculateProductionEfficiency () {
    // production efficiency is based on the potential of the tile, and size and input of structure
    var value = this.productionInput * this.size * this.tile.potential
    return value
  }

  /**
   * Generates the constant produce 
   */
  produce () {
    return this.produceFn()
  }  

  /**
   * Generates the seasonal produce 
   */
  produceSeason () {
    return this.produceSeasonFn()
  }
}
