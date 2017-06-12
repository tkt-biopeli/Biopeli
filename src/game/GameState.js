import Menu from '../view/menu/Menu'
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
  constructor ({ state, mapWidth, mapHeight, tileWidth, tileHeight, menuWidth }) {
    this.state = state

    state.world.setBounds(0, 0, mapWidth * tileWidth, mapHeight * tileHeight)

    this.tileTypes = TileTypes()
    this.structureTypes = StructureTypes()

    this.menuOptionCreator = new MenuOptionCreator({ structureTypes: this.structureTypes })

    this.menuView = new MenuView({
      game: state,
      leftBorderCoordinate: state.game.camera.width - 256,
      leftPadding: 35,
      sectionPadding: 12,
      linePadding: 8,
      buttonWidth: 189,
      buttonHeight: 66
    })
    this.menuView.redraw()

    this.menu = new Menu({
      menuView: this.menuView
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
      menu: this.menu,
      viewWidthPx: state.game.width - menuWidth,
      viewHeightPx: state.game.height
    })

    this.cameraMover = new CameraMover({ game: state, xSpeed: 400, ySpeed: 400 })

    this.mapListener = new MapListener({
      game: state,
      map: this.map,
      menuOptionCreator: this.menuOptionCreator,
      menu: this.menu
    })

    this.inputHandler = new InputHandler({ game: state, mapListener: this.mapListener, cameraMover: this.cameraMover })

    this.player = new Player()
  }

  update () {
    this.mapView.drawWithOffset(this.state.game.camera.x, this.state.game.camera.y)
  }
}
