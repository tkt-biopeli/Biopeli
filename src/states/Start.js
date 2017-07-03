import Phaser from 'phaser'
import config from '../config'
import AbstractMenu from './AbstractMenu'

/**
 * Screen displayed when the game is started
 */
export default class extends AbstractMenu {

  create () {
    super.create()
    this.createTitle('Biopeli')
    this.createDescription('Tänne jotain')
    this.createButton('Aloita peli', () => {this.state.start('Game')})
    this.createButton('Ohjeet', () => {this.state.start('Instructions')})
  }
}