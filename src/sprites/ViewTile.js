import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor (game, x, y, modelTile) {
    super(game, x, y, modelTile.tileType.asset)
    this.modelTile = modelTile
  }
}
