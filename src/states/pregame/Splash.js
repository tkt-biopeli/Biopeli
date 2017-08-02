import Phaser from 'phaser'
import utils from '../../utils'

/**
 * Description goes here
 */
export default class extends Phaser.State {
  /**
   * Description goes here
   */
  init () { }

  /**
   * Description goes here
   */
  preload () {
    this.loaderBg = this.add.sprite(
      this.game.world.centerX, this.game.world.centerY, 'loaderBg'
    )
    this.loaderBar = this.add.sprite(
      this.game.world.centerX, this.game.world.centerY, 'loaderBar'
    )
    utils.centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.image('emptyButton', 'assets/images/buttons/empty_button.png')
    this.load.image('unusableButton', 'assets/images/buttons/empty_unbutton.png')

    this.load.audio('music', 'assets/music/music.ogg')
    this.load.audio('menu', 'assets/music/menu.ogg')

    this.load.image('forest', 'assets/images/tiles/forest.png')
    this.load.image('water', 'assets/images/tiles/water.png')
    this.load.image('grass', 'assets/images/tiles/grass.png')
    this.load.image('field', 'assets/images/tiles/field.png')
    this.load.image('industrial', 'assets/images/tiles/industrial.png')
    this.load.image('wheat_farm', 'assets/images/structures/wheat_farm.png')
    this.load.image('berry_farm', 'assets/images/structures/berry_farm.png')
    this.load.image('dairy_farm', 'assets/images/structures/dairy_farm.png')
    this.load.image('mill', 'assets/images/structures/mill.png')

    this.load.image('turnip', 'assets/images/icons/turnip.png')
    this.load.image('score', 'assets/images/icons/score.png')
    this.load.image('time', 'assets/images/icons/time.png')
    this.load.image('cash', 'assets/images/icons/cash.png')

    this.load.image('gameover', 'assets/images/backgrounds/gameover.png')
    this.load.image('start', 'assets/images/backgrounds/start.png')
    this.load.image('menuBg', 'assets/images/backgrounds/low-poly-bg.png')

    this.load.spritesheet('daisy', 'assets/images/daisy.png', 32, 32, 10)
    this.load.image('area', 'assets/images/tiles/area.png')
    this.load.spritesheet('hammers', 'assets/images/hammers.png', 128, 128, 4)
  }

  /**
   * Description goes here
   */
  create () {
    this.state.start('Start')
  }
}
