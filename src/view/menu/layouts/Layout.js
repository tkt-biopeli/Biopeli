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

  /**
   * Gives the location of the next element
   * @param {*} component
   */
  nextComponentLocation (component) {
    var coordinates = this.coordinates(component)
    this.addComponentPadding(component)
    return coordinates
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
      if (component.type === 'text') {
        return component.height * (Math.ceil(
            component.fontSize * 
            component.text.length / 
            this.menuRect.width * 
            9 / 16
          )
        )
      }
      return component.height
    } else {
      return component.width
    }
  }
}
