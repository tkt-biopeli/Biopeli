import Phaser from 'phaser'
import MenuBuilder from '../controllers/menucontrol/MenuBuilder'
import utils from '../utils'
import config from '../../assets/json/configurations'

export default class Highscores extends Phaser.State {
  init (gameData) {
    this.gameData = gameData
  }
  create () {
    this.menu = new MenuBuilder(this, 'start', this.camera.height * 1 / 10, this.gameData.config)
    this.menu.createTitle('Tulokset')
    var scores = utils.fetchScores(config.gameSettings.scoreServer)
    var i, score
    var len = scores.length
    for (i = 0; i < 10 && i < len; i++) {
      score = scores[i]
      this.menu.createDescription('' + (i + 1) + ': ' + score.player + ' - ' + score.points + '\n')
    }
    this.menu.createButton('Uusi peli', 
      () => { this.state.start('Start', true, false, this.gameData) })
    this.menu.finishMenu()
  }
}
