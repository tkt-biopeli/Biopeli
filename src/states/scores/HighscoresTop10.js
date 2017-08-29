import Phaser from 'phaser'
import MenuBuilder from '../../controllers/menucontrol/MenuBuilder'
import utils from '../../utils'
import config from '../../../assets/json/configurations'

export default class Highscores extends Phaser.State {
  init (gameData, scores) {
    this.gameData = gameData
    this.scores = scores
  }

  addScores () {
    var i, score
    var len = this.scores.length
    for (i = 0; i < 10 && i < len; i++) {
      score = this.scores[i]
      this.menu.createDescription('' + (i + 1) + ': ' + score.player + ' - ' + score.points + '\n')
    }
  }

  create () {
    this.menu = new MenuBuilder(this, 'start', this.camera.height * 1 / 10, this.gameData.config)
    this.menu.createTitle('Tulokset top 10')

    this.addScores() 

    this.menu.createButton('Uusi peli', () => { 
      this.state.start('Start', true, false, this.gameData) 
    })

    this.menu.createButton('Lähimmät', () => {
      this.state.start('HighscoresLocal', true, false, this.gameData, this.scores)
    })

    this.menu.finishMenu()
  }
}
