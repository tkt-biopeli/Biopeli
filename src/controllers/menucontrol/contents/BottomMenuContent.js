import Content from './Content'

export default class BottomMenuContent extends Content {
  constructor ({ mapView, menuController }) {
    super()
    this.mapView = mapView
    this.menuController = menuController
  }

  createSections () {
    let call = () => {
      let n = this.menuController.getContentIndex('options')
      this.menuController.changeContent(n)
    }
    this.button('', this.mapView.showFlowersLayer, this.mapView, 'daisyb')
    this.button('', this.mapView.showFertilityLayer, this.mapView, 'fertility')
    this.button('', this.mapView.showMoistureLayer, this.mapView, 'moisture')
    this.button('', call, this, 'options')
  }
}
