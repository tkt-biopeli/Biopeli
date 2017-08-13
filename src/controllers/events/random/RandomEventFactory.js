import RandomEvent from './RandomEvent'

import EmptyFilter from './filters/EmptyFilter'
import EmptyEffect from './effects/EmptyEffect'
import EmptyCondition from './conditions/EmptyCondition'

import And from './filters/And'
import Or from './filters/Or'
import Complement from './filters/Complement'
import TiletypeTileFilter from './filters/TiletypeTileFilter'
import AllTileFilter from './filters/AllTileFilter'
import ValuesTileFilter from './filters/ValuesTileFilter'

import TileValueEffect from './effects/TileValueEffect'
import MoneyEffect from './effects/MoneyEffect'

import TimeCondition from './conditions/TimeCondition'

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
  }

  initEffects () {
    this.effectCreators.set('empty', EmptyEffect)

    this.effectCreators.set('MoneyChange', MoneyEffect)
    this.effectCreators.set('TileValueChange', TileValueEffect)
  }

  initFilters () {
    this.filterCreators.set('empty', EmptyFilter)

    this.filterCreators.set('And', And)
    this.filterCreators.set('Or', Or)
    this.filterCreators.set('Complement', Complement)

    this.filterCreators.set('TilesWithTiletype', TiletypeTileFilter)
    this.filterCreators.set('TilesWithValues', ValuesTileFilter)
    this.filterCreators.set('AllTiles', AllTileFilter)
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
    var key = this[name + 'Creators'].has(blueprint.name) ? blueprint.name : this.defaultValue
    // Searches constructor with given name from the map and instantiates it
    return new (this[name + 'Creators'].get(key))({gameState: this.gameState, json: blueprint})
  }
}
