export default class StaticLayout {
  constructor({ menuRect, vertical, linePadding }) {
    this.menuRect = menuRect

    if (vertical) {
      this.perpendicularSize = menuRect.width
      this.parallelSize = menuRect.height
    } else {
      this.perpendicularSize = menuRect.height
      this.parallelSize = menuRect.width
    }

    this.linePadding = linePadding
    this.vertical = vertical
  }

  init (components) {
    this.sectionAmount = components.length
    this.currentSection = 0
    this.currentLocation = this.linePadding
  }

  nextComponentLocation (component) {
    var coordinates = this.coordinates(component)
    this.addComponentPadding(component)
    return coordinates
  }
  
  addComponentPadding(component){
    if(this.vertical) this.currentLocation += component.height
    else this.currentLocation += component.width
  }

  afterLine () {
    this.currentLocation += this.linePadding
  }

  afterSection () {
    this.currentSection ++
    this.currentLocation = this.linePadding
  }

  coordinates (component) {
    var coords
    if (this.vertical) {
      coords = {
        x: this.menuRect.x + (this.perpendicularSize - component.width) / 2,
        y: this.menuRect.y + this.menuRect.height * (this.currentSection / this.sectionAmount) + this.currentLocation
      }
    } else {
      coords = {
        x: this.menuRect.x + this.menuRect.width * (this.currentSection / this.sectionAmount) + this.currentLocation,
        y: this.menuRect.y + (this.perpendicularSize - component.height) / 2
      }
    }

    if (component.type == 'text') {
      if (this.vertical) {
        coords.x = this.menuRect.x + this.perpendicularSize / 2
      } else {
        coords.y = this.menuRect.y + this.perpendicularSize / 2
      }
    }

    return coords
  }
}