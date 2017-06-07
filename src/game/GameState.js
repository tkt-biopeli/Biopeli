import Menu from '../models/menu/Menu'
import Map from '../models/map/Map'
import MapView from '../view/map/MapView'
import CameraMover from '../view/CameraMover'
import MapListener from '../view/MapListener'
import InputHandler from '../view/InputHandler'
import TileTypes from '../models/map/TileType'
import StructureTypes from '../models/map/StructureType'
import Player from './Player'

export default class GameState {
  constructor ({state, mapWidth, mapHeight, tileWidth, tileHeight}) {
    this.state = state

    state.world.setBounds(0, 0, mapWidth * tileWidth, mapHeight * tileHeight)

    this.tileTypes = TileTypes()
    this.structureTypes = StructureTypes()

    this.menu = new Menu({
      game: state,
      menuViewWidth: 256
    })

    // map grid
    this.map = new Map({
      gridSizeX: mapWidth,
      gridSizeY: mapHeight,
      tileWidth: tileWidth,
      tileHeight: tileHeight
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
    this.mapListener = new MapListener({game: state, map: this.map,
      tileTypes: this.tileTypes, structureTypes: this.structureTypes})

    this.inputHandler = new InputHandler({game: state})

    this.player = new Player()
  }

  update () {
    var events = this.inputHandler.getEvents()

    // Camera-movement must happen before view is updated!
    this.cameraMover.update(events)
    this.mapListener.update(events)

    this.mapView.drawWithOffset(this.state.game.camera.x, this.state.game.camera.y)

    this.menu.update(events)
  }
}
