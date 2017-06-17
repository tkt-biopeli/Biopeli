/**
 * Handles resetting the menu for the true action
 */
export default class ResetDecorator {

  /**
   * Description goes here
   * @param {*} param0 
   */
  constructor ({action, menu}) {
    this.action = action
    this.menu = menu
  }

  /**
   * Description goes here
   */
  act(){
    this.action.function.call(this.action.context)
    this.menu.reset()
  }
}
