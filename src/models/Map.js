// import Phaser from 'phaser'
import ModelTile from '../models/ModelTile'
import TileType from '../models/TileType'

export default class {

    constructor({ game, gridSizeX, gridSizeY, tileWidth, tileHeight }) {
        this.gridSizeX = gridSizeX
        this.gridSizeY = gridSizeY
        this.tileWidth = tileWidth
        this.tileHeight = tileHeight

        // this.tileMap = game.add.tilemap()
        this.mapGroup = game.add.group()
        // this.layer1 = tileMap.create('layer1', gridSizeX, gridSizeY, tileWidth, tileHeight)

        this.getTileX = function (x) {
            return Math.floor(x / this.tileWidth)
        }

        this.getTileY = function (y) {
            return Math.floor(y / this.tileHeight)
        }

        this.getScreenTileX = function (x) {
            return x * this.tileWidth
        }

        this.getScreenTileY = function (y) {
            return y * this.tileHeight
        }


        this.addTile = function addTile(x, y, tileType) {
            var newTile = new ModelTile(getTileX(x), getTileY(y), tileType)

            this.tileGroup.add(newTile)
            game.add.sprite(x, y, newTile.tileType.asset)
        }

        this.createMapHalfForestHalfWater = function () {
            var tileTypes = TileType.call()

            for (var i = 0; i < this.gridSizeY; i++) {
                if (i % 2 == 0) {
                    for (var j = 0; j < this.gridSizeX; j++) {
                        addTile((this.tileWidth * j) / 2, (this.tileHeight * i) / 2, tileTypes.forest)
                    }
                } else {
                    for (var j = 0; j < this.gridSizeX; j++) {
                        addTile(j, i, tileTypes.water)

                    }


                }
            }

        }
    }
