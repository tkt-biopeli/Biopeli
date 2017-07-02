const assert = require('assert')
const sinon = require('sinon')
import MenuOptionCreator from '../../src/models/menu/MenuOptionCreator'
import StaticTypes from '../../src/models/StaticTypes'
import StructureType from '../../src/models/map/structure/StructureType'

describe('Menu option creator tests', () => {
  
  var menuOptionCreator, player, structureFactory
  
  beforeEach(() => {
    player = {}
    structureFactory = {}
    menuOptionCreator = new MenuOptionCreator({ player: player, structureFactory: structureFactory })
  })
  
  it('Constructor test', () => {
    assert.equal(player, menuOptionCreator.player)
    assert.equal(structureFactory, menuOptionCreator.structureFactory)
  })
  
  it('getActions returns empty array if tile has structure', () => {
    var tile = {
      structure : 4
    }
    assert.equal(0, menuOptionCreator.getActions(tile).length)
  })
  
  it('getActions calls buttonActionsForTile if tile has no structure', () => {
    var tile = {
      structure : null
    }
    var fnSpy = sinon.spy()
    menuOptionCreator.buttonActionsForTile = fnSpy
    menuOptionCreator.getActions(tile)
    assert(fnSpy.calledWith(tile))
  })
})
