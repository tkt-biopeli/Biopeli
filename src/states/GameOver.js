import AbstractMenu from './AbstractMenu'
import config from '../config'

/**
 * Game over screen
 */
export default class GameOver extends AbstractMenu {

  create () {
    super.create()
    this.stage.backgroundColor = 0x000000
    this.createBackgroundImage('gameover')
    this.createButton('Jatka', () => { this.state.start('Start') })
  }
}
