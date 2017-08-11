import RandomEvent from './RandomEvent'
import ConditionFactory from './ConditionFactory'
import EffectFactory from './EffectFactory'
import FilterFactory from './FilterFactory'

export default class RandomEventFactory {
  constructor ({gameState}) {
    this.conditionFactory = new ConditionFactory({gameState: gameState})
    this.effectFactory = new EffectFactory({gameState: gameState})
    this.filterFactory = new FilterFactory({gameState: gameState})

    this.initConditions()
    this.initEffects()
    this.initFilters()
  }

  initConditions () {
    this.conditionCreators = new Map()
    this.conditionCreators.set('timeLimiter', this.conditionFactory.createTimeCondition)
  }

  initEffects () {
    this.effectCreators = new Map()
    this.effectCreators.set('tileValueChange', this.effectFactory.createTileValueEffect)
  }

  initFilters () {
    this.filterCreators = new Map()
    this.filterCreators.set('tilesWithTiletype', this.filterFactory.createTiletypeTileFilter)
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
    return this.createPart('filter', blueprint, this.filterFactory)
  }

  createEffect (blueprint) {
    return this.createPart('effect', blueprint, this.effectFactory)
  }

  createCondition (blueprint) {
    return this.createPart('condition', blueprint, this.conditionFactory)
  }

  createPart (name, blueprint, factory) {
    return this[name + 'Creators'].get(blueprint.name).call(factory, blueprint)
  }
}
