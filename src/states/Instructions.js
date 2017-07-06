import Phaser from 'phaser'
import MenuBuilder from '../controllers/MenuBuilder'

/**
 * Game instructions
 */
export default class extends Phaser.State {
  create () {
    this.menu = new MenuBuilder(this, 'start', this.camera.height / 4)
    this.menu.createTitle('Ohjeet')
    this.menu.createDescription('Trycka på knappen')
    this.menu.createButton('knapp', () => { this.state.start('Start') })
    this.menu.finishMenu()
  }
}
