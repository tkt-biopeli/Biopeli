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
    var scores = utils.fetchScores(config.scoreServer)
    /*var fmt = ''
    scores.forEach((val, i) => {
      fmt += (i + 1) + ': ' + val.name + ' - ' + val.score + '\n'
    })*/
    this.menu.createDescription(scores)
    this.menu.createButton('Uusi peli', () => { this.state.start('Start') })
    this.menu.finishMenu()
  }
}
