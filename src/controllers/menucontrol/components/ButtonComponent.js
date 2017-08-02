/**
 * Description goes here
 */
export default class ButtonComponent {
  /**
   * Description goes here
   *
   * @param {object} param
   * @param {string} param.name
   * @param {function} param.functionToCall
   * @param {???} param.context
   */
  constructor ({name, functionToCall, context, height, width, fontSize, asset}) {
    this.type = 'button'
    this.name = name
    this.function = functionToCall
    this.context = context
    this.height = height
    this.width = width
    this.fontSize = fontSize
    this.asset = asset
  }
}
