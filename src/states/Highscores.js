import Phaser from 'phaser'
import MenuBuilder from '../controllers/menucontrol/MenuBuilder'
import utils from '../utils'

export default class Highscores extends Phaser.State {
  create () {
    this.menu = new MenuBuilder(this, 'start', this.camera.height / 4)
    this.menu.createTitle('Tulokset')
    //var scores = utils.highscores.getScores()
    var scores = localStorage.getItem("biopeliHighScore")
    var fmt = ''
    scores.forEach((val, i) => {
      fmt += (i + 1) + ': ' + val.name + ' - ' + val.score + '\n'
    })
    this.menu.createDescription(fmt)
    this.menu.createButton('Uusi peli', () => { this.state.start('Start') })
    this.menu.finishMenu()
  }
}
