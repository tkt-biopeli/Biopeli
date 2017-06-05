import Menu from './menu/Menu'
import Map from './map/Map'
import MapView from '../view/map/MapView'
export default class GameState {
  constructor ({state}) {
    this.state = state

    this.menu = new Menu({
      game: state,
      menuViewWidth: 256
    })

    // map grid
    this.map = new Map({
      game: state,
      gridSizeX: Math.ceil(state.game.width * 4 / 128),
      gridSizeY: Math.ceil(state.game.height * 4 / 128),
      tileWidth: 128,
      tileHeight: 128
    })

    // fill map grid with sample data
    this.map.createMapHalfForestHalfWater()

    // map view
    this.mapView = new MapView({
      game: state,
      map: this.map,
      viewWidthPx: state.game.width - 256,
      viewHeightPx: state.game.height
    })
  }

  update () {
    this.map.update()

    this.mapView.drawWithOffset(this.state.game.camera.x, this.state.game.camera.y)

    this.menu.update()
  }
}
