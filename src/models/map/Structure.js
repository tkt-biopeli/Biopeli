
/**
 * Structure class consists of general attributes of a structure:
 * name, size, foundingYear, structureType, and productionInput,
 * and the function that calculates the value for production efficiency
 * (production unit / time period).
 */
export default class Structure{

  /**
   * tile, name, size, and structureType are given to the constructor as parameters.
   * the initial value of productionInput is 0.
   * 
   * @param {object} param
   * 
   * @param {ModelTile} param.tile
   * @param {string} name
   * @param {integer} size
   * @param {StructureType} param.structureType
   * @param {integer} productionInput
   */
  constructor ({tile, name, size, structureType, foundingYear}) {
    this.tile = tile
    this.name = name
    this.size = size
    this.structureType = structureType
    this.productionInput = 0
    this.foundingYear = foundingYear

    this.updateFn = structureType.createUpdateFn()
  }

  /**
   * Returns the asset of the structure type
   */
  asset(){
    return this.structureType.asset
  }

  /**
   * Calculates and returns the value of the structure's production efficiency
   * ie. number of production units per period
   */
  calculateProductionEfficiency() {
    // init value
    var value = 785
    // magic happens
    // production inputs are also factored into calculation
    return value
  }

  /**
   * Calls the update function of the structure type
   * @see StructureType.updateFn
   */
  update(){
    this.updateFn()
  }
}
