/*
*Handles resetting the menu for the true action
*/
export default class ResetDecorator {
  constructor ({action, menuView}) {
    this.action = action
    this.menuView = menuView
  }

  act(){
    this.action.function.call(this.action.context)
    this.menuView.reset()
  }
}
