/**
 * Base class for layouts. Layouts handle how the items are placed in menu
 */
export default class Layout {
  constructor (menuRect, vertical) {
    this.menuRect = menuRect

    if (vertical) {
      this.perpendicularSize = menuRect.width
      this.parallelSize = menuRect.height
      this.parallelStart = menuRect.y
    } else {
      this.perpendicularSize = menuRect.height
      this.parallelSize = menuRect.width
      this.parallelStart = menuRect.x
    }

    this.vertical = vertical
  }

  init (components) {
    this.callbackComponent = null
    this.initialize(components)
  }

  afterLine () {
    if (!this.checkCallbackComponent()) this.line()
  }

  afterSection () {
    this.checkCallbackComponent()
    this.section()
  }

  /**
   * Gives the location of the next element
   * @param {*} component
   */
  nextComponentLocation (component) {
    this.checkCallbackComponent()

    var coordinates = this.coordinates(component)
    if (component.type !== 'text') {
      this.addComponentPadding(component)
    } else {
      this.callbackComponent = component
    }
    return coordinates
  }

  /**
   * Used for checking components size after it is created. Phaser's
   * add text function makes the text automatically fit to certain width,
   * and we can't know its height in advance. So, instead we create it 
   * first and check the size after its creation in this fuction.
   */
  checkCallbackComponent () {
    if (this.callbackComponent != null) {
      this.addComponentPadding(this.callbackComponent)
      this.callbackComponent = null
      return true
    }

    return false
  }

  /**
   * Calculates the locatino of next component
   * @param {*} component
   */
  coordinates (component) {
    var coords

    if (this.vertical) {
      coords = {
        x: this.menuRect.x + (this.perpendicularSize - component.width) / 2,
        y: this.menuRect.y + this.currentDrawLocation()
      }
    } else {
      coords = {
        x: this.menuRect.x + this.currentDrawLocation(),
        y: this.menuRect.y + (this.perpendicularSize - component.height) / 2
      }
    }

    if (component.type === 'text') {
      if (this.vertical) {
        coords.x = this.menuRect.x + this.perpendicularSize / 2
      } else {
        coords.y = this.menuRect.y + this.perpendicularSize / 2
      }
    }

    return coords
  }

  /**
   * Gives the component's size that is parallel to the menu
   * @param {*} component
   */
  componentParallelSize (component) {
    if (this.vertical) {
      return component.height
    } else {
      return component.width
    }
  }
}
