import Phaser from 'phaser'
import MenuBuilder from '../controllers/menucontrol/MenuBuilder'
import texts from '../../assets/json/texts'

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
  init (score, population, gameData, utils, texts) {
    this.points = score
    this.population = population
    this.gameData = gameData
    this.utils = utils
    this.texts = texts
  }

  create () {
    this.loadHighscore()

    this.menu = new MenuBuilder(this, 'gameover', this.camera.height * 5 / 9, this.gameData.config)
    this.stage.backgroundColor = 0x000000

    this.menu.createScore(
      this.texts.gameOverState.endScore + ': ' + this.points.toFixed(0) +
      '\n' + this.texts.gameOverState.endCitySize + ': ' + this.population)
    this.menu.createButton(this.texts.gameOverState.toStart, 
      () => { this.state.start('Start', true, false, this.gameData) })
    this.menu.createButton(this.texts.gameOverState.highscores, 
      () => { this.state.start('Highscores', true, false, this.gameData) })
    this.menu.finishMenu()
  }
  
  loadHighscore () {
    // load highscore
    var highScore = 0
    var loadScore = localStorage.getItem('biopeliHighScore')
    if (loadScore !== null) {
      highScore = parseInt(loadScore)
    }
    this.HighScore = highScore
    localStorage.setItem('biopeliHighScore', this.HighScore)
  }
}
