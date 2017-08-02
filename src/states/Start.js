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

    this.menuMusic = this.add.audio('menu')
    this.menuMusic.play()
    this.menuMusic.loopFull()

    this.menu = new MenuBuilder(this, 'start', this.camera.height / 4)
    this.menu.createTitle('Biopeli')
    this.menu.createDescription('MTechin tilaama peli biotaloudesta ja ruokaketjusta.')
    this.menu.createButton(
      'Aloita peli',
      () => { 
        this.state.start('Game', true, false, cityName, this.menuMusic.stop())
      }
    )
    this.menu.createButton(
      'Ohjeet', () => {
        this.state.start('Instructions', true, false, this.menuMusic.stop())
      }
    )
    this.menu.finishMenu()
  }
}
