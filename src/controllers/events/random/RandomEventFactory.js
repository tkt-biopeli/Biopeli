import RandomEvent from './RandomEvent'

import EmptyFilter from './filters/common/EmptyFilter'
import EmptyEffect from './effects/EmptyEffect'
import EmptyCondition from './conditions/EmptyCondition'

import And from './filters/common/And'
import Or from './filters/common/Or'
import Complement from './filters/common/Complement'
import RandomFilter from './filters/common/RandomFilter'
import TileTypeTileFilter from './filters/tile/TileTypeTileFilter'
import ProductionAreaTileFilter from './filters/tile/ProductionAreaTileFilter'
import AllTileFilter from './filters/tile/AllTileFilter'
import ValuesTileFilter from './filters/tile/ValuesTileFilter'
import AllStructureFilter from './filters/structure/AllStructureFilter'
import StructureTypeStructureFilter from './filters/structure/StructureTypeStructureFilter'
import FoundingYearStructureFilter from './filters/structure/FoundingYearStructureFilter'
import TypeStructureFilter from './filters/structure/TypeStructureFilter'

import NameStructureTypeFilter from './filters/structuretype/NameStructureTypeFilter'
import AllStructureTypeFilter from './filters/structuretype/AllStructureTypeFilter'

import TileValueEffect from './effects/TileValueEffect'
import MoneyEffect from './effects/MoneyEffect'
import PopulationEffect from './effects/PopulationEffect'

import StructureYieldEffect from './effects/StructureYieldEffect'
import StructureCostEffect from './effects/StructureCostEffect'

import TimeCondition from './conditions/TimeCondition'
import PopulationCondition from './conditions/PopulationCondition'
import StructureAmountCondition from './conditions/StructureAmountCondition'

export default class RandomEventFactory {
  constructor ({gameState}) {
    this.gameState = gameState

    this.conditionCreators = new Map()
    this.effectCreators = new Map()
    this.filterCreators = new Map()

    // if object is not found by name, stub named as this is searched instead
    this.defaultValue = 'empty'

    this.initConditions()
    this.initEffects()
    this.initFilters()
  }

  initConditions () {
    this.conditionCreators.set('empty', EmptyCondition)

    this.conditionCreators.set('TimeLimiter', TimeCondition)
    this.conditionCreators.set('PopulationLimiter', PopulationCondition)
    this.conditionCreators.set('StructureLimiter', StructureAmountCondition)
  }

  initEffects () {
    this.effectCreators.set('empty', EmptyEffect)

    this.effectCreators.set('MoneyChange', MoneyEffect)
    this.effectCreators.set('PopulationChange', PopulationEffect)
    
    this.effectCreators.set('TileValueChange', TileValueEffect)

    this.effectCreators.set('StructureCostChange', StructureCostEffect)
    this.effectCreators.set('StructureYieldChange', StructureYieldEffect)
  }

  initFilters () {
    this.filterCreators.set('empty', EmptyFilter)

    this.filterCreators.set('And', And)
    this.filterCreators.set('Or', Or)
    this.filterCreators.set('Complement', Complement)
    this.filterCreators.set('Random', RandomFilter)

    this.filterCreators.set('TilesWithTiletype', TileTypeTileFilter)
    this.filterCreators.set('TilesWithValues', ValuesTileFilter)
    this.filterCreators.set('AllTiles', AllTileFilter)
    this.filterCreators.set('ProductionAreaTile', ProductionAreaTileFilter)

    this.filterCreators.set('AllStructures', AllStructureFilter)
    this.filterCreators.set('StructuresWithStructureType', StructureTypeStructureFilter)
    this.filterCreators.set('StructuresOfType', TypeStructureFilter)
    this.filterCreators.set('StructuresWithFoundingYear', FoundingYearStructureFilter)

    this.filterCreators.set('AllStructureTypes', AllStructureTypeFilter)
    this.filterCreators.set('StructureTypes', NameStructureTypeFilter)
  }

  createEvents (eventJSON) {
    var events = []
    for (let event of eventJSON.events) {
      events.push(this.createEvent(event))
    }

    return events
  }

  createEvent (eventBlueprint) {
    var condition = this.createCondition(eventBlueprint.condition)
    var effects = this.createEffects(eventBlueprint.effects)

    return new RandomEvent({
      name: eventBlueprint.name,
      description: eventBlueprint.description,
      condition: condition,
      effects: effects
    })
  }

  createEffects (effectBlueprints) {
    let effects = []
    for (let effectBlueprint of effectBlueprints) {
      effects.push(this.createEffectHolder(effectBlueprint))
    }
    return effects
  }

  createEffectHolder (effectBlueprint) {
    return {
      effect: this.createEffect(effectBlueprint),
      filter: this.createFilter(effectBlueprint.filter)
    }
  }

  createFilter (blueprint) {
    return this.createPart('filter', blueprint)
  }

  createEffect (blueprint) {
    return this.createPart('effect', blueprint)
  }

  createCondition (blueprint) {
    return this.createPart('condition', blueprint)
  }

  createPart (name, blueprint) {
    // Checks if creator list contains the value. If not, use default value
    if (!blueprint) { blueprint = { name: this.defaultValue } }
    var key = this[name + 'Creators'].has(blueprint.name) ? blueprint.name : this.defaultValue
    // Searches constructor with given name from the map and instantiates it
    return new (this[name + 'Creators'].get(key))({gameState: this.gameState, json: blueprint})
  }
}
