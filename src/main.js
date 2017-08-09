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
import config from '../assets/json/configurations.json'
//
/**
 * Description goes here
 */
class Game extends Phaser.Game {
  /**
   * Description goes here
   */
  constructor () {
    const docElement = document.documentElement
    const width = docElement.clientWidth > config.gameSettings.windowSize.maxWidth 
      ? config.gameSettings.windowsSize.maxWidth 
      : docElement.clientWidth
    const height = docElement.clientHeight > config.gameSettings.windowSize.maxHeight 
      ? config.gameSettings.windowSize.maxHeight 
      : docElement.clientHeight

    super(width, height, Phaser.CANVAS, 'content', null)

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('AssetsLoader', AssetsLoader, false)
    this.state.add('Game', GameState, false)
    this.state.add('Start', StartState, false)
    this.state.add('Instructions', InstructionsState, false)
    this.state.add('GameOver', GameOverState, false)

    this.state.start('Boot')
  }
}

window.game = new Game()
