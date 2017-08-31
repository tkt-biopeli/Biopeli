import Layout from './Layout'

/**
 * Layout that stacks the elements from the start of the menu towards
 */
export default class StackingLayout extends Layout {
  constructor ({ menuRect, linePadding, sectionPadding, vertical }) {
    super(menuRect, vertical) /* istanbul ignore next */

    this.linePadding = linePadding
    this.sectionPadding = sectionPadding
  }

  addComponentPadding (component) {
    this.drawLocation += this.componentParallelSize(component)
  }

  initialize () {
    this.drawLocation = this.parallelStart + this.sectionPadding
  }

  line () {
    this.drawLocation += this.linePadding
  }

  section () {
    this.drawLocation += this.sectionPadding
  }

  currentDrawLocation () {
    return this.drawLocation
  }
}
