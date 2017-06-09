export default class ButtonAction {
  constructor ({name, functionToCall, context}) {
    this.name = name
    this.function = functionToCall
    this.context = context
  }
}
