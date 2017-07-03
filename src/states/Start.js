import AbstractMenu from './AbstractMenu'

/**
 * Screen displayed when the game is started
 */
export default class Start extends AbstractMenu {

  create () {
    super.create()
    this.createBackgroundImage('start')
    this.createTitle('Biopeli')
    this.createDescription('Tänne jotain')
    this.createButton('Aloita peli', () => {this.state.start('Game')})
    this.createButton('Ohjeet', () => {this.state.start('Instructions')})
  }
}