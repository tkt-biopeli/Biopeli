import Phaser from 'phaser'
import MenuBuilder from '../controllers/menucontrol/MenuBuilder'
import utils from '../utils'
import config from '../../assets/json/configurations'

export default class Highscores extends Phaser.State {
  init (gameData) {
    this.gameData = gameData
  }
  create () {
    this.menu = new MenuBuilder(this, 'start', this.camera.height * 5 / 9, this.gameData.config)
    this.menu.createTitle('Tulokset')
    var scores = utils.fetchScores(config.gameSettings.scoreServer)
    var fmt = ''
    var i, len = scores.length, score
    for (i = 0; i < 5 && i < len; i++) {
      score = scores[i]
      fmt += (i + 1) + ': ' + score.player + ' - ' + score.points + '\n'
    }
    this.menu.createDescription(fmt)
    this.menu.createButton('Uusi peli', 
      () => { this.state.start('Start', true, false, this.gameData) })
    this.menu.finishMenu()
  }
}
