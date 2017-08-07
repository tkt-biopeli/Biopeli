import ViewTile from './ViewTile'
import Palette from './Palette'

export default class ViewTileFactory {
  constructor ({ game }) {
    this.game = game
    this.viewtileStorage = new Map()
    this.secondaryStorage = new Map()
    this.palette = new Palette()
    this.dampness = false
    this.fertility = false
    this.flowers = false
  }

  start (dampness, fertility, flowers, redrawTiles) {
    this.dampness = dampness
    this.fertility = fertility
    this.flowers = flowers
    this.redrawTiles = redrawTiles
    this.secondaryStorage.clear()
  }

  stop () {
    for (var viewTile of this.viewtileStorage.values()) {
      viewTile.destroy()
    }
    this.viewtileStorage.clear()

    for (var [mt, vt] of this.secondaryStorage.entries()) {
      this.viewtileStorage.set(mt, vt)
    }
  }

  getViewTile (modeltile) {
    let vt = this.loadVt(modeltile)
    // let vt = this.createVt(modeltile)
    this.updateVt(vt, modeltile)
    this.secondaryStorage.set(modeltile, vt)
    return vt
  }

  loadVt (modelTile) {
    let vt = this.viewtileStorage.get(modelTile)

    if (vt) {
      this.viewtileStorage.delete(modelTile)
    }
    if (vt === undefined) {
      vt = this.createVt(modelTile)
    }
    return vt
  }

  createVt (modelTile) {
    let vt = new ViewTile({ 
      game: this.game, 
      modelTile: modelTile, 
      dampnessCol: this.palette.getDampnessColour(modelTile.moisture), 
      fertilityCol: this.palette.getFertilityColour(modelTile.fertility) 
    })
    return vt
  }

  updateVt (viewtile, modeltile) {
    let redrawBorders = this.redrawTiles !== undefined
    let redraw = redrawBorders ? this.redrawTiles.includes(modeltile) : undefined
    viewtile.update(this.flowers, this.dampness, this.fertility, redrawBorders, redraw)
  }
}
