import ContinuousProducer from './producers/ContinuousProducer'
import SeasonalProducer from './producers/SeasonalProducer'
import Refiner from './producers/Refiner'
import SpecialStructure from './producers/SpecialStructure'

import PrimaryProducerDecorator from './producers/decorators/PrimaryProducerDecorator'
import AllDecorator from './producers/decorators/AllDecorator'
/**
 * Yields turnips during the harvesting period (month.week).
 */
export default class ProducerFactory {
  constructor ({tileFinder, eventController, maxFlowers}) {
    this.tileFinder = tileFinder
    this.eventController = eventController
    this.maxFlowers = maxFlowers
  }

  /**
   * Returns either a function that yields turnips weekly or one that
   * yields only during harvesting months, depending on the structure type.
   */
  createProducer (structureType, tile) {
    var sType = this.checkStructureType(structureType)

    var producer
    switch (sType.type) {
      case 'refinery':
        producer = this.createRefiner(sType, tile)
        break
      case 'producer_structure':
        producer = this.createPrimaryProducer(sType, tile)
        break
      default:
        tile.moisture -= 25
        producer = this.createSpecialStructure(sType, tile)
    }
    return new AllDecorator({producer: producer, tile: tile})
  }

  createSpecialStructure (sType, tile) {
    return new SpecialStructure({
      zone: this.tileFinder.findTilesInDistanceOf(tile, sType.reach, sType.moveCosts),
      changeValues: sType.changeValues,
      tile: tile
    })
  }

  createPrimaryProducer (sType, tile) {
    var producer = sType.continuousProduction
     ? this.createContinuousProducer(sType)
     : this.createSeasonalProducer(sType.harvestingWeeks, sType)

    return new PrimaryProducerDecorator({
      tile: tile, 
      producer: producer, 
      maxFlowers: this.maxFlowers
    })
  }

  createSeasonalProducer (harvestingWeeks, sType) {
    return new SeasonalProducer({
      structureType: sType,
      harvestWeeks: harvestingWeeks
    })
  }

  /**
   * Yields the same amount of turnips per week.
   */
  createContinuousProducer (sType) {
    return new ContinuousProducer({
      structureType: sType
    })
  }

  /**
   * Creates refiner
   *
   * @param {*} inputTypes
   * @param {*} multiplier
   * @param {*} radius
   * @param {*} tile
   */
  createRefiner (stype, tile) {
    var refiner = new Refiner({
      inputTypes: stype.buysFrom,
      zone: this.tileFinder.findTilesInDistanceOf(
        tile, stype.reach, stype.moveCosts),
      multiplier: stype.multiplier,
      takesOwnership: stype.takesOwnership
    })

    this.eventController.addListener(
      'structureBuilt', refiner.structureCreated, refiner
    )

    return refiner
  }

  /**
   * If the structure type is undefined, create a new one.
   */
  checkStructureType (structureType) {
    return structureType === null
      ? {
        type: 'producer_structure',
        harvestingWeeks: new Set(),
        continuousProduction: false,
        turnipYield: 0
      }
      : structureType
  }
}
