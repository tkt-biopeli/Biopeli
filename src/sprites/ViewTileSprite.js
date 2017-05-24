import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor (game, x, y, modelTile) {
    super(game, x, y, modelTile.tileType.asset)
    // // // this.game = game
    // // this.x = x
    // this.y = y
    this.modelTile = modelTile

    // this.nature = game.add.sprite(x, y, modelTile.tileType.asset)
  }
}
