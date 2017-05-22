import Phaser from 'phaser'
import ModelTile from '../models/ModelTile'

export default class {
    constructor ({ game, x, y, modelTile}) {
        console.log(game)

        this.game = game
        this.x = x
        this.y = y

        console.log(modelTile)
        console.log(modelTile.tileType)
        this.nature = game.add.sprite(x, y, modelTile.tileType.asset)
    }
}
