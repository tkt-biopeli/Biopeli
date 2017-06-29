const assert = require('assert')
const sinon = require('sinon')
import Menu from '../../../src/view/menu/MenuController'

describe('Menu controller tests', () =>{
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
    assert.equal(0, menu.buttonComponents.length)
  })
})