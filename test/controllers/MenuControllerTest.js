const assert = require('assert')
const sinon = require('sinon')
import Menu from '../../src/controllers/MenuController'

describe('Menu controller tests', () =>{
  var spy
  var menuView
  var menu
  var buttonActions
  var tile

  var player, structureFactory, tile2, sType, buildSpy

  beforeEach(() => {
    spy = sinon.spy()
    menuView = { setMenu: spy, setButtonActions: function () { } }
    buttonActions = []
    tile = 1

    buildSpy = sinon.spy()    
    sType = {
      name: 'navetta'
    }
    
    tile2 = {
      structure: null,
      tileType: {
        allowedStructures: [sType]
      }
    }
    player = {}
    structureFactory = {
      buildBuilding: buildSpy
    }


    menu = new Menu({ 
      menuView: menuView,
      player: player,
      structureFactory: structureFactory
     })
  })

  it('Constructor test', () => {
    assert.equal(menuView, menu.menuView)
    assert.equal(null, menu.selectedTile)
    assert.equal(0, menu.buttonComponents.length)
    assert.equal(player, menu.player)
    assert.equal(structureFactory, menu.structureFactory)
  })
  
  it('getActions returns empty array if tile has structure', () => {
    tile2.structure = 4
    assert.equal(0, menu.getActions(tile2).length)
  })
  
  it('getActions calls buttonActionsForTile if tile has no structure', () => {
    var fnSpy = sinon.spy()
    menu.buttonActionsForTile = fnSpy
    menu.getActions(tile2)
    assert(fnSpy.calledWith(tile2))
  })
  
  it('buttonActionsForTile returns array of button actions', () => {
    var buttonActions = menu.buttonActionsForTile(tile2)
    assert.equal('navetta : undefined€', buttonActions[0].name)
    buttonActions[0].function.call()
    assert(buildSpy.calledWith(tile2, sType))
    assert.equal(structureFactory, buttonActions[0].context)
  })
})