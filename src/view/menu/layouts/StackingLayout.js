import Layout from './Layout'

/**
 * Layout that stacks the elements from the start of the menu towards
 */
export default class StackingLayout extends Layout {
  constructor ({ menuRect, linePadding, sectionPadding, vertical }) {
    super(menuRect, vertical)

    this.linePadding = linePadding
    this.sectionPadding = sectionPadding
  }

  addComponentPadding (component) {
    this.drawLocation += this.componentParallelSize(component)
  }

  init () {
    this.drawLocation = this.parallelStart + this.sectionPadding
  }

  afterLine () {
    this.drawLocation += this.linePadding
  }

  afterSection () {
    this.drawLocation += this.sectionPadding
  }

  currentDrawLocation () {
    return this.drawLocation
  }
}
