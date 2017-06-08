export default class ButtonAction {
  constructor ({name, functionToCall, valuesToCallWith}) {
    this.name = name
    this.function = functionToCall
    this.values = valuesToCallWith
  }
}
