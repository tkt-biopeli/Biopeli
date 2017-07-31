export default class EventController {
  constructor () {
    this.events = new Map()

    this.addEvent('structureBuilt')
  }

  addEvent (name) {
    this.events.set(name, [])
  }

  addListener (name, callback, context) {
    this.events.get(name).push({ callback: callback, context: context })
  }

  event (name, ...values) {
    var listeners = this.events.get(name)
    if (listeners === undefined || null) return null
    for (let listener of listeners) {
      listener.callback.apply(listener.context, values)
    }
  }
}
