import Phaser from 'phaser'

export default class {
    constructor ({ game, x, y }) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.tileGroup = this.game.add.group();
    }

    update () {

    }
}
