import Phaser from 'phaser'
import ModelTile from '../models/ModelTile'

export default class {
    constructor ({ game, x, y, modelTile}) {
        this.game = game
        this.x = x
        this.y = y

        this.nature = game.add.sprite(x, y, modelTile.tileType.asset)
    }
}
