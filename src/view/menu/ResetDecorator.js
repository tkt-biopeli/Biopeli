/**
 * Handles resetting the menu for the true action
 */
export default class ResetDecorator {
  /**
   * Description goes here
   *
   * @param {object} param
   *
   * @param { ??? } param.action
   * @param {Menu} param.menu
   */
  constructor({ action, menu }) {
    this.action = action
    this.menu = menu
  }

  /**
   * Description goes here
   */
  act() {
    this.action.function.call(this.action.context)
    this.menu.reset()
  }
}
