/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../view/Mushroom'
import CameraMover from '../view/CameraMover'
import GameState from '../models/GameState'

export default class extends Phaser.State {
  init () { }
  preload () { }

  create () {
    const bannerText = 'Biopeli 2.0'
    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText)
    banner.font = 'Bangers'
    banner.padding.set(10, 16)
    banner.fontSize = 40
    banner.fill = '#77BFA3'
    banner.smoothed = false
    banner.anchor.setTo(0.5)

    // ever rolling mushroom
    this.mushroom = new Mushroom({
      game: this,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'mushroom'
    })

    this.game.add.existing(this.mushroom)

    this.gameState = new GameState({state: this})
    this.cameraMover = new CameraMover({game: this, xSpeed: 16, ySpeed: 16})

    this.cursors = this.game.input.keyboard.createCursorKeys()
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.mushroom, 32, 32)
      this.game.debug.cameraInfo(this.game.camera, 500, 32)
    }
  }

  update () {
    this.gameState.update()
    this.cameraMover.update()
  }
}
