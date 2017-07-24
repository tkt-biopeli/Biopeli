import Phaser from 'phaser'

import MenuBuilder from '../controllers/menucontrol/MenuBuilder'
import CityNameGenerator from '../models/namegeneration/CityNameGenerator'
import CityNames from '../models/namegeneration/CityNameList'
import utils from '../utils'

/**
 * Screen displayed when the game is started
 */
export default class Start extends Phaser.State {
  create () {
    var cityName = new CityNameGenerator({
      cityNames: CityNames,
      randomWithBounds: utils.randomWithBounds
    }).generateName()

    this.menu = new MenuBuilder(this, 'start', this.camera.height / 4)
    this.menu.createTitle('Biopeli')
    this.menu.createDescription('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
    this.menu.createButton('Aloita peli', () => { this.state.start('Game', true, false, cityName) })
    this.menu.createButton('Ohjeet', () => { this.state.start('Instructions') })
    this.menu.finishMenu()
  }
}
