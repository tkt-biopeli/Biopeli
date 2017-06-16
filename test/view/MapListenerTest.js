const assert = require('assert')
const sinon = require('sinon')

import MapListener from '../../src/view/MapListener'

describe('MapListener tests', () => {
  var game
  var map
  var menuOptionCreator
  var menu
  var ml


  beforeEach(() => {

    menu = {
      menuView: {
        leftBorderCoordinate: 0
      },
      selectedTile: undefined,
      reset: function () { },
      chooseTile: function () { }
    }

    game = {
      camera: { x: 0, y: 0 },
      input: {
        onDown: {
          add: function () { }
        }
      }
    }

    map = {
      getTileWithPixelCoordinates: function () { }
    }

    menuOptionCreator = {
      getActions: function () { }
    }

    ml = new MapListener({ game: game, map: map, menuOptionCreator: menuOptionCreator, menu: menu })

  })

  it('Constructor works', () => {
    ml = new MapListener({ game: game, map: map, menuOptionCreator: "jasd", menu: menu })
    assert.equal(ml.game, game)
    assert.equal(ml.map, map)
    assert.equal(ml.menuOptionCreator, "jasd")
    assert.equal(ml.menu, menu)
  })

  it('Pointer event in map area is recognized', () => {
    var pointerEvent = { x: 70, y: 50 }
    menu.menuView.leftBorderCoordinate = 60
    assert.equal(ml.pointerInMapArea(pointerEvent), false)
    menu.menuView.leftBorderCoordinate = 70
    assert.equal(ml.pointerInMapArea(pointerEvent), true)
  })

  it('Undefined tile is recognized', () => {
    assert.equal(ml.validTile(undefined), false)
  })

  it('Selected tile is recognized', () => {
    menu.selectedTile = "tile"
    var mock = sinon.mock(menu)
    mock.expects("reset").once()
    assert.equal(ml.validTile("tile"), false)
    mock.verify()
  })

  it('New selected tile is recognized', () => {
    menu.selectedTile = "tile"
    assert.equal(ml.validTile("anotherTile"), true)
  })

  it('Tile is fetched from Map with correct coordinates', () => {
    var mock = sinon.mock(map)
    mock.expects("getTileWithPixelCoordinates").once().withArgs(55, 60)
    var pointerEvent = { x: 50, y: 50 }
    game.camera.x = 5
    game.camera.y = 10
    ml.getTileFromMap(pointerEvent)
    mock.verify()
  })

  it('Menu update functions are called', () => {
    var m1 = sinon.mock(menu)
    var m2 = sinon.mock(menuOptionCreator)
    m1.expects("chooseTile").once()
    m2.expects("getActions").once()
    ml.updateMenuOptions("tile")
    m1.verify()
    m2.verify()
  })

  it('Update with pointer in map area calls correct functions', () => {
    var pointerEvent = { x: 70, y: 50 }
    menu.selectedTile = "tile"
    menu.menuView.leftBorderCoordinate = 80
    game.camera.x = 0
    game.camera.y = 0

    var stub = sinon.stub(ml, "getTileFromMap")
    stub.returns("justATile")

    var mockMenu = sinon.mock(menu)
    mockMenu.expects("chooseTile").once()

    var mockMenuOptions = sinon.mock(menuOptionCreator)
    mockMenuOptions.expects("getActions").once()

    ml.update(pointerEvent)

    mockMenu.verify()
    mockMenuOptions.verify()
  })

  it('Update with pointer outside map area doesnt call any functions', () => {
    var pointerEvent = { x: 70, y: 50 }
    menu.menuView.leftBorderCoordinate = 60
    var mockMenu = sinon.mock(menu)
    mockMenu.expects("chooseTile").never()

    var mockMenuOptions = sinon.mock(menuOptionCreator)
    mockMenuOptions.expects("getActions").never()

    ml.update(pointerEvent)
    mockMenu.verify()
    mockMenuOptions.verify()
  })

  it('Unvalid selection in map are doesnt call any functions', () => {
    var pointerEvent = { x: 70, y: 50 }
    menu.menuView.leftBorderCoordinate = 80

    var stub = sinon.stub(ml, "getTileFromMap")
    stub.returns(undefined)

    var mockMenu = sinon.mock(menu)
    mockMenu.expects("chooseTile").never()

    var mockMenuOptions = sinon.mock(menuOptionCreator)
    mockMenuOptions.expects("getActions").never()

    ml.update(pointerEvent)

    mockMenu.verify()
    mockMenuOptions.verify()
  })

})

