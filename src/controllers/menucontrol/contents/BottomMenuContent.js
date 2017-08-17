import Content from './Content'

export default class BottomMenuContent extends Content {
  constructor ({ mapView, menuController, telegramStorage }) {
    super()
    this.mapView = mapView
    this.menuController = menuController
    this.telegramStorage = telegramStorage
  }

  createSections () {
    let cityCall = () => {
      let n = this.menuController.getContentIndex('city')
      this.menuController.changeContent(n)      
    }

    let optionsCall = () => {
      let n = this.menuController.getContentIndex('options')
      this.menuController.changeContent(n)
    }

    let cityAsset = this.telegramStorage.notificate() ? 'info_unread' : 'info'
    this.button('', cityCall, this, cityAsset)
    this.button('', this.mapView.showFlowersLayer, this.mapView, 'daisyb')
    this.button('', this.mapView.showFertilityLayer, this.mapView, 'fertility')
    this.button('', this.mapView.showMoistureLayer, this.mapView, 'moisture')
    this.button('', optionsCall, this, 'options')
  }
}
