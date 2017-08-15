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
        producer = this.createRefiner(sType.buysFrom, sType.multiplier, sType.reach, tile, sType.moveCosts)
        break
      case 'producer_structure':
        producer = this.createPrimaryProducer(sType, tile)
        break
      default:
        producer = new SpecialStructure({
          zone: this.tileFinder.findTilesInDistanceOf(tile, sType.reach, sType.moveCosts),
          multiplier: sType.multiplier,
          radius: sType.reach,
          tile: tile
        })
    }
    return new AllDecorator({producer: producer, tile: tile})
  }

  createPrimaryProducer (sType, tile) {
    var producer = sType.continuousProduction
     ? this.createContinuousProducer(sType.turnipYield)
     : this.createSeasonalProducer(sType.harvestingWeeks, sType.turnipYield)

    return new PrimaryProducerDecorator({
      tile: tile, 
      producer: producer, 
      maxFlowers: this.maxFlowers
    })
  }

  createSeasonalProducer (harvestingWeeks, turnipYield) {
    return new SeasonalProducer({
      turnipYield: turnipYield,
      harvestWeeks: harvestingWeeks
    })
  }

  /**
   * Yields the same amount of turnips per week.
   */
  createContinuousProducer (turnipYield) {
    return new ContinuousProducer({
      turnipYield: turnipYield
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
  createRefiner (inputTypes, multiplier, radius, tile, moveCosts) {
    var refiner = new Refiner({
      inputTypes: inputTypes,
      zone: this.tileFinder.findTilesInDistanceOf(tile, radius, moveCosts),
      multiplier: multiplier,
      radius: radius,
      tile: tile
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
