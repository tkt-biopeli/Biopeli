import Phaser from 'phaser'
import WebFont from 'webfontloader'
// do not remove these two imports!
// eslint-disable-next-line no-unused-vars
import KineticScrolling from 'phaser-kinetic-scrolling-plugin'
// eslint-disable-next-line import/no-unresolved
import PhaserInput from 'phaser-input'

/**
 * Description goes here
 */
export default class extends Phaser.State {
  /**
   * Description goes here
   */
  init () {
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL
    this.game.scale.parentIsWindow = true
    this.game.scale.pageAlignHorizontally = true
    this.game.scale.pageAlignVertically = true
    
    this.stage.backgroundColor = '#EDEEC9'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)

    this.game.kineticScrolling = this.game.plugins.add(Phaser.Plugin.KineticScrolling)

    let plugin = new PhaserInput.PhaserInput.Plugin(this.game, this.game.plugins)
    this.game.add.plugin(plugin)
  }

  /**
   * Description goes here
   */
  preload () {
    WebFont.load({
      google: {
        families: ['Bangers']
      },
      active: this.fontsLoaded
    })

    let text = this.add.text(
      this.world.centerX, 
      this.world.centerY, 
      'loading fonts', 
      { font: '16px Arial', fill: '#dddddd', align: 'center' }
    )
    text.anchor.setTo(0.5, 0.5)

    this.load.image('loaderBg', './assets/images/loading/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loading/loader-bar.png')
  }

  /**
   * Description goes here
   */
  render () {
    if (this.fontsReady) {
      this.state.start('Splash')
    }
  }

  /**
   * Description goes here
   */
  fontsLoaded () {
    this.fontsReady = true
  }
}
