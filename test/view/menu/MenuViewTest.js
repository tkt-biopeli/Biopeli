import MenuView from '../../../src/view/menu/MenuView'
const assert = require('assert')
const sinon = require('sinon')

describe('MenuView tests', () => {
  var leftBorderCoordinate = 0
  var leftPadding = 2
  var sectionPadding = 5
  var linePadding = 3
  var buttonWidth = 1
  var buttonHeight = 4
  var fontSize = 10
  var groupStub
  var gameStub
  var menuView
  var tile

  beforeEach(() => {
    var stub = sinon.stub()
    groupStub = { add: function () { }, create: function () { }, removeAll: function () { } }
    stub.withArgs().returns(groupStub)
    gameStub = { add: { group: stub }, make: {} }

    menuView = new MenuView({
      game: gameStub,
      leftBorderCoordinate: leftBorderCoordinate,
      leftPadding: leftPadding,
      sectionPadding: sectionPadding,
      linePadding: linePadding,
      buttonWidth: buttonWidth,
      buttonHeight: buttonHeight,
      fontSize: fontSize
    })

    menuView.drawHeight = 0
    tile = { tileType: { name: 'test' }, x: 0, y: 0, structure: { structureType: { name: 'test2' }, calculateProductionEfficiency: () => 2 } }
    menuView.menu = { selectedTile: tile }
  })

  it('Constructor works', () => {
    assert.equal(gameStub, menuView.game)
    assert.equal(leftBorderCoordinate, menuView.leftBorderCoordinate)
    assert.equal(leftPadding, menuView.leftPadding)
    assert.equal(sectionPadding, menuView.sectionPadding)
    assert.equal(linePadding, menuView.linePadding)
    assert.equal(buttonWidth, menuView.buttonWidth)
    assert.equal(buttonHeight, menuView.buttonHeight)
    assert.equal(groupStub, menuView.menuViewGroup)
    assert.equal(groupStub.fixedToCamera, true)
    assert.equal(0, menuView.buttonActions.length)
  })

  it('Set menu works', () => {
    menuView.setMenu(12)
    assert.equal(12, menuView.menu)
  })

  it('Padding adders work', () => {
    menuView.drawHeight = 0
    menuView.addPadding(10)
    assert.equal(10, menuView.drawHeight)

    menuView.drawHeight = 0
    menuView.addLinePadding()
    assert.equal(linePadding, menuView.drawHeight)

    menuView.drawHeight = 0
    menuView.addSectionPadding()
    assert.equal(sectionPadding, menuView.drawHeight)
  })

  it('Setting button actions works', () => {
    var spy = sinon.spy()
    menuView.redraw = spy

    menuView.setButtonActions([2, 3])

    assert.equal(2, menuView.buttonActions[0])
    assert.equal(3, menuView.buttonActions[1])
    assert.equal(1, spy.callCount)

    menuView.setButtonActions([])
    assert.equal(0, menuView.buttonActions.length)
    assert.equal(2, spy.callCount)
  })

  it('Texts are created correctly', () => {
    var textSpy = sinon.spy()
    gameStub.add.text = textSpy
    var paddingSpy = sinon.spy()
    menuView.addPadding = paddingSpy

    menuView.createText("asd", 10)

    var style = { font: fontSize + "px Arial", fill: "#ffff00", align: "center" }
    assert.equal(1, textSpy.callCount)
    assert(textSpy.calledWith(leftBorderCoordinate + leftPadding, 0, "asd", style, groupStub))
    assert(paddingSpy.calledWith(10))
  })

  it('Button is created correctly', () => {
    var anchorSpy = sinon.spy()
    var textSpy = sinon.stub()
    gameStub.add.text = textSpy
    textSpy.returns({ anchor: { set: anchorSpy } })
    var buttonSpy = sinon.spy()
    gameStub.make.button = buttonSpy
    var paddingSpy = sinon.spy()
    menuView.addPadding = paddingSpy

    menuView.createButton({ name: "asd", function: function () { }, context: this })

    assert.equal(1, textSpy.callCount)
    assert.equal(1, buttonSpy.callCount)
    assert(paddingSpy.calledWith(buttonHeight))
    assert.equal(1, anchorSpy.callCount)
  })

  it('Buttons are created correctly', () => {
    var paddingSpy = sinon.spy()
    menuView.addLinePadding = paddingSpy
    var buttonSpy = sinon.spy()
    menuView.createButton = buttonSpy

    assert(menuView.createButtons())
    assert.equal(0, paddingSpy.callCount)
    assert.equal(0, buttonSpy.callCount)

    menuView.buttonActions = [1, 2, 3, 4]

    assert(menuView.createButtons())
    assert.equal(4, paddingSpy.callCount)
    for (var i = 0; i < menuView.buttonActions.length; i++) {
      assert(buttonSpy.calledWith(menuView.buttonActions[i]))
    }
  })

  it('Tile information is created correctly', () => {
    var paddingSpy = sinon.spy()
    menuView.addLinePadding = paddingSpy
    var textSpy = sinon.spy()
    menuView.createText = textSpy

    assert(menuView.createTileInformation())

    assert.equal(1, paddingSpy.callCount)
    assert(textSpy.calledWith('Ground type: test'))
    assert(textSpy.calledWith('X: 0, Y: 0'))
  })

  it('Structure information isn\'t created when structure isn\'t found', () => {
    var paddingSpy = sinon.spy()
    menuView.addLinePadding = paddingSpy
    var textSpy = sinon.spy()
    menuView.createText = textSpy

    tile.structure = null

    assert(!menuView.createStructureInformation())

    assert.equal(0, paddingSpy.callCount)
    assert.equal(0, textSpy.callCount)
  })

  it('Structure infromation is created when structure is found', () => {
    var paddingSpy = sinon.spy()
    menuView.addLinePadding = paddingSpy
    var textSpy = sinon.spy()
    menuView.createText = textSpy

    assert(menuView.createStructureInformation())

    assert.equal(4, paddingSpy.callCount)
    assert(textSpy.calledWith('Structure: test2'))
    assert.equal(5, textSpy.callCount)
  })

  it('Background creation works', () => {
    var spy = sinon.spy()
    groupStub.create = spy

    menuView.createBackground()

    assert(spy.calledWith(leftBorderCoordinate, 0, "menuBg"))
  })

  /*
    it('Background is always created in redraw', () =>{
      var backgroundSpy = sinon.spy()
      menuView.createBackground = backgroundSpy
      var removeSpy = sinon.spy()
      groupStub.removeAll = removeSpy
  
      menuView.menu = null
      menuView.redraw()
  
      assert.equal(1, backgroundSpy.callCount)
      assert(removeSpy.calledWith(true, true))
      assert.equal(sectionPadding, menuView.drawHeight)
    })
  
    it('No information is outputted if no tile is chosen', () =>{
      var spy = sinon.spy()
      menuView.createTileInformation = spy
  
      menuView.menu.selectedTile = null
      menuView.redraw()
  
      assert.equal(0, spy.callCount)
    })
  
    it('All creation functions are called when tile exist', () =>{
      var tspy = sinon.spy()
      menuView.createTileInformation = tspy
      var sspy = sinon.spy()
      menuView.createStructureInformation = sspy
      var bspy = sinon.spy()
      menuView.createButtons = bspy
  
      menuView.redraw()
  
      assert.equal(1, tspy.callCount)
      assert.equal(1, sspy.callCount)
      assert.equal(1, bspy.callCount)
    })
  
  
    it('Padding is only added in redraw when section is drawn', () =>{
      var paddingSpy = sinon.spy()
      menuView.addSectionPadding = paddingSpy
      var tspy = sinon.stub()
      tspy.returns(true)
      menuView.createTileInformation = tspy
      var sspy = sinon.stub()
      sspy.returns(true)
      menuView.createStructureInformation = sspy
      var bspy = sinon.stub()
      bspy.returns(false)
      menuView.createButtons = bspy
  
      menuView.redraw()
  
      assert.equal(2, paddingSpy.callCount)
    })
    */

})
