import ViewTile from './ViewTile'
import Palette from './Palette'

export default class ViewTileFactory {
  constructor ({ game, map, config }) {
    this.game = game
    this.map = map
    this.viewtileStorage = new Map()
    this.secondaryStorage = new Map()
    this.palette = new Palette()
    this.showMoisture = false
    this.showFertility = false
    this.showFlowers = false
    this.config = config
  }

  start (dampness, fertility, flowers, redraw) {
    this.showMoisture = dampness
    this.showFertility = fertility
    this.showFlowers = flowers
    this.redraw = redraw
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
    this.redraw = false
  }

  getViewTile (modeltile) {
    let vt = this.loadVt(modeltile)    
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
      tileSize: this.config.mapSettings.tileSize,      
      borderColour:modelTile.owner !== null ? this.palette.getBorderColour(modelTile.owner.bordercolCode) : 0x000000,
      beachId: this.map.getTileBeachId(modelTile)
    })
    return vt
  }

  updateVt (viewtile, modelTile) {                
    viewtile.update({
      showFlowers: this.showFlowers,
      showMoisture: this.showMoisture,
      showFertility: this.showFertility,
      redraw: this.redraw,
      borderColour:modelTile.owner !== null ? this.palette.getBorderColour(modelTile.owner.bordercolCode) : 0x000000,
      beachId: this.map.getTileBeachId(modelTile)
    })
  }
}
