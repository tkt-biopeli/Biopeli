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
import TopBar from '../models/topbar/TopBar'
import TopBarView from '../view/topbar/TopBarView'
import TopBarControllerDemo from '../models/topbar/TopBarControllerDemo'

/**
 * Description goes here
 */
export default class GameState {
  /**
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
      vertical: true,
      menuBorderCoordinate: state.camera.width - config.menuWidth,
      leftPadding: config.menuLeftPadding,
      buttonWidth: config.menuButtonWidth,
      buttonHeight: config.menuButtonHeight,
      sectionPadding: config.sectionPadding,
      linePadding: config.linePadding,
      fontSize: config.menuFontSize,
      backgroundAsset: 'menuBg'
    })

    this.menu = new Menu({
      menuView: this.menuView
    })

    this.menu.redraw()

    // map view
    this.mapView = new MapView({
      game: state,
      map: this.map,
      menu: this.menu,
      viewWidthPx: state.game.width - menuWidth,
      viewHeightPx: state.game.height
    })

    this.topBar = new TopBar({})

    this.topBarView = new TopBarView({
      game: state,
      topBar: this.topBar,
      topBarWidth: state.game.width - menuWidth
    })

    this.topBarControllerDemo = new TopBarControllerDemo({
      player: this.player,
      topBar: this.topBar,
      topBarView: this.topBarView
    })

    this.cameraMover = new CameraMover({ game: state, xSpeed: config.cameraSpeed, ySpeed: config.cameraSpeed })

    this.mapListener = new MapListener({
      game: state,
      map: this.map,
      menuOptionCreator: this.menuOptionCreator,
      menu: this.menu
    })

    this.inputHandler = new InputHandler({ game: state, mapListener: this.mapListener, cameraMover: this.cameraMover })

    this.gameTimerListener = new GameTimerListener({player: this.player, menu: this.menu})

    this.gameTimer = new Timer({ interval: config.gameTimerInterval, currentTime: this.currentTime() })
    this.gameTimer.addListener(this.gameTimerListener)
    this.gameTimer.addListener(this.topBarControllerDemo)
    this.menuOptionCreator.gameTimer = this.gameTimer

    this.gameTimer.callListeners()
  }

  initializeModel (mapWidth, mapHeight, tileWidth, tileHeight) {
    this.tileTypes = TileTypes()
    this.structureTypes = StructureTypes()

    this.map = new Map({
      gridSizeX: mapWidth,
      gridSizeY: mapHeight,
      tileWidth: tileWidth,
      tileHeight: tileHeight
    })

    // fill map grid with sample data
    this.map.createMapHalfForestHalfWater()

    this.player = new Player()

    this.menuOptionCreator = new MenuOptionCreator({ structureTypes: this.structureTypes, player: this.player })
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
