import { createLine } from '../../../logic/Functions'
/**
 * Base class for producers. Producers determine what amount of
 * turnips a structure produces at given week
 */
export default class PrimaryProducerDecorator {
  /**
   * @param {object} param
   * @param {ModelTile} param.tile
   * @param {} param.producer
   */
  constructor ({ tile, producer, maxFlowers }) {
    this.tile = tile
    this.producer = producer
    this.maxFlowers = maxFlowers
  }

  /**
   * @param {Structure} structure
   */
  initialize (structure) {
    this.structure = structure
    this.producer.initialize(structure)
    var stype = structure.structureType

    this.moistureFunctions = this.createFunctions(stype.moistureMin,
      stype.moistureMax, 10)
    this.fertilityFunctions = this.createFunctions(stype.fertilityMin,
      stype.fertilityMax, 10)
  }

  createFunctions (min, max, difference) {
    return {
      under: createLine(min - difference, 0, min, 1),
      prefer: createLine(min, 1, max, 1),
      over: createLine(max, 1, max + difference, 0)
    }
  }

  /**
   * Calculates produce generated
   * @param {TimeEvent} timeEvent
   * @return {number}
   */
  produce (timeEvent) {
    this.producer.produce(timeEvent)
  }

  producedAmount () {
    var flowersMultiplier = this.averageMultiplier('flowers')
    var moistureMultiplier = this.averageMultiplier('moisture')
    var fertilityMultiplier = this.averageMultiplier('fertility')

    return this.producer.producedAmount() * this.structure.ownedTiles.length *
      flowersMultiplier * moistureMultiplier * fertilityMultiplier
  }

  averageMultiplier (name) {
    var sum = 0
    for (let tile of this.structure.ownedTiles) {
      sum += this[name + 'Multiplier'](tile)
    }

    return sum / this.structure.ownedTiles.length
  }

  /**
   * Checks if moisture is preferable for structuretype
   * @return {number} - between 0 and 1
   */
  moistureMultiplier (tile) {
    var stype = this.structure.structureType

    return this.getValueInFunctions(tile.getMoisture(), this.moistureFunctions,
      stype.moistureMin, stype.moistureMax, 10)
  }

  /**
   * Checks if fertility is preferable for structuretype
   * @return {number} - between 0 and 1
   */
  fertilityMultiplier (tile) {
    var stype = this.structure.structureType

    return this.getValueInFunctions(tile.getFertility(), this.fertilityFunctions,
      stype.fertilityMin, stype.fertilityMax, 10)
  }

  flowersMultiplier (tile) {
    return tile.getFlowers() / 10
  }

  getValueInFunctions (value, functions, min, max, difference) {
    if (value < min - difference || value > max + difference) {
      return 0
    } else if (value < min) {
      return functions.under(value)
    } else if (value < max) {
      return functions.prefer(value)
    }
    return functions.over(value)
  }
}
