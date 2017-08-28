import config from '../assets/json/configurations'
import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/pregame/Boot'
import SplashState from './states/pregame/Splash'
import AssetsLoader from './states/pregame/AssetsLoader'
import GameState from './states/Play'
import BeforeGameOverState from './states/BeforeGameOver'
import GameOverState from './states/GameOver'
import StartState from './states/Start'
import InstructionsState from './states/Instructions'
import HighscoresState from './states/Highscores'

/**
 * Description goes here
 */
class Game extends Phaser.Game {
  /**
   * Description goes here
   */
  constructor () {
    var size = {
      minWidth: config.gameSettings.windowSize.minWidth,
      minHeight: config.gameSettings.windowSize.minHeight,
      maxWidth: config.gameSettings.windowSize.maxWidth,
      maxHeight: config.gameSettings.windowSize.maxHeight
    }
    
    const docElement = document.documentElement
    let height = 0
    let width = 0

    if ((docElement.clientHeight / 9) < (docElement.clientWidth / 16)) {
      height = docElement.clientHeight < size.minHeight ? size.minHeight : docElement.clientHeight
      height = height <= size.maxHeight ? height : size.maxHeight
      width = Math.round((16 / 9) * height)
    } else {
      width = docElement.clientWidth < size.minWidth ? size.minWidth : docElement.clientWidth
      width = width <= size.maxWidth ? width : size.maxWidth
      height = Math.round((9 / 16) * width)
    }

    super(width, height, Phaser.CANVAS, 'content', null)

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('AssetsLoader', AssetsLoader, false)
    this.state.add('Game', GameState, false)
    this.state.add('Start', StartState, false)
    this.state.add('Instructions', InstructionsState, false)    
    this.state.add('BeforeGameOver', BeforeGameOverState, false)
    this.state.add('GameOver', GameOverState, false)
    this.state.add('Highscores', HighscoresState, false)

    this.state.start('Boot')
  }
}

window.game = new Game()
