import MenuController from '../controllers/MenuController'
import Map from '../models/map/Map'
import MapView from '../view/map/MapView'
import MenuView from '../view/menu/MenuView'
import CameraMover from '../view/CameraMover'
import MapListener from '../view/MapListener'
import InputHandler from '../view/InputHandler'
import TileTypes from '../models/map/TileType'
import StructureTypes from '../models/map/StructureType'
import Player from './Player'
import MenuOptionCreator from '../controllers/actioncreation/MenuOptionCreator'
import config from '../config'
import GameTimerListener from '../models/GameTimerListener'
import Timer from '../view/Timer'
import TopBar from '../models/topbar/TopBar'
import TopBarView from '../view/topbar/TopBarView'
import TopBarControllerDemo from '../models/topbar/TopBarControllerDemo'
import TopBarControllerT from '../controllers/TopBarController'
import StackingLayout from '../view/menu/layouts/StackingLayout'

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
      layout: new StackingLayout({
        menuRect: {
          x: state.camera.width - config.menuWidth,
          y: 0,
          width: config.menuWidth,
          height: state.camera.height
        },
        linePadding: config.linePadding,
        sectionPadding: config.sectionPadding,
        vertical: true
      }),
      background: 'menuBg'
    })

    this.topBarViewt = new MenuView({
      game: state,
      layout: new StackingLayout({
        menuRect: {
          x: 0,
          y: 0,
          width: state.camera.width - config.menuWidth,
          height: config.topBarSettings.height
        },
        linePadding: 5,
        sectionPadding: 5,
        vertical: false
      }),
      background: null
    })

    this.topBarControllert = new TopBarControllerT({
      menuView: this.topBarViewt,
      player: this.player
    })

    this.menuController = new MenuController({
      menuView: this.menuView
    })

    // map view
    this.mapView = new MapView({
      game: state,
      map: this.map,
      menu: this.menuController,
      viewWidthPx: state.game.width - menuWidth,
      viewHeightPx: state.game.height
    })
    
    this.cameraMover = new CameraMover({ game: state, xSpeed: config.cameraSpeed, ySpeed: config.cameraSpeed })

    this.mapListener = new MapListener({
      game: state,
      map: this.map,
      menuOptionCreator: this.menuOptionCreator,
      menuController: this.menuController
    })

    this.inputHandler = new InputHandler({ game: state, mapListener: this.mapListener, cameraMover: this.cameraMover })

    this.gameTimerListener = new GameTimerListener({player: this.player, menuController: this.menuController, topBarController: this.topBarControllert})

    this.gameTimer = new Timer({ interval: config.gameTimerInterval, currentTime: this.currentTime() })
    this.gameTimer.addListener(this.gameTimerListener)
    //this.gameTimer.addListener(this.topBarControllerDemo)
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
