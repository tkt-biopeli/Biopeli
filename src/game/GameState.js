import config from '../config'
import Map from '../models/map/Map'
import Player from './Player'
import City from '../models/city/City'
import StructureFactory from '../models/map/structure/StructureFactory'
import GameEvents from './GameEvents'
import MapView from '../view/map/MapView'
import MenuView from '../view/menu/MenuView'
import CameraMover from '../view/CameraMover'
import MapListener from '../view/MapListener'
import InputHandler from '../view/InputHandler'
import Timer from '../view/Timer'
import GameTimerListener from '../models/GameTimerListener'
import MenuOptionCreator from '../controllers/actioncreation/MenuOptionCreator'
import TopBarController from '../controllers/TopBarController'
import MenuController from '../controllers/MenuController'
import StackingLayout from '../view/menu/layouts/StackingLayout'
import StaticLayout from '../view/menu/layouts/StaticLayout'
import Style from '../view/menu/Style'

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
  constructor ({ cityName, startMoney, state, mapWidth, mapHeight, tileWidth, tileHeight, menuWidth, gameLength }) {
    this.state = state

    state.world.setBounds(0, 0, mapWidth * tileWidth + menuWidth, mapHeight * tileHeight)

    this.initializeModel(cityName, startMoney, mapWidth, mapHeight, tileWidth, tileHeight)

    this.menuView = new MenuView({
      game: this.state,
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

    this.topBarView = new MenuView({
      game: this.state,
      layout: new StaticLayout({
        menuRect: {
          x: 0,
          y: 0,
          width: state.camera.width - config.menuWidth,
          height: config.topBarSettings.height
        },
        linePadding: 5,
        vertical: false
      }),
      background: null
    })

    this.cameraMover = new CameraMover({
      game: state,
      xSpeed: config.cameraSpeed,
      ySpeed: config.cameraSpeed
    })

    this.gameEvents = new GameEvents({
      gameState: this,
      gameLength: gameLength
    })

    this.topBarController = new TopBarController({
      game: this.state,
      style: new Style({
        smallFont: 20,
        mediumFont: 30
      }),
      menuView: this.topBarView,
      player: this.player,
      city: this.city
    })

    this.menuController = new MenuController({
      game: this.state,
      style: new Style({
        mediumFont: 16,
        buttonHeight: config.menuButtonHeight,
        buttonWidth: config.menuButtonWidth
      }),
      menuView: this.menuView,
      city: this.city,
      gameEvents: this.gameEvents
    })

    this.mapListener = new MapListener({
      game: state,
      map: this.map,
      menuOptionCreator: this.menuOptionCreator,
      menuController: this.menuController
    })

    this.inputHandler = new InputHandler({
      game: state,
      mapListener: this.mapListener,
      cameraMover: this.cameraMover
    })

    this.mapView = new MapView({
      game: state,
      map: this.map,
      menu: this.menuController,
      viewWidthPx: state.game.width - menuWidth,
      viewHeightPx: state.game.height
    })

    this.gameTimerListener = new GameTimerListener({
      city: this.city,
      player: this.player,
      menuController: this.menuController,
      topBarController: this.topBarController,
      gameEvents: this.gameEvents
    })

    this.gameTimer.addListener(this.gameTimerListener)
    this.menuOptionCreator.gameTimer = this.gameTimer

    this.gameTimer.callListeners()
  }

  initializeModel (cityName, startMoney, mapWidth, mapHeight, tileWidth, tileHeight) {
    this.map = new Map({
      gridSizeX: mapWidth,
      gridSizeY: mapHeight,
      tileWidth: tileWidth,
      tileHeight: tileHeight
    })

    // fill map grid with sample data
    this.map.createMap()

    this.player = new Player({startMoney: startMoney})
    this.city = new City({ name: cityName })

    this.gameTimer = new Timer({
      interval: config.gameTimerInterval,
      currentTime: this.currentTime()
    })

    this.structureFactory = new StructureFactory({
      gameTimer: this.gameTimer,
      player: this.player
    })

    this.menuOptionCreator = new MenuOptionCreator({ player: this.player, structureFactory: this.structureFactory })
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
