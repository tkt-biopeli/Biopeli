import Layout from './Layout'

export default class StackingLayout extends Layout{
  constructor ({ menuRect, linePadding, sectionPadding, vertical }) {
    super(menuRect, vertical)

    this.linePadding = linePadding
    this.sectionPadding = sectionPadding
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
