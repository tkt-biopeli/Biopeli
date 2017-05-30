import Map from '../models/Map'
import ModelTile from '../models/ModelTile'
import TileType from '../models/TileType'
export default class MapView {

  constructor({ game, map, viewWidthPx, viewHeightPx }) {
    this.game = game
    this.map = map
    this.view = this.game.add.group()
    this.view.fixedToCamera = true
    this.viewWidthPx = viewWidthPx
    this.viewHeightPx = viewHeightPx
    this.tileWidth = map.tileWidth
    this.tileHeight = map.tileHeight
  }

  drawWithOffset (cameraX, cameraY) {
    
    // clear the view
    this.view.removeAll(true, true)

    // calculate grid coordinates for new view
    var startCol = Math.floor(cameraX / this.tileWidth)
    var endCol = startCol + (this.viewWidthPx / this.tileWidth)
    var startRow = Math.floor(cameraY / this.tileHeight)
    var endRow = startRow + (this.viewHeightPx / this.tileHeight) + 1

    // calculate offset
    var offX = -cameraX + startCol * this.tileWidth
    var offY = -cameraY + startRow * this.tileHeight

    
    // get tiles from Map and fill view with Sprites
    for (var c = startCol; c <= endCol; c++) {
      
      for (var r = startRow; r <= endRow; r++) {
        var x = (c - startCol) * this.tileWidth + offX
        var y = (r - startRow) * this.tileHeight + offY
        var tile = this.map.getTileWithGridCoordinates(c, r)
        

        if (typeof tile !== 'undefined') {
          var spr = this.view.add(this.game.make.sprite(Math.round(x), Math.round(y), tile.tileType.asset))
          spr.cameraOffset = new Phaser.Point(offX, offY)
          if (r == endRow) {
            // spr.cameraOffset = new Phaser.Point(0,0)
          }
        }
      }
    }        
  }
}