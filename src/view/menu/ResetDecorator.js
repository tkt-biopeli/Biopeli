/*
*Handles resetting the menu for the true action
*/
export default class ResetDecorator {
  constructor ({action, menu}) {
    this.action = action
    this.menu = menu
  }

  act(){
    this.action.function.call(this.action.context)
    this.menu.reset()
  }
}
