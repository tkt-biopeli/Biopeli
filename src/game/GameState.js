import MapGenerator from '../models/map/MapGenerator'
import Player from './Player'
import City from '../models/city/City'
import StructureFactory from '../models/structure/StructureFactory'
import PurchaseManager from '../models/PurchaseManager'
import TileFinder from '../models/map/TileFinder'

import RandomEventCreator from '../controllers/events/random/RandomEventCreator'
import ConditionCreator from '../controllers/events/random/ConditionCreator'
import EffectCreator from '../controllers/events/random/EffectCreator'
import FilterCreator from '../controllers/events/random/FilterCreator'
import RandomEventHandler from '../controllers/events/random/RandomEventHandler'

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
      startMoney, mapSize, tileSize, config, tileTypes
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
      viewWidthPx: this.state.game.width - config.sideMenuSettings.menuWidth,
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
        buttonWidth: config.bottomMenuSettings.buttonWidth,
        buttonHeight: config.bottomMenuSettings.buttonHeight
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
      startMoney, mapSize, tileSize, config, tileTypes) {
    this.eventController = new EventController()

    this.mapGenerator = new MapGenerator({
      mapSize: mapSize,
      tileSize: tileSize,
      generatingSettings: config.mapSettings.generatingSettings,
      perlinNoise: perlinNoise,
      noiseSettings: config.mapSettings.noise,
      tileTypes: tileTypes
    })
    this.map = this.mapGenerator.generateMap()

    this.tileFinder = new TileFinder({
      map: this.map,
      multipliers: config.gameplaySettings.structures.moveCosts
    })

    this.player = new Player({startMoney: startMoney})
    this.purchaseManager = new PurchaseManager({player: this.player})
    this.city = new City({
      name: cityName,
      startPopulation: config.gameplaySettings.city.initialPopulation,
      popularityPct: config.gameplaySettings.city.demandMultiplier,
      demandRandomVariance: config.gameplaySettings.city.demandRandomVariance,
      startPrice: config.gameplaySettings.city.startTurnipPrice,
      increaseAtOne: config.gameplaySettings.city.populationChangeAt100,
      increaseAtTwo: config.gameplaySettings.city.populationChangeAt200
    })

    this.gameTimer = new Timer({
      interval: config.gameplaySettings.time.gameTimerInterval,
      currentTime: this.currentTime()
    })

    this.structureFactory = new StructureFactory({
      tileFinder: this.tileFinder,
      gameTimer: this.gameTimer,
      player: this.player,
      eventController: this.eventController,
      purchaseManager: this.purchaseManager,
      map: this.map,
      ruinSettings: config.gameplaySettings.structures.ruinSettings,
      maxFlowers: config.gameplaySettings.tiles.maxFlowers,
      tileTypes: tileTypes,
      structureTypes: this.structureTypes,
      structureNames: this.gameData.names.structureNames
    })

    this.gameEvents = new GameEvents({
      gameState: this,
      gameLength: gameLength,
      config: config
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
          x: this.state.camera.width - config.sideMenuSettings.menuWidth,
          y: 0,
          width: config.sideMenuSettings.menuWidth,
          height: this.state.camera.height - config.bottomMenuSettings.height,
          cropToSize: true
        },
        linePadding: config.sideMenuSettings.linePadding,
        sectionPadding: config.sideMenuSettings.sectionPadding,
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
          width: this.state.camera.width - config.sideMenuSettings.menuWidth,
          height: config.topBarSettings.height
        },
        linePadding: config.topBarSettings.linePadding,
        vertical: false
      }),
      background: null
    })

    this.bottomMenuView = new MenuView({
      game: this.state,
      layout: new StaticLayout({
        menuRect: {
          x: this.state.camera.width - config.sideMenuSettings.menuWidth,
          y: this.state.camera.height - config.bottomMenuSettings.height,
          width: config.sideMenuSettings.menuWidth,
          height: config.bottomMenuSettings.height
        },
        linePadding: config.bottomMenuSettings.linePadding,
        vertical: false
      }),
      background: 'menuBg'
    })

    this.cameraMover = new CameraMover({
      game: this.state,
      xSpeed: config.mapSettings.camera.speed,
      ySpeed: config.mapSettings.camera.speed,
      config: config
    })
  }

  initializeControllers (config) {
    this.topBarController = new SingleController({
      game: this.state,
      style: new Style({
        smallFont: config.topBarSettings.smallFont,
        mediumFont: config.topBarSettings.mediumFont
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
      gameEvents: this.gameEvents,
      texts: this.texts
    })

    this.tileContent = new TileContent({
      topBarController: this.topBarController,
      purchaseManager: this.purchaseManager,
      demandFunction: this.city.turnipDemand,
      structureTypes: this.structureTypes,
      texts: this.texts
    })

    var buildStructureController = new BuildStructureContent({
      purchaseManager: this.purchaseManager,
      structureFactory: this.structureFactory,
      texts: this.texts
    })

    this.optionsContent = new OptionsContent({game: this, texts: this.texts})

    this.menuController = new MulticontentController({
      game: this.state,
      menuView: this.menuView,
      style: new Style({
        mediumFont: config.sideMenuSettings.mediumFont,
        largeFont: config.sideMenuSettings.largeFont,
        buttonHeight: config.sideMenuSettings.buttonHeight,
        buttonWidth: config.sideMenuSettings.buttonWidth
      }),
      contents: [this.cityContent, this.tileContent, buildStructureController,
        this.optionsContent]
    })

    var randomEventCreator = new RandomEventCreator({
      conditionCreator: new ConditionCreator(),
      effectCreator: new EffectCreator(),
      filterCreator: new FilterCreator()
    })
    this.randomEventHandler = new RandomEventHandler({
      eventList: randomEventCreator.createEvents(this.gameData.gameEvents)
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
