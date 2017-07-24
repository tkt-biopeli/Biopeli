export default class EventController {
  constructor () {
    this.events = new Map()

    this.addEvent('structureBuilt')
  }

  addEvent (name) {
    this.events.set(name, [])
  }

  addListener (name, callback, context) {
    this.events.get(name).push({callback: callback, context: context})
  }

  event (name, ...values) {
    var event = this.events.get(name)
    if(event != null) {
      event.callback.apply(event.context, values)
    }
  }
}