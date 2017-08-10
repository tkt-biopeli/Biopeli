import Phaser from 'phaser'
import MenuBuilder from '../controllers/menucontrol/MenuBuilder'
import texts from '../../assets/json/texts'

/**
 * Game instructions
 */
export default class extends Phaser.State {
  init (gameData) {
    this.gameData = gameData
  }

  create () {
    this.menu = new MenuBuilder(this, 'start', this.camera.height / 4, this.gameData.config)
    this.menu.createTitle(texts.prePlayStateTexts.instructions)
    this.menu.createDescription(texts.prePlayStateTexts.instructionsDescription)
    this.menu.createButton(texts.prePlayStateTexts.back, 
      () => { this.state.start('Start', true, false, this.gameData) })
    this.menu.finishMenu()
  }
}
