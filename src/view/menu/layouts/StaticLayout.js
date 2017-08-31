import Layout from './Layout'

/**
 * Layout that places the sections balanced distance away from each other
 */
export default class StaticLayout extends Layout {
  constructor ({ menuRect, vertical, linePadding }) {
    super(menuRect, vertical) /* istanbul ignore next */

    this.linePadding = linePadding
  }

  initialize (components) {
    this.sectionAmount = components.length
    this.currentSection = 0
    this.currentLocation = this.linePadding
  }

  addComponentPadding (component) {
    this.currentLocation += this.componentParallelSize(component)
  }

  line () {
    this.currentLocation += this.linePadding
  }

  section () {
    this.currentSection++
    this.currentLocation = this.linePadding
  }

  currentDrawLocation () {
    return this.parallelSize * 
      (this.currentSection / this.sectionAmount) + 
      this.currentLocation
  }
}
