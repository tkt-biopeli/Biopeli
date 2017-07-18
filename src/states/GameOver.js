import Phaser from 'phaser'
import MenuBuilder from '../controllers/MenuBuilder'

/**
 * Game over screen
 */
export default class GameOver extends Phaser.State {
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
    this.menu = new MenuBuilder(this, 'gameover', this.camera.height * 5 / 9)
    this.stage.backgroundColor = 0x000000

    this.menu.createScore('Loppupisteesi: ' + this.points.toFixed(0) +
                     '\n' + 'Kaupungin koko: ' + this.population)
    this.menu.createButton('Jatka', () => { this.state.start('Start') })
    this.menu.finishMenu()
  }
}
