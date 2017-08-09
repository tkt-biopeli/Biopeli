import Phaser from 'phaser'
import MenuBuilder from '../controllers/menucontrol/MenuBuilder'

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
  init (score, population, gameData) {
    this.points = score
    this.population = population
    this.gameData = gameData
  }

  create () {
    // load highscore
    var highScore = 0
    var loadScore = localStorage.getItem('biopeliHighScore')
    if (loadScore !== null) {
      highScore = parseInt(loadScore)
    }
    this.HighScore = highScore
    localStorage.setItem('biopeliHighScore', this.HighScore)

    this.menu = new MenuBuilder(this, 'gameover', this.camera.height * 5 / 9, this.gameData.config)
    this.stage.backgroundColor = 0x000000

    this.menu.createScore('Loppupisteesi: ' + this.points.toFixed(0) +
      '\n' + 'Kaupungin koko: ' + this.population)
    this.menu.createButton('Alkuun', 
      () => { this.state.start('Start', true, false, this.gameData) })
    this.menu.createButton('Tulokset', 
      () => { this.state.start('Highscores', true, false, this.gameData) })
    this.menu.finishMenu()
  }
}
