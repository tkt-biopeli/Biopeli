import Menu from '../models/menu/Menu'
import Map from '../models/map/Map'
import MapView from '../view/map/MapView'
import CameraMover from '../view/CameraMover'
import InputHandler from '../view/InputHandler'
import Player from './Player'

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

    this.cameraMover = new CameraMover({game: state, xSpeed: 16, ySpeed: 16})

    this.inputHandler = new InputHandler({game: state})

    this.player = new Player()
  }

  update () {
    var events = this.inputHandler.getEvents()

    this.map.update(events)

    // Camera-movement must happen before view is updated!
    this.cameraMover.update(events)

    this.mapView.drawWithOffset(this.state.game.camera.x, this.state.game.camera.y)

    this.menu.update(events)
  }
}
