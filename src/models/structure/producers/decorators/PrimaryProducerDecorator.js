import config from '../../../../config'
import {createLine} from '../../../logic/Functions'
/**
 * Base class for producers. Producers determine what amount of
 * turnips a structure produces at given week
 */
export default class PrimaryProducerDecorator {
  constructor ({ tile, producer }) {
    this.tile = tile
    this.producer = producer
    this.ownedFarmLand = []
  }

  initialize (structure) {
    this.structure = structure
    this.producer.initialize(structure)
    
    this.underFunction = createLine(0.5, 0.5, 1, 1)
    this.preferFunction = createLine(1, 1, 1, 1)
    this.overFunction = createLine(1, 1, 0.5, 0.5)
  }

  produce (timeEvent) {
    var value = 0
    this.ownedFarmLand.forEach(function (tile) {
      value += tile.flowers / config.maxFlowers
    }, this)
    var howPreferable
    if (this.tile.moisture < this.structure.moisture_min) {
      howPreferable = this.underFunction(this.tile.moisture)
    } else if (this.tile.moisture > this.structure.moisture_max) {
      howPreferable = this.overFunction(this.tile.moisture)
    } else {
      howPreferable = this.preferFunction(this.tile.moisture)
    }
    console.log(howPreferable)
    return this.producer.produce(timeEvent) * value
  }
}
