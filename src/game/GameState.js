import config from '../config'

import Map from '../models/map/Map'
import StructureTypes from '../models/map/structure/StructureType'
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

    this.topBarView = new MenuView({
      game: state,
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

    this.topBarController = new TopBarController({
      menuView: this.topBarView,
      player: this.player,
      city: this.city
    })

    this.menuController = new MenuController({
      menuView: this.menuView,
      city: this.city
    })

    // map view
    this.mapView = new MapView({
      game: state,
      map: this.map,
      menu: this.menuController,
      viewWidthPx: state.game.width - menuWidth,
      viewHeightPx: state.game.height
    })
    
    this.cameraMover = new CameraMover({ 
      game: state, 
      xSpeed: config.cameraSpeed, 
      ySpeed: config.cameraSpeed 
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

    this.gameTimerListener = new GameTimerListener({ 
      city: this.city, 
      player: this.player, 
      menuController: this.menuController, 
      topBarController: this.topBarController 
    })

    this.gameTimer.addListener(this.gameTimerListener)
    this.menuOptionCreator.gameTimer = this.gameTimer

    this.gameTimer.callListeners()

    this.gameEvents = new GameEvents({
      timer: this.gameTimer
    })
  }

  initializeModel (mapWidth, mapHeight, tileWidth, tileHeight) {
    this.map = new Map({
      gridSizeX: mapWidth,
      gridSizeY: mapHeight,
      tileWidth: tileWidth,
      tileHeight: tileHeight
    })

    // fill map grid with sample data
    this.map.createMapHalfForestHalfWater()

    this.player = new Player()
    this.city = new City({ name: 'mTechville' })

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
    if (this.gameEvents.isGameOver()) {
      this.state.state.start('GameOver', true, false, this.player.points, this.city.population)
    } else {
      this.gameTimer.update(this.currentTime())
    }
  }

  currentTime () {
    return Date.now()
  }
}
