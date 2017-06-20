import config from '../../config'

export default class TopBar {

  constructor({}) {            
    this.initializeValues()
  }

  initializeValues() {
    let itemConfig = config.topBarItems
    for (var i = 0; i < itemConfig.length; i++) {
      this[itemConfig[i].name] = 0      
    }
  }

  getValueOf(item) {
    return this[item]
  }

  setValueOf(item, value) {
    this[item] = value
  }
}