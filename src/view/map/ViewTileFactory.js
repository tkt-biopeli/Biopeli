import ViewTile from './ViewTile'
import Palette from './Palette'

/**
 * Helper class needed to generate new ViewTiles, and reuse old ones
 * 
 * @export
 * @class ViewTileFactory
 */
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

  /**
   * Called to start ViewTile "production line", sets common variables needed for each 
   * ViewTile created in the production line.
   * Clears leftovers from previous "production run"
   * 
   * @param {any} dampness 
   * @param {any} fertility 
   * @param {any} flowers 
   * @param {any} redraw 
   * @memberof ViewTileFactory
   */
  start (dampness, fertility, flowers, redraw) {
    this.showMoisture = dampness
    this.showFertility = fertility
    this.showFlowers = flowers
    this.redraw = redraw
    this.secondaryStorage.clear()
  }

  /**
   * Called to stop the "produttion line. Destroys ViewTiles that
   * were deemed unneeded during production.
   * 
   * @memberof ViewTileFactory
   */
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

  /**
   * Returns a ViewTile representing the modeltile
   * New if no previous ViewTile of this modeltile was found,
   * otherwise the previous one after updating it.
   * 
   * @param {any} modeltile 
   * @returns 
   * @memberof ViewTileFactory
   */
  getViewTile (modeltile) {
    let vt = this.loadVt(modeltile)    
    this.updateVt(vt, modeltile)
    this.secondaryStorage.set(modeltile, vt)
    return vt
  }

  /**
   * Load a ViewTile from storage or call to create new one if not found
   * 
   * @param {any} modelTile 
   * @returns 
   * @memberof ViewTileFactory
   */
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
      borderColour: modelTile.owner !== null
        ? this.palette.getBorderColour(modelTile.owner.bordercolCode)
        : 0x000000,
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
      borderColour: modelTile.owner !== null
        ? this.palette.getBorderColour(modelTile.owner.bordercolCode)
        : 0x000000,
      beachId: this.map.getTileBeachId(modelTile)
    })
  }
}
