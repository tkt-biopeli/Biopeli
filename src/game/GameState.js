import config from '../config'

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
import OptionsContent from '../controllers/menucontrol/contents/OptionsContent'
import LayersContent from '../controllers/menucontrol/contents/LayersContent'
import TileContent from '../controllers/menucontrol/contents/TileContent'
import CityContent from '../controllers/menucontrol/contents/CityContent'
import BottomContent from '../controllers/menucontrol/contents/BottomContent'
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
        mapSize, tileSize, menuWidth, gameLength }) {
    this.state = state

    state.world.setBounds(
      0, 0, 
      mapSize.width * tileSize.width + menuWidth, 
      mapSize.height * tileSize.height
    )

    this.music = this.state.add.audio('music')
    this.music.play()
    this.music.loopFull()
    this.state.paused = false

    this.initializeModel(cityName, perlinNoise, gameLength, startMoney, mapSize, tileSize)
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
      controllers: this.controllers,
      gameEvents: this.gameEvents
    })

    this.gameTimer.addListener(this.gameTimerListener)

    this.gameTimer.callListeners()
  }

  initializeModel (
      cityName, perlinNoise, gameLength,
      startMoney, mapSize, tileSize) {
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
      ruinSettings: config.ruinSettings
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

    this.bottomView = new MenuView({
      game: this.state,
      layout: new StackingLayout({
        menuRect: {
          x: this.state.camera.width - config.menuWidth,
          y: 200,
          width: config.menuWidth,
          height: this.state.camera.height - 20
        },
        linePadding: config.linePadding,
        sectionPadding: config.sectionPadding,
        vertical: true
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

    this.optionsContent = new OptionsContent({
      game: this
    })

    this.layersContent = new LayersContent({
      game: this
    })

    this.cityContent = new CityContent({
      city: this.city
    })

    this.tileContent = new TileContent({
      topBarController: this.topBarController,
      purchaseManager: this.purchaseManager,
      demandFunction: this.city.turnipDemand
    })

    this.buildStructureController = new BuildStructureContent({
      purchaseManager: this.purchaseManager,
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
      contents: [this.cityContent, this.tileContent, this.buildStructureController, this.optionsContent, this.layersContent]
    })

    this.bottomController = new SingleController({
      game: this.state,
      style: new Style({
        buttonHeight: config.menuButtonHeight,
        buttonWidth: config.menuButtonWidth
      }),
      menuView: this.bottomView,
      content: new BottomContent({
        mapView: this.mapView
      })
    })

    this.controllers = []
    this.controllers.push(this.menuController)
    this.controllers.push(this.topBarController)
    this.controllers.push(this.bottomController)
  }

  /**
   * Description goes here
   */
  update () {
    this.mapView.draw(this.state.camera.x, this.state.camera.y)
    if (!this.state.paused) {
      this.gameTimer.update(this.currentTime())
    }
  }

  currentTime () {
    return Date.now()
  }
}
