import config from '../../config'

/**
 * Model class for the info bar on top of the game screen
 * 
 * @export
 * @class TopBar
 */
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

  getValueOf(itemName) {
    return this[itemName]
  }

  setValueOf(itemName, value) {
    this[itemName] = value
  }
}