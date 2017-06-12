const assert = require('assert')
const sinon = require('sinon')
import Menu from '../../src/view/menu/Menu.js'

describe('Menu tests', () =>{

  var spy
  var menuView
  var menu
  var buttonActions
  var tile

  beforeEach(() => {
    spy = sinon.spy()
    menuView = {setMenu: spy, setButtonActions: function(){}}
    menu = new Menu({menuView: menuView})
    buttonActions = []
    tile = 1
  })

  it('Constructor test', () =>{
    assert.equal(menuView, menu.menuView)
    assert.equal(null, menu.selectedTile)
  })

  it('Choose tile test', () =>{
    menu.chooseTile(tile, buttonActions)
    assert.equal(1, menu.selectedTile)
  })
  it('Reset test', () => {
    menu.selectedTile = 0
    menu.reset()
    assert.equal(null, menu.selectedTile)
  })

})