import MapGenerator from '../models/map/MapGenerator'
import Player from './Player'
import City from '../models/city/City'
import StructureFactory from '../models/structure/StructureFactory'
import PurchaseManager from '../models/PurchaseManager'
import TileFinder from '../models/map/TileFinder'

import MapView from '../view/map/MapView'
import MenuView from '../view/menu/MenuView'
import CameraMover from '../view/CameraMover'
import MapListener from '../view/MapListener'
import InputHandler from '../view/InputHandler'

import EventController from '../controllers/events/EventController'
import GameEvents from '../controllers/events/GameEvents'
import GameTimerListener from '../controllers/events/time/GameTimerListener'
import Timer from '../controllers/events/time/Timer'

import TopBarContent from '../controllers/menucontrol/contents/TopBarContent'
import TileContent from '../controllers/menucontrol/contents/TileContent'
import CityContent from '../controllers/menucontrol/contents/CityContent'
import BottomMenuContent from '../controllers/menucontrol/contents/BottomMenuContent'
import OptionsContent from '../controllers/menucontrol/contents/OptionsContent'
import BuildStructureContent from '../controllers/menucontrol/contents/BuildStructureContent'
import SingleController from '../controllers/menucontrol/SingleController'
import MulticontentController from '../controllers/menucontrol/MulticontentController'

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
  constructor ({
        cityName, perlinNoise, startMoney, state, 
        mapSize, tileSize, menuWidth, gameLength,
      config, structureTypes, tileTypes, texts, gameData }) {
    this.state = state
    
    this.gameData = gameData
    this.config = config
    this.structureTypes = structureTypes
    this.tileTypes = tileTypes
    this.texts = texts

    state.world.setBounds(
      0, 0, 
      mapSize.width * tileSize.width + menuWidth, 
      mapSize.height * tileSize.height
    )

    this.initializeModel(
      cityName, perlinNoise, gameLength, 
      startMoney, mapSize, tileSize, config
    )
    this.initializeView(config)
    this.initializeControllers(config)

    this.mapListener = new MapListener({
      game: state,
      map: this.map,
      menuController: this.menuController
    })

    this.mapView = new MapView({
      game: this.state,
      map: this.map,
      menuController: this.menuController,
      viewWidthPx: this.state.game.width - config.menuWidth,
      viewHeightPx: this.state.game.height,
      config: config
    })
    this.eventController.addListener('structureBuilt', this.mapView.structureCreated, this.mapView)

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

    this.bottomMenuController = new SingleController({
      game: this.state,
      style: new Style({
        buttonWidth: 64,
        buttonHeight: 64
      }),
      menuView: this.bottomMenuView,
      content: new BottomMenuContent({mapView: this.mapView, menuController: this.menuController})
    })

    this.gameTimer.addListener(this.gameTimerListener)

    this.gameTimer.callListeners()    
    this.bottomMenuController.redraw()
  }

  initializeModel (
      cityName, perlinNoise, gameLength,
      startMoney, mapSize, tileSize, config) {
    this.eventController = new EventController()

    this.mapGenerator = new MapGenerator({
      mapSize: mapSize,
      tileSize: tileSize,
      generatingSettings: config.generatingSettings,
      perlinNoise: perlinNoise,
      noiseSettings: config.noise
    })
    this.map = this.mapGenerator.generateMap()

    this.tileFinder = new TileFinder({
      map: this.map,
      multipliers: config.moveCosts
    })

    this.player = new Player({startMoney: startMoney})
    this.purchaseManager = new PurchaseManager({player: this.player})
    this.city = new City({
      name: cityName,
      startPopulation: config.cityInitialPopulation,
      popularityPct: config.cityDemandMultiplier,
      demandRandomVariance: config.cityDemandRandomVariance,
      startPrice: config.startTurnipPrice,
      increaseAtOne: config.populationChangeAt100,
      increaseAtTwo: config.populationChangeAt200
    })

    this.gameTimer = new Timer({
      interval: config.gameTimerInterval,
      currentTime: this.currentTime()
    })

    this.structureFactory = new StructureFactory({
      tileFinder: this.tileFinder,
      gameTimer: this.gameTimer,
      player: this.player,
      eventController: this.eventController,
      purchaseManager: this.purchaseManager,
      map: this.map,
      ruinSettings: config.ruinSettings,
      maxFlowers: config.maxFlowers
    })

    this.gameEvents = new GameEvents({
      gameState: this,
      gameLength: gameLength
    })

    this.music = this.state.add.audio('music')
    this.music.play()
    this.music.loopFull()
    this.state.paused = false
  }

  initializeView (config) {
    this.menuView = new MenuView({
      game: this.state,
      layout: new StackingLayout({
        menuRect: {
          x: this.state.camera.width - config.menuWidth,
          y: 0,
          width: config.menuWidth,
          height: this.state.camera.height - 64, // magic number for now
          cropToSize: true
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

    this.bottomMenuView = new MenuView({
      game: this.state,
      layout: new StaticLayout({
        menuRect: {
          x:this.state.camera.width - config.menuWidth,
          y: this.state.camera.height - 64, // magic number for now
          width: config.menuWidth,
          height: 64 // magic number for now
        },
        linePadding: 1,
        vertical: false
      }),
      background: 'menuBg'
    })

    this.cameraMover = new CameraMover({
      game: this.state,
      xSpeed: config.cameraSpeed,
      ySpeed: config.cameraSpeed,
      config: config
    })
  }

  initializeControllers (config) {
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

    this.cityContent = new CityContent({
      city: this.city,
      gameEvents: this.gameEvents
    })

    this.tileContent = new TileContent({
      topBarController: this.topBarController,
      purchaseManager: this.purchaseManager,
      demandFunction: this.city.turnipDemand
    })

    var buildStructureController = new BuildStructureContent({
      purchaseManager: this.purchaseManager,
      structureFactory: this.structureFactory
    })

    this.optionsContent = new OptionsContent({game: this})

    this.menuController = new MulticontentController({
      game: this.state,
      menuView: this.menuView,
      style: new Style({
        mediumFont: 16,
        largeFont: 32,
        buttonHeight: config.menuButtonHeight,
        buttonWidth: config.menuButtonWidth
      }),
      contents: [this.cityContent, this.tileContent, buildStructureController,
      this.optionsContent]
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
