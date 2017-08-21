/**
 * Capsulates the input field as a component.
 */
export default class InputField {
  constructor ({ game, viewGroup, x, y, parameters }) {
    this.type = 'inputField'
    this.group = viewGroup
    this.parameters = parameters

    this.inputField = game.add.inputField(x, y, this.parameters)
    this.group.add(this.inputField)
  }

  update (x, y) {
    this.inputField.x = x
    this.inputField.y = y
  }

  destroy () {
    this.group.removeChild(this.inputField)
    this.inputField.destroy()
  }
}
