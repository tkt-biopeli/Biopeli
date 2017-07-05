import Layout from './Layout'

export default class StaticLayout extends Layout{
  constructor ({ menuRect, vertical, linePadding }) {
    super(menuRect, vertical)

    this.linePadding = linePadding
  }

  init (components) {
    this.sectionAmount = components.length
    this.currentSection = 0
    this.currentLocation = this.linePadding
  }

  afterLine () {
    this.currentLocation += this.linePadding
  }

  afterSection () {
    this.currentSection++
    this.currentLocation = this.linePadding
  }

  currentDrawLocation () {
    return this.parallelSize * (this.currentSection / this.sectionAmount) + this.currentLocation
  }
}
