import AbstractMenu from './AbstractMenu'

/**
 * Screen displayed when the game is started
 */
export default class Start extends AbstractMenu {
  create () {
    super.create()
    this.createBackgroundImage('start')
    this.createTitle('Biopeli')
    this.createDescription('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
    this.createButton('Aloita peli', () => { this.state.start('Game') })
    this.createButton('Ohjeet', () => { this.state.start('Instructions') })
  }
}
