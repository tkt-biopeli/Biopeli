import MenuView from '../../../src/view/menu/MenuView'
const assert = require('assert')
const sinon = require('sinon')

describe('MenuView tests', () =>{
  var menuBorderCoordinate = 0
  var leftPadding = 2
  var sectionPadding = 5
  var linePadding = 3
  var buttonWidth = 1
  var buttonHeight = 4
  var fontSize = 10
  var backgroundAsset = 'menuBg'
  var groupStub
  var gameStub
  var menuView
  var tile

  beforeEach(() =>{
    var stub = sinon.stub()
    groupStub = {add: function(){}, create: function(){}, removeAll: function(){}}
    stub.withArgs().returns(groupStub)
    gameStub = {add: {group: stub}, make: {}}

    menuView = new MenuView({
      game: gameStub,
      vertical: true,
      menuBorderCoordinate: menuBorderCoordinate,
      leftPadding: leftPadding,
      sectionPadding: sectionPadding,
      linePadding: linePadding,
      buttonWidth: buttonWidth,
      buttonHeight: buttonHeight,
      fontSize: fontSize,
      backgroundAsset: backgroundAsset
    })

    menuView.drawPosition = 0
    tile = {tileType: {name: 'test'}, x: 0, y: 0, structure: {structureType: {name: 'test2'}, calculateProductionEfficiency: () => 2}}
    menuView.menu = {selectedTile: tile}
  })

  it('Constructor works', () =>{
    assert.equal(gameStub, menuView.game)
    assert.equal(menuBorderCoordinate, menuView.menuBorderCoordinate)
    assert.equal(leftPadding, menuView.leftPadding)
    assert.equal(sectionPadding, menuView.sectionPadding)
    assert.equal(linePadding, menuView.linePadding)
    assert.equal(buttonWidth, menuView.buttonWidth)
    assert.equal(buttonHeight, menuView.buttonHeight)
    assert.equal(groupStub, menuView.menuViewGroup)
    assert.equal(groupStub.fixedToCamera, true)
    assert.equal(0, menuView.buttonActions.length)
  })

  it('Padding adders work', () =>{
    menuView.drawPosition = 0
    menuView.addPadding(10)
    assert.equal(10, menuView.drawPosition)

    menuView.drawPosition = 0
    menuView.addLinePadding()
    assert.equal(linePadding, menuView.drawPosition)

    menuView.drawPosition = 0
    menuView.addSectionPadding()
    assert.equal(sectionPadding, menuView.drawPosition)
  })

  it('Texts are created correctly', () =>{
    var textSpy = sinon.spy()
    gameStub.add.text = textSpy
    var paddingSpy = sinon.spy()
    menuView.addPadding = paddingSpy

    menuView.createText("asd", 10)

    var style = {font: fontSize+"px Arial", fill: "#ffff00", align: "center"}
    assert.equal(1, textSpy.callCount)
    assert(textSpy.calledWith(menuBorderCoordinate+leftPadding, 0, "asd", style, groupStub))
    assert(paddingSpy.calledWith(10))
  })

  it('Button is created correctly', () =>{
    var anchorSpy = sinon.spy()
    var textSpy = sinon.stub()
    gameStub.add.text = textSpy
    textSpy.returns({anchor: {set: anchorSpy}})
    var buttonSpy = sinon.spy()
    gameStub.make.button = buttonSpy
    var paddingSpy = sinon.spy()
    menuView.addPadding = paddingSpy

    menuView.createButton({name: "asd", function: function(){}, context: this})

    assert.equal(1, textSpy.callCount)
    assert.equal(1, buttonSpy.callCount)
    assert(paddingSpy.calledWith(buttonHeight))
    assert.equal(1, anchorSpy.callCount)
  })

  it('Background creation works', () =>{
    var spy = sinon.spy()
    groupStub.create = spy

    menuView.createBackground()

    assert(spy.calledWith(menuBorderCoordinate, 0, "menuBg"))
  })
})
