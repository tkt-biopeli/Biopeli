export default class SetStateDecorator {
  constructor ({ action, controller, name, value }) {
    this.action = action
    this.controller = controller
    this.name = name
    this.value = value
  }

  act () {
    this.action.function.call(this.action.context)
    this.controller.addState(this.name, this.value)
  }
}
