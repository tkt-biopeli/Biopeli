import RandomEvent from './RandomEvent'

export default class RandomEventCreator {
  constructor ({conditionCreator, effectCreator, filterCreator}) {
    this.conditionCreator = conditionCreator
    this.effectCreator = effectCreator
    this.filterCreator = filterCreator

    this.initConditions()
    this.initEffects()
    this.initFilters()
  }

  initConditions () {
    this.conditionCreators = new Map()
  }

  initEffects () {
    this.effectCreators = new Map()
  }

  initFilters () {
    this.filterCreators = new Map()
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
    return this.createPart('filter', blueprint, this.filterCreator)
  }

  createEffect (blueprint) {
    return this.createPart('effect', blueprint, this.effectCreator)
  }

  createCondition (blueprint) {
    return this.createPart('condition', blueprint, this.conditionCreator)
  }

  createPart (name, blueprint, creator) {
    return this[name + 'Creators'].get(blueprint.name).call(creator, blueprint)
  }
}
