import Phaser from 'phaser'
import config from '../config'

/**
 * Generic menu with title, description and buttons
 */
export default class extends Phaser.State {
  init () { }

  /**
   * Load images for menus here
   */
  preload () {
    this.load.image('gameover', 'assets/images/gameover.png')
    this.load.image('start', 'assets/images/start.png')
  }

  /**
   * Create the menu with correct size
   */
  create () {
    this.title = null
    this.description = null
    this.buttons = []
    this.game.stage.backgroundColor = 0x6B8E23
    this.game.world.height = this.game.height
    this.game.world.width = this.game.width
    this.x = this.game.world.centerX
    this.y = this.game.world.height
    this.bigFont = {
      font: config.fontBig,
      fill: config.fontFill,
      fontWeight: config.fontWeightBold
    }
    this.smallFont = {
      font: config.fontSmall,
      fill: config.fontFill,
      wordWrap: true,
      wordWrapWidth: this.game.world.width * 0.8,
      align: 'center'
    }
    this.normalFont = {
      font: config.fontNormal,
      fill: config.fontFill
    }
  }

  /**
   * Menu title
   * @param {string} text - Title text
   */
  createTitle (text) {
    this.title = this.game.add.text(this.x, this.y / 4, text, this.bigFont)
    this.title.anchor.set(0.5)
  }

/**
 * Creates final score
 * @param {string} text - score text 
 */
  createScore (text) {
    this.score = this.game.add.text(this.x, this.y / 4, text, this.normalFont)
    this.score.anchor.set(0.5)
  }

  /**
   * Menu description
   * @param {string} text - Description that is displayed in the menu
   */
  createDescription (text) {
    this.description = this.game.add.text(this.x, this.y / 2, text, this.smallFont)
    this.description.anchor.set(0.5)
  }

  /**
   * Adds a new button to the menu
   * @param {string} text - Button text
   * @param {function} call - Function that is called when pressed
   */
  createButton (text, call) {
    var button = this.game.add.button(
      this.x, (this.y * (2 / 3) + (this.buttons.length * 75)),
      'emptyButton',
      call,
      this
    )
    button.anchor.set(0.5)

    var buttonText = this.game.add.text(
      this.x,
      (this.y * (2 / 3) + (this.buttons.length * 75)),
      text,
      this.normalFont
    )
    buttonText.anchor.set(0.5)

    this.buttons.push({
      button: button,
      text: buttonText
    })
  }

  createBackgroundImage (asset) {
    var sprite = this.add.sprite(this.world.centerX, this.world.centerY, asset)
    sprite.anchor.setTo(0.5, 0.5)
  }

  render () { }
  update () { }
}
