import AbstractMenu from './AbstractMenu'

/**
 * Game over screen
 */
export default class GameOver extends AbstractMenu {
  /**
   * Here we can add to the parameters any data we want to
   * carry over to the game over screen
   * @param {*} score, final score
   * @param {*} population, final city population
   */
  init (score, population) {
    this.points = score
    this.population = population
  }

  create () {
    this.initializeMenu('gameover', this.camera.height * 5 / 9)
    this.stage.backgroundColor = 0x000000
    this.createScore('Loppupisteesi: ' + this.points +
                     '\n' + 'Kaupungin koko: ' + this.population)
    this.createButton('Jatka', () => { this.state.start('Start') })
    this.finishMenu()
  }
}
