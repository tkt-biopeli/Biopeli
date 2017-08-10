import config from '../assets/json/configurations'
import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/pregame/Boot'
import SplashState from './states/pregame/Splash'
import AssetsLoader from './states/pregame/AssetsLoader'
import GameState from './states/Play'
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
      maxWidth: config.gameSettings.windowSize.maxWidth,
      maxHeight: config.gameSettings.windowSize.maxHeight
    }
    
    const docElement = document.documentElement
    const width = docElement.clientWidth > size.maxWidth 
      ? size.maxWidth 
      : docElement.clientWidth
    const height = docElement.clientHeight > size.maxHeight 
      ? size.maxHeight 
      : docElement.clientHeight

    super(width, height, Phaser.CANVAS, 'content', null)

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('AssetsLoader', AssetsLoader, false)
    this.state.add('Game', GameState, false)
    this.state.add('Start', StartState, false)
    this.state.add('Instructions', InstructionsState, false)
    this.state.add('GameOver', GameOverState, false)
    this.state.add('Highscores', HighscoresState, false)

    this.state.start('Boot')
  }
}

window.game = new Game()
