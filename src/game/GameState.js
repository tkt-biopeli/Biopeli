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
import config from '../config'
import GameTimerListener from '../models/GameTimerListener'
import Timer from '../view/Timer'

/**
 * Description goes here
 */
export default class GameState {

  /**
   * Description goes here
   * 
   * @param {object} param - Parameter object
   * 
   * @param {Phaser.Game} param.state - Current game
   * @param {Number} param.mapWidth - Map width in # of tiles 
   * @param {Number} param.mapHeight - Map height in # of tiles 
   * @param {Number} param.tileWidth - Tile width in pixels 
   * @param {Number} param.tileHeight - Tile height in pixels
   * @param {Number} param.menuWidth - Menu width in pixels
   */
  constructor ({ state, mapWidth, mapHeight, tileWidth, tileHeight, menuWidth }) {
    this.state = state

    state.world.setBounds(0, 0, mapWidth * tileWidth + menuWidth, mapHeight * tileHeight)

    this.initializeModel(mapWidth, mapHeight, tileWidth, tileHeight)

    this.menuView = new MenuView({
      game: state,
      leftBorderCoordinate: state.camera.width - config.menuWidth,
      leftPadding: config.menuLeftPadding,
      buttonWidth: config.menuButtonWidth,
      buttonHeight: config.menuButtonHeight,
      sectionPadding: 12,
      linePadding: 8
    })
    this.menuView.redraw()

    this.menu = new Menu({
      menuView: this.menuView
    })

    // map view
    this.mapView = new MapView({
      game: state,
      map: this.map,
      menu: this.menu,
      viewWidthPx: state.game.width - menuWidth,
      viewHeightPx: state.game.height
    })

    this.cameraMover = new CameraMover({ game: state, xSpeed: config.cameraSpeed, ySpeed: config.cameraSpeed })

    this.mapListener = new MapListener({
      game: state,
      map: this.map,
      menuOptionCreator: this.menuOptionCreator,
      menu: this.menu
    })

    this.inputHandler = new InputHandler({ game: state, mapListener: this.mapListener, cameraMover: this.cameraMover })

    this.gameTimerListener = new GameTimerListener()

    this.gameTimer = new Timer({interval: config.gameTimerInterval})
    this.gameTimer.addListener(this.gameTimerListener)
  }

  initializeModel(mapWidth, mapHeight, tileWidth, tileHeight){
    this.tileTypes = TileTypes()
    this.structureTypes = StructureTypes()// map grid

    this.map = new Map({
      gridSizeX: mapWidth,
      gridSizeY: mapHeight,
      tileWidth: tileWidth,
      tileHeight: tileHeight
    })

    // fill map grid with sample data
    this.map.createMapHalfForestHalfWater()

    this.player = new Player()

    this.menuOptionCreator = new MenuOptionCreator({ structureTypes: this.structureTypes })
  }

  /**
   * Description goes here
   */
  update () {
    this.mapView.draw(this.state.camera.x, this.state.camera.y)
    this.gameTimer.update(this.currentTime())
  }

  currentTime () {
    return Date.now()
  }
}
