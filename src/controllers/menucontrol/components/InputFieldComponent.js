/**
 * Contains the values for the InputField component.
 */
export default class InputFieldComponent {
  /**
   * Sets the type of the component to inputField.
   * Optional parameters can be given as an object.
   *
   * @param {Object} parameters - contains optional parameters for the
   * input field.
   */
  constructor (parameters) {
    this.type = 'inputField'
    // move these two to the config file as default values
    this.width = 150
    this.height = 30

    this.parameters = this.validateParameters(parameters)
  }

  isNotObject (parameters) {
    if (parameters == null) return true
    return parameters.constructor !== Object
  }

  validateParameters (parameters) {
    if (this.isNotObject(parameters)) return {}

    var validParameters = new Set([
      'x', 'y', 'fill', 'fillAlpha', 'width', 'height', 'padding',
      'borderWidth', 'borderColor', 'borderRadius', 'forceCase', 'min', 'max',
      'type', 'font', 'placeHolder', 'placeHolderColor',
      'backgroundColor', 'cursorColor', 'selectionColor'
    ])
    var validated = {}
    
    for (var key in parameters) {
      if (validParameters.has(key)) {
        validated[key] = parameters[key]
        this.widthAndHeightUpdateChecker(key, parameters)
      }
    }
    return validated
  }

  widthAndHeightUpdateChecker (key, parameters) {
    switch (key) {
      case 'width':
        this.width = parameters[key]
        break
      case 'height':
        this.height = parameters[key]
        break
      default:
        return null
    }
  }
}
