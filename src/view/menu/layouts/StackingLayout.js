export default class StackingLayout {
  constructor ({ menuRect, linePadding, sectionPadding, vertical }) {
    this.menuRect = menuRect

    if (vertical) {
      this.perpendicularSize = menuRect.width
      this.parallelSize = menuRect.height
    } else {
      this.perpendicularSize = menuRect.height
      this.parallelSize = menuRect.width
    }

    this.linePadding = linePadding
    this.sectionPadding = sectionPadding
    this.vertical = vertical
  }

  init () {
    if (this.vertical) {
      this.drawLocation = this.menuRect.y
    } else {
      this.drawLocation = this.menuRect.x
    }
    this.drawLocation += this.sectionPadding
  }

  nextComponentLocation (component) {
    var location = this.coordinates(component)
    this.addComponentPadding(component)
    return location
  }

  afterLine () {
    this.drawLocation += this.linePadding
  }

  afterSection () {
    this.drawLocation += this.sectionPadding
  }

  addComponentPadding (component) {
    if (this.vertical) this.drawLocation += component.height
    else this.drawLocation += component.width
  }

  coordinates (component) {
    var coords
    if (this.vertical) {
      coords = {
        x: this.menuRect.x + (this.perpendicularSize - component.width) / 2,
        y: this.drawLocation
      }
    } else {
      coords = {
        x: this.drawLocation,
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
}
