const assert = require('assert')
const sinon = require('sinon')
import MenuOptionCreator from '../../src/controllers/actioncreation/MenuOptionCreator'

describe('Menu option creator tests', () => {
  
  var menuOptionCreator, player, structureFactory, tile, sType, buildSpy
  
  beforeEach(() => {
    buildSpy = sinon.spy()    
    sType = {
      name: 'navetta',
      cost: 100
    }
    
    tile = {
      structure: null,
      tileType: {
        allowedStructures: [sType]
      }
    }
    player = {}
    structureFactory = {
      buildBuilding: buildSpy
    }

    menuOptionCreator = new MenuOptionCreator({ player: player, structureFactory: structureFactory })
  })
  
  it('Constructor test', () => {
    assert.equal(player, menuOptionCreator.player)
    assert.equal(structureFactory, menuOptionCreator.structureFactory)
  })
  
  it('getActions returns empty array if tile has structure', () => {
    tile.structure = 4
    assert.equal(0, menuOptionCreator.getActions(tile).length)
  })
  
  it('getActions calls buttonActionsForTile if tile has no structure', () => {
    var fnSpy = sinon.spy()
    menuOptionCreator.buttonActionsForTile = fnSpy
    menuOptionCreator.getActions(tile)
    assert(fnSpy.calledWith(tile))
  })
  
  it('buttonActionsForTile returns array of button actions', () => {
    var buttonActions = menuOptionCreator.buttonActionsForTile(tile)
    assert.equal('navetta : 100€', buttonActions[0].name)
    buttonActions[0].function.call()
    assert(buildSpy.calledWith(tile, sType))
    assert.equal(structureFactory, buttonActions[0].context)
  })
})
