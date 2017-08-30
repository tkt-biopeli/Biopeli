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
  init (score, population, gameData, game, texts) {
    this.points = score
    this.population = population
    this.gameData = gameData
    this.game = game
    this.texts = texts
  }

  create () {
    this.menu = new MenuBuilder(this, 'gameover', this.camera.height * 1 / 5, this.gameData.config)
    this.stage.backgroundColor = 0x000000
    this.menu.createScore(
      [
        this.texts.gameOverState.endScore + ': ' + this.points.toFixed(0),
        this.texts.gameOverState.endCitySize + ': ' + this.population
      ]
    )
    this.menu.createButton(this.texts.gameOverState.toStart,
      () => { this.state.start('Start', true, false, this.gameData) })
    this.menu.createButton(this.texts.gameOverState.highscores,
      () => { this.state.start('HighscoresLoad', true, false, this.gameData, this.points) })
    this.menu.createButton(this.texts.gameOverState.mailTo,
      () => {
        window.location.href = 'mailto:' + 
        this.gameData.config.gameSettings.mailToAddress
      })
    this.menu.finishMenu()
  }
}
