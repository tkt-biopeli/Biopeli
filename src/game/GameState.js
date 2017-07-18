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

import TopBarContent from '../controllers/contents/TopBarContent'
import SideMenuContent from '../controllers/contents/SideMenuContent'
import BuildStructureContent from '../controllers/contents/BuildStructureContent'
import SingleController from '../controllers/SingleController'
import MulticontentController from '../controllers/MulticontentController'

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
  constructor ({ cityName, perlinNoise, startMoney, state, mapWidth, mapHeight, tileWidth, tileHeight, menuWidth, gameLength }) {
    this.state = state

    state.world.setBounds(0, 0, mapWidth * tileWidth + menuWidth, mapHeight * tileHeight)

    this.initializeModel(cityName, perlinNoise, gameLength, startMoney, mapWidth, mapHeight, tileWidth, tileHeight)
    this.initializeView()
    this.initializeControllers()

    this.mapListener = new MapListener({
      game: state,
      map: this.map,
      menuController: this.menuController
    })

    this.mapView = new MapView({
      game: state,
      map: this.map,
      menuController: this.menuController,
      viewWidthPx: state.game.width - menuWidth,
      viewHeightPx: state.game.height
    })

    this.inputHandler = new InputHandler({
      game: state,
      mapListener: this.mapListener,
      cameraMover: this.cameraMover,
      mapView: this.mapView
    })

    this.gameTimerListener = new GameTimerListener({
      city: this.city,
      player: this.player,
      menuController: this.menuController,
      topBarController: this.topBarController,
      gameEvents: this.gameEvents
    })

    this.gameTimer.addListener(this.gameTimerListener)

    this.gameTimer.callListeners()
  }

  initializeModel (cityName, perlinNoise, gameLength, startMoney, mapWidth, mapHeight, tileWidth, tileHeight) {
    this.map = new Map({
      gridSizeX: mapWidth,
      gridSizeY: mapHeight,
      tileWidth: tileWidth,
      tileHeight: tileHeight,
      perlinNoise: perlinNoise
    })

    // fill map grid with sample data
    this.map.createMap()

    this.player = new Player({startMoney: startMoney})
    this.city = new City({
      name: cityName,
      startPopulation: config.cityInitialPopulation,
      popularityPct: config.cityDemandMultiplier,
      demandRandomVariance: config.cityDemandRandomVariance,
      startPrice: config.startTurnipPrice
    })

    this.gameTimer = new Timer({
      interval: config.gameTimerInterval,
      currentTime: this.currentTime()
    })

    this.structureFactory = new StructureFactory({
      gameTimer: this.gameTimer,
      player: this.player,
      map: this.map
    })

    this.gameEvents = new GameEvents({
      gameState: this,
      gameLength: gameLength
    })
  }

  initializeView () {
    this.menuView = new MenuView({
      game: this.state,
      layout: new StackingLayout({
        menuRect: {
          x: this.state.camera.width - config.menuWidth,
          y: 0,
          width: config.menuWidth,
          height: this.state.camera.height
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
          width: this.state.camera.width - config.menuWidth,
          height: config.topBarSettings.height
        },
        linePadding: 5,
        vertical: false
      }),
      background: null
    })

    this.cameraMover = new CameraMover({
      game: this.state,
      xSpeed: config.cameraSpeed,
      ySpeed: config.cameraSpeed
    })
  }

  initializeControllers () {
    this.topBarController = new SingleController({
      game: this.state,
      style: new Style({
        smallFont: 20,
        mediumFont: 30
      }),
      menuView: this.topBarView,
      content: new TopBarContent({
        player: this.player,
        city: this.city,
        timer: this.gameTimer
      })
    })

    this.menuContent = new SideMenuContent({
      city: this.city,
      gameEvents: this.gameEvents
    })

    var buildStructureController = new BuildStructureContent({
      player: this.player,
      structureFactory: this.structureFactory
    })

    this.menuController = new MulticontentController({
      game: this.state,
      menuView: this.menuView,
      style: new Style({
        mediumFont: 16,
        largeFont: 32,
        buttonHeight: config.menuButtonHeight,
        buttonWidth: config.menuButtonWidth
      }),
      contents: [this.menuContent, buildStructureController]
    })
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
