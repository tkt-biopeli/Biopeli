import Phaser from 'phaser'
import MenuBuilder from '../../controllers/menucontrol/MenuBuilder'

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
    this.menu = new MenuBuilder(this, 'gameover', this.camera.height * 1 / 10, this.gameData.config, 4)
    this.menu.createTitle('Tulokset top 10')

    this.addScores() 

    this.menu.createButton('Uusi peli', () => { 
      this.state.start('Start', true, false, this.gameData)
    }, 'smallButton')

    this.menu.createButton('Lähimmät', () => {
      this.state.start('HighscoresLocal', true, false, this.gameData, this.scores)
    }, 'smallButton')

    this.menu.finishMenu()
  }
}
