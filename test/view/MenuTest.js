const assert = require('assert')
const sinon = require('sinon')
import Menu from '../../src/view/menu/Menu.js'

describe('Menu tests', () =>{

  it('Constructor test', () =>{
    var spy = sinon.spy()
    var menuView = {setMenu: spy}
    var newMenu = new Menu({menuView: menuView})
    assert.equal(spy, newMenu.menuView)
    assert.equal(null, newMenu.selectedTile)
  })
 })