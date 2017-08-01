import config from '../../../../config'
import {createLine} from '../../../logic/Functions'
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
  constructor ({ tile, producer }) {
    this.tile = tile
    this.producer = producer
    this.ownedFarmLand = []
  }

  /**
   * @param {Structure} structure
   */
  initialize (structure) {
    this.structure = structure
    this.producer.initialize(structure)

    this.moisture = {
      under: createLine(
        structure.structureType.moisture_min - 10, 0,
        structure.structureType.moisture_min, 1
      ),
      prefer: createLine(
        structure.structureType.moisture_min, 1,
        structure.structureType.moisture_max, 1
      ),
      over: createLine(
        structure.structureType.moisture_max, 1,
        structure.structureType.moisture_max + 10, 0
      )
    }

    this.fertility = {
      under: createLine(
        structure.structureType.fertility_min - 10, 0,
        structure.structureType.fertility_min, 1
      ),
      prefer: createLine(
        structure.structureType.fertility_min, 1,
        structure.structureType.fertility_max, 1
      ),
      over: createLine(
        structure.structureType.fertility_max, 1,
        structure.structureType.fertility_max + 10, 0
      )
    }
  }

  /**
   * Calculates produce generated
   * @param {TimeEvent} timeEvent
   * @return {number}
   */
  produce (timeEvent) {
    var value = 0
    this.ownedFarmLand.forEach(function (tile) {
      value += tile.flowers / config.maxFlowers
    }, this)
    var howPreferableMoisture, howPreferableFertility
    howPreferableMoisture = this.getMoistureMultiplier()
    howPreferableFertility = this.getFertilityMultiplier()
    return this.producer.produce(timeEvent) * value *
      howPreferableMoisture * howPreferableFertility
  }

  /**
   * Checks if moisture is preferable for structuretype
   * @return {number} - between 0 and 1
   */
  getMoistureMultiplier () {
    if (this.tile.moisture < this.structure.structureType.moisture_min - 10) {
      return 0
    } else if (this.tile.moisture > this.structure.structureType.moisture_max + 10) {
      return 0
    } else if (this.tile.moisture < this.structure.structureType.moisture_min) {
      return this.moisture.under(this.tile.moisture)
    } else if (this.structure.structureType.moisture_max < this.tile.moisture) {
      return this.moisture.over(this.tile.moisture)
    } else {
      return this.moisture.prefer(this.tile.moisture)
    }
  }
  /**
   * Checks if fertility is preferable for structuretype
   * @return {number} - between 0 and 1
   */
  getFertilityMultiplier () {
    if (this.tile.fertility < this.structure.structureType.fertility_min - 10) {
      return 0
    } else if (this.tile.fertility > this.structure.structureType.fertility_max + 10) {
      return 0
    } else if (this.tile.fertility < this.structure.structureType.fertility_min) {
      return this.fertility.under(this.tile.fertility)
    } else if (this.structure.structureType.fertility_max < this.tile.fertility) {
      return this.fertility.over(this.tile.fertility)
    } else {
      return this.fertility.prefer(this.tile.fertility)
    }
  }
}
