import MenuView from '../../../src/view/menu/MenuView'
const assert = require('assert')
const sinon = require('sinon')

describe('MenuView tests', () =>{
  var background = {asset: 'menuBg'}
  var groupStub
  var gameStub
  var menuView
  var spyLayout
  var tile

  beforeEach(() => {
    var stub = sinon.stub()
    groupStub = { add: function () { }, create: function () { }, removeAll: function () { } }
    stub.withArgs().returns(groupStub)
    gameStub = {add: {group: stub, sprite:function() {return {crop: ()=>{}}} }, make: {}, camera: {width: 0, height: 0}, world: {bringToTop: ()=>{}, moveDown: ()=>{}}}

    spyLayout = {
      init: sinon.spy(),
      nextComponentLocation: sinon.spy(),
      afterLine: sinon.spy(),
      afterSection: sinon.spy(),
      menuRect: {
        x: 0,
        y: 0,
        vertical: true,
        width: 100,
        height: 100
      }
    }

    menuView = new MenuView({
      game: gameStub,
      layout: spyLayout,
      background: background
    })

    menuView.drawPosition = 0
    tile = {tileType: {name: 'test'}, x: 0, y: 0, structure: {structureType: {name: 'test2'}, calculateProductionEfficiency: () => 2}}
    menuView.menu = {selectedTile: tile}
  })

  it('Constructor works', () => {
    assert.equal(gameStub, menuView.game)
    assert.equal(spyLayout, menuView.layout)
    assert.equal(groupStub, menuView.menuViewGroup)
    assert.equal(groupStub.fixedToCamera, true)
  })
})
