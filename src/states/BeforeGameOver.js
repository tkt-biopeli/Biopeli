import Phaser from 'phaser'
import MenuBuilder from '../controllers/menucontrol/MenuBuilder'

/**
 * The screen before the actual game over screen
 */
export default class BeforeGameOver extends Phaser.State {
  /**
   * Description
   * 
   * @param {*} score, final score
   * @param {*} population, final city population
   */
  init (score, population, gameData, game, config, utils, texts) {
    this.points = score
    this.population = population
    this.gameData = gameData
    this.game = game
    this.config = config
    this.utils = utils
    this.texts = texts
  }

  /**
   * Creates the elements shown in the menu.
   * The input field is added first so that its value can be read by the submit
   * button.
   */
  create () {
    this.loadHighscoreToLocalStorage()

    this.menu = new MenuBuilder(this, 'gameover', this.camera.height * 5 / 9, this.gameData.config)
    this.stage.backgroundColor = 0x000000
    var inputField = this.addInputFieldToMenu()
    this.addButtonsToMenu(inputField)
  }

  addInputFieldToMenu () {
    this.menu.createInputField({
      padding: 8,
      borderWidth: 1,
      borderColor: '#000000',
      borderRadius: 6,
      placeHolder: this.texts.gameOverState.enterName      
    })
    this.menu.finishMenu()

    return this.menu.c.menuView.activeInputFields[0].inputField
  }

  addButtonsToMenu (inputField) {
    var toGameOverState = () => {
      this.state.start('GameOver', true, false, 
        this.points, this.population, this.gameData, this.game, this.texts)
    }
    var sendScore = (name) => {
      this.utils.submitScore(
        {player: name, points: this.points},
        this.config.gameSettings.scoreServer,
        new XMLHttpRequest()
      )
    }

    this.menu.createButton('Lähetä tulos', () => {
      sendScore(inputField.value)
      toGameOverState()
    })
    this.menu.createButton('Jatka', toGameOverState)
    this.menu.finishMenu()
  }

  loadHighscoreToLocalStorage () {
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
