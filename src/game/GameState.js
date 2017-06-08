import Menu from '../models/menu/Menu'
import Map from '../models/map/Map'
import MapView from '../view/map/MapView'
import MenuView from '../view/menu/MenuView'
import CameraMover from '../view/CameraMover'
import MapListener from '../view/MapListener'
import InputHandler from '../view/InputHandler'
import TileTypes from '../models/map/TileType'
import StructureTypes from '../models/map/StructureType'
import Player from './Player'
import MenuOptionCreator from '../models/menu/MenuOptionCreator'

export default class GameState {
  constructor ({state, mapWidth, mapHeight, tileWidth, tileHeight}) {
    this.state = state

    state.world.setBounds(0, 0, mapWidth * tileWidth, mapHeight * tileHeight)

    this.tileTypes = TileTypes()
    this.structureTypes = StructureTypes()

    this.menuOptionCreator = new MenuOptionCreator()
    this.menu = new Menu({
      menuOptionCreator: this.menuOptionCreator
    })
    
    this.menuView = new MenuView({
      game: state,
      menuViewWidth: 256,
      buttonHeight: 75
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
    this.mapListener = new MapListener({
      game: state,
      map: this.map,
      menuOptionCreator: this.menuOptionCreator,
      menuView: this.menuView
    })

    this.inputHandler = new InputHandler({game: state})

    this.player = new Player()
  }

  update () {
    var events = this.inputHandler.getEvents()

    // Camera-movement must happen before view is updated!
    this.cameraMover.update(events)
    this.mapListener.update(events)

    this.mapView.drawWithOffset(this.state.game.camera.x, this.state.game.camera.y)

//    this.menuView.update(events)
  }
}
