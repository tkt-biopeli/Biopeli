import Phaser from 'phaser'
import config from '../config'

/**
 * Generic menu with title, description and buttons
 */
export default class extends Phaser.State {

  init () { }
  preload () { }

  create () { 
    this.title = null
    this.description = null
    this.buttons = []
    game.stage.backgroundColor = 0x6B8E23
  }

  createTitle (text) {
    var style = {
      font: config.font, 
      fill: config.textColor,
      fontWeight: 'bold',
      fontSize: 32
    }

    var x = game.world.centerX,
        y = game.world.height * (1 / 5)

    this.title = game.add.text(x,y,text,style)
    this.title.anchor.set(0.5)
  }

  createDescription (text) {
    var style = {
      font: config.font, 
      fill: config.textColor,
    }

    var x = game.world.centerX,
        y = game.world.height * (1 / 2)
    
    this.description = game.add.text(x,y,text,style)
    this.description.anchor.set(0.5)
  }

  createButton (text, call) {
    var style = {
      font: config.font, 
      fill: config.textColor
    }

    var x = game.world.centerX,
        y = game.world.height * (3 / 4) + (this.buttons.length * 75)

    var button = game.add.button(
      x, y, 
      'emptyButton',
      call,
      this
    )
    button.anchor.set(0.5)

    var buttonText = game.add.text(
      x,
      y, 
      text, 
      style
    )
    buttonText.anchor.set(0.5)

    this.buttons.push({
      button: button,
      text: buttonText
    })
  }

  render () { }
  update () { }
}