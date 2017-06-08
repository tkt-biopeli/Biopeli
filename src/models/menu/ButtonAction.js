export default class ButtonAction {
  constructor ({name}) {
    this.name = name
  }

  setOnClick(functionToCall){
    this.function = functionToCall
  }
}
