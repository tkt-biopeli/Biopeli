import Content from './Content'

export default class BottomMenuContent extends Content {
  constructor ({ mapView }) {
    super()
    this.mapView = mapView
  }

  createSections () {
        // this.sectionName('fertility')

    this.button('fertility', this.mapView.showFertilityLayer(), this.mapView, 'fertility')
    this.icon('time')

    this.section('moisture')
    this.button('moisture', this.mapView.showMoistureLayer(), this.mapView, 'moisture')
  }
}
