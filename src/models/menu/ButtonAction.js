
/**
 * Description goes here
 */
export default class ButtonAction {

  /**
   * Description goes here
   *
   * @param {object} param
   *
   * @param {string} param.name
   * @param {function} param.functionToCall
   * @param {???} param.context
   */
  constructor ({name, functionToCall, context}) {
    this.name = name
    this.function = functionToCall
    this.context = context
  }
}
