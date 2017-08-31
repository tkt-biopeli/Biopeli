import Phaser from 'phaser'
import MenuBuilder from '../../controllers/menucontrol/MenuBuilder'
import utils from '../../utils'
import config from '../../../assets/json/configurations'

export default class HighscoresLoad extends Phaser.State {
  init (gameData, score) {
    this.gameData = gameData
    this.score = score
  }

  create () {
    this.menu = new MenuBuilder(this, 'gameover', this.camera.height * 1 / 10, this.gameData.config, 8)
    this.menu.createTitle('Ladataan tuloksia...')
    this.menu.finishMenu()

    var scores = utils.fetchScores(config.gameSettings.scoreServer, new XMLHttpRequest())
    this.state.start('HighscoresTop10', true, false, this.gameData, scores)
  }
}
