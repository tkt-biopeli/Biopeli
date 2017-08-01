/**
 * Handles resetting the menu for the true action
 */
export default class ResetDecorator {
  /**
   * Description goes here
   * @param {object} param
   * @param { ??? } param.action
   * @param {Menu} param.menu
   */
  constructor ({ action, controller }) {
    this.action = action
    this.controller = controller
  }

  /**
   * Description goes here
   */
  act () {
    this.action.function.call(this.action.context)
    this.controller.reset()
  }
}
