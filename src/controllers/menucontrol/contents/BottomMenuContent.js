import Content from './Content'

export default class BottomMenuContent extends Content {
  constructor ({ mapView }) {
    super()
    this.mapView = mapView
  }

  createSections () {    
    
    this.button('', this.mapView.showFlowersLayer, this.mapView, 'daisyb')      
    this.button('', this.mapView.showFertilityLayer, this.mapView, 'fertility')            
    this.button('', this.mapView.showMoistureLayer, this.mapView, 'moisture')
  }
}
